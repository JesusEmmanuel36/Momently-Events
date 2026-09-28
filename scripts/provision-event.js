import { createHash, randomBytes } from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import nextEnv from "@next/env";
import { juanErnestina } from "../config/events/juan-ernestina.js";

nextEnv.loadEnvConfig(process.cwd());

const templates = { [juanErnestina.slug]: juanErnestina };
const slug = String(process.argv[2] || "").trim();
const email = String(process.argv[3] || "").trim().toLowerCase();
const requestedUrl = String(process.argv[4] || "").trim();

if (!templates[slug] || !email.includes("@")) {
  console.error("Uso: npm run provision-event -- <slug> <correo-cliente> [url-publica]");
  console.error(`Eventos disponibles: ${Object.keys(templates).join(", ")}`);
  process.exit(1);
}

const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
if (required.some((name) => !process.env[name])) {
  console.error("Faltan variables de Firebase Admin en .env.local.");
  process.exit(1);
}

const firebaseApp = getApps()[0] || initializeApp({ credential: cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
}) });
const db = getFirestore(firebaseApp);
const event = templates[slug];
const slugRef = db.collection("slugs").doc(slug);
const slugSnapshot = await slugRef.get();
const eventRef = slugSnapshot.exists ? db.collection("events").doc(slugSnapshot.data().eventId) : db.collection("events").doc();
const existing = await eventRef.get();
const now = FieldValue.serverTimestamp();

const document = {
  schemaVersion: 2,
  slug: event.slug,
  status: "published",
  templateKey: event.templateKey,
  ownerUids: existing.data()?.ownerUids || [],
  createdByUid: existing.data()?.createdByUid || "system:provision-event",
  publicData: {
    couple: event.couple,
    weddingDate: { iso: event.date, timezone: event.timezone },
    hero: { subtitle: event.hero.subtitle, quote: event.hero.quote, imageUrl: event.hero.image },
    welcome: { title: "Con enorme alegría", text: event.hero.quote },
    music: event.music,
    story: [],
    gallery: [],
    video: { enabled: false, url: "", posterUrl: "" },
    ceremony: { enabled: true, name: event.ceremony.name, time: event.ceremony.time, address: event.ceremony.address, mapsUrl: event.ceremony.mapsUrl, wazeUrl: "", imageUrl: event.ceremony.image },
    reception: { enabled: true, name: event.reception.name, time: event.reception.time, address: event.reception.address, mapsUrl: event.reception.mapsUrl, wazeUrl: "", imageUrl: event.reception.image },
    itinerary: [
      { time: "13:00", title: "Misa", description: event.ceremony.name, icon: "heart" },
      { time: "15:00", title: "Recepción", description: event.reception.name, icon: "glass" },
    ],
    dressCode: { enabled: false, title: "Vestimenta libre", text: "", colors: [] },
    gifts: [{ name: "Liverpool", description: `Mesa de regalos ${event.registry.number}`, url: event.registry.url, type: "link" }],
    hotels: [], importantInfo: [], faqs: [],
    bank: { enabled: false, bank: "", holder: "", clabe: "", account: "" },
    sections: { story: false, gallery: false, itinerary: true, gifts: true, hotels: false, important: false, calendar: true, songRequest: false, faqs: false },
    contact: { whatsapp: "" },
    seo: { title: "Juan y Ernestina | Nuestra boda", description: event.hero.quote, ogImageUrl: event.hero.image },
    theme: { primary: "#65724b", dark: "#494747", champagne: "#dfc777", cream: "#f6f1e9", ivory: "#fffdf9", rose: "#df897c", sage: "#65724b" },
  },
  settings: {
    rsvp: { enabled: true, deadline: Timestamp.fromDate(new Date(event.rsvpDeadline)), maxCompanions: event.maxCompanions, askMenuPreference: false, askAllergies: true, askMessage: true, askSongSuggestion: false },
    invitation: { passwordProtected: false },
  },
  updatedAt: now,
  publishedAt: existing.data()?.publishedAt || now,
};
if (!existing.exists) document.createdAt = now;

await eventRef.set(document, { merge: true });
await slugRef.set({ eventId: eventRef.id, updatedAt: now, ...(slugSnapshot.exists ? {} : { createdAt: now }) }, { merge: true });

const token = randomBytes(32).toString("base64url");
const inviteRef = db.collection("ownerInvites").doc();
const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
await inviteRef.create({
  eventId: eventRef.id,
  emailNormalized: email,
  tokenHash: createHash("sha256").update(token).digest("hex"),
  expiresAt: Timestamp.fromMillis(expiresAt),
  usedAt: null,
  createdByUid: "system:provision-event",
  createdAt: now,
});

const configuredUrl = requestedUrl || process.env.APP_URL || "";
const baseUrl = configuredUrl && !configuredUrl.includes("localhost") ? configuredUrl.replace(/\/$/, "") : "https://momentlyevents.vercel.app";
console.log(`Evento publicado: ${baseUrl}/eventos/${event.slug}`);
console.log(`Panel de activación (válido 48 horas): ${baseUrl}/panel/activar?invite=${inviteRef.id}&token=${token}`);
