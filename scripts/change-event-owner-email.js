import { createHash, randomBytes } from "node:crypto";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import nextEnv from "@next/env";
import { z } from "zod";

nextEnv.loadEnvConfig(process.cwd());
const [slug, oldEmailInput, newEmailInput, urlInput] = process.argv.slice(2);
const oldEmail = String(oldEmailInput || "").trim().toLowerCase();
const newEmail = String(newEmailInput || "").trim().toLowerCase();
if (!slug || !z.email().safeParse(oldEmail).success || !z.email().safeParse(newEmail).success || oldEmail === newEmail) {
  console.error("Uso: npm run change-event-owner-email -- <slug> <correo-anterior> <correo-correcto> [url-publica]");
  process.exit(1);
}
const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
if (required.some((name) => !process.env[name])) {
  console.error("Faltan variables de Firebase Admin en .env.local.");
  process.exit(1);
}
const baseUrl = new URL(urlInput || process.env.APP_URL || "https://momentlyevents.vercel.app").origin;
const app = initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") }) });
const db = getFirestore(app);
const auth = getAuth(app);
try {
  const slugSnapshot = await db.collection("slugs").doc(slug).get();
  const eventId = slugSnapshot.data()?.eventId;
  if (!eventId) throw new Error("El evento todavía no tiene un panel activado.");
  const eventRef = db.collection("events").doc(eventId);
  let oldUid = null;
  try { oldUid = (await auth.getUserByEmail(oldEmail)).uid; }
  catch (error) { if (error.code !== "auth/user-not-found") throw error; }
  const token = randomBytes(32).toString("base64url");
  const inviteRef = db.collection("ownerInvites").doc();
  const expiresAt = Timestamp.fromMillis(Date.now() + 48 * 60 * 60 * 1000);
  await db.runTransaction(async (transaction) => {
    const event = await transaction.get(eventRef);
    if (!event.exists) throw new Error("No se encontró el evento.");
    const invites = await transaction.get(db.collection("ownerInvites").where("eventId", "==", eventId));
    for (const invite of invites.docs) {
      if (invite.data().emailNormalized === oldEmail) transaction.delete(invite.ref);
    }
    if (oldUid && event.data().ownerUids?.includes(oldUid)) {
      transaction.update(eventRef, { ownerUids: FieldValue.arrayRemove(oldUid), updatedAt: FieldValue.serverTimestamp() });
    }
    transaction.create(inviteRef, { eventId, emailNormalized: newEmail, tokenHash: createHash("sha256").update(token).digest("hex"), expiresAt, usedAt: null, createdByUid: "system:change-event-owner-email", createdAt: FieldValue.serverTimestamp() });
  });
  console.log(`Correo anterior retirado de este evento: ${oldEmail}`);
  console.log(`Nuevo correo del panel: ${newEmail}`);
  console.log("Las confirmaciones y los datos del evento se conservaron.");
  console.log(`Activación (válida 48 horas): ${baseUrl}/panel/activar?invite=${inviteRef.id}&token=${token}`);
} catch (error) {
  console.error("No se pudo cambiar el correo:", error.message);
  process.exitCode = 1;
}
