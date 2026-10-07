import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminDb } from "../firebase/admin.js";
import { AppError, ForbiddenError, NotFoundError, ValidationError } from "../errors.js";
import { createSecureToken } from "../security/crypto.js";

export const personalizedPassSlug = "alejandra-y-david";
export const passTokenPattern = /^[A-Za-z0-9_-]{43}$/;
const detailsSchema = z.object({
  displayName: z.string().trim().min(2).max(100),
  allowedSeats: z.coerce.number().int().min(1).max(20),
  phone: z.string().trim().max(30).default(""),
  groupName: z.string().trim().max(100).default(""),
  notes: z.string().trim().max(500).default(""),
});
const answerSchema = z.object({ attending: z.enum(["yes", "no"]), totalPeople: z.number().int().min(0).max(20), message: z.string().trim().max(1000).default("") });

export function requirePassEvent(event) {
  if (event.slug !== personalizedPassSlug) throw new NotFoundError();
}
export function parsePassDetails(raw) {
  const parsed = detailsSchema.safeParse(raw);
  if (!parsed.success) throw new ValidationError("Escribe un nombre y asigna entre 1 y 20 lugares.");
  return parsed.data;
}
export function passPath(token) { return `/eventos/${personalizedPassSlug}/pase/${token}`; }
export function passResponseId(guestId) { return `pass_${guestId}`; }

export async function publishedPassEvent({ db = getAdminDb() } = {}) {
  const slug = await db.collection("slugs").doc(personalizedPassSlug).get();
  if (!slug.exists) throw new AppError("Primero activa el evento de Alejandra y David para crear y usar sus pases.", 503, "event_not_activated");
  const ref = db.collection("events").doc(slug.data().eventId);
  const snapshot = await ref.get();
  if (!snapshot.exists || snapshot.data().status !== "published") throw new NotFoundError();
  requirePassEvent(snapshot.data());
  return { ref, event: snapshot.data() };
}

export async function createPass(context, raw) {
  requirePassEvent(context.event);
  const data = parsePassDetails(raw);
  const token = createSecureToken();
  const ref = context.ref.collection("guests").doc();
  await ref.create({ ...data, passToken: token, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return { id: ref.id, ...data, passToken: token, path: passPath(token) };
}

export async function updatePass(context, guestId, raw) {
  requirePassEvent(context.event);
  const data = parsePassDetails(raw);
  const ref = context.ref.collection("guests").doc(guestId);
  const response = context.ref.collection("rsvps").doc(passResponseId(guestId));
  let token;
  await context.ref.firestore.runTransaction(async transaction => {
    const [guest, answer] = await Promise.all([transaction.get(ref), transaction.get(response)]);
    if (!guest.exists) throw new NotFoundError();
    if (answer.exists && answer.data().totalPeople > data.allowedSeats) throw new ValidationError("Este pase ya confirmó más personas. Ajusta primero su confirmación en el panel antes de reducir los lugares.");
    token = guest.data().passToken || createSecureToken();
    transaction.update(ref, { ...data, passToken: token, updatedAt: FieldValue.serverTimestamp() });
    if (answer.exists) transaction.update(response, { name: data.displayName, nameNormalized: normalize(data.displayName), allowedSeats: data.allowedSeats, updatedAt: FieldValue.serverTimestamp() });
  });
  return { id: guestId, ...data, passToken: token, path: passPath(token) };
}

async function findPass(context, token) {
  requirePassEvent(context.event);
  if (!passTokenPattern.test(token)) throw new NotFoundError("Este pase no está disponible. Solicita tu enlace a los novios.");
  const matches = await context.ref.collection("guests").where("passToken", "==", token).limit(1).get();
  if (matches.empty) throw new NotFoundError("Este pase ya no está disponible. Solicita tu enlace a los novios.");
  return matches.docs[0];
}

export async function readPass(token, { context } = {}) {
  context ||= await publishedPassEvent();
  const guest = await findPass(context, token);
  const response = await context.ref.collection("rsvps").doc(passResponseId(guest.id)).get();
  const data = guest.data(); const answer = response.data();
  return { displayName: data.displayName, allowedSeats: data.allowedSeats,
    response: response.exists ? { attending: answer.attending, totalPeople: answer.totalPeople, message: answer.message || "" } : null,
  };
}
const normalize = name => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export async function confirmPass(token, raw, { context, now = Date.now() } = {}) {
  const parsed = answerSchema.safeParse(raw);
  if (!parsed.success) throw new ValidationError("Revisa la asistencia y el número de personas.");
  context ||= await publishedPassEvent();
  const guest = await findPass(context, token);
  const responseRef = context.ref.collection("rsvps").doc(passResponseId(guest.id));
  let saved;
  await context.ref.firestore.runTransaction(async transaction => {
    const [currentGuest, currentEvent, existing] = await Promise.all([transaction.get(guest.ref), transaction.get(context.ref), transaction.get(responseRef)]);
    if (!currentGuest.exists || currentGuest.data().passToken !== token) throw new NotFoundError("Este pase ya no está disponible.");
    const event = currentEvent.data();
    if (!currentEvent.exists || event.status !== "published") throw new NotFoundError();
    requirePassEvent(event);
    const settings = event.settings?.rsvp;
    if (!settings?.enabled) throw new AppError("Las confirmaciones no están disponibles.", 403, "rsvp_disabled");
    const deadline = settings.deadline?.toDate?.() || (settings.deadline ? new Date(settings.deadline) : null);
    if (deadline && now > deadline.getTime()) throw new AppError("El periodo de confirmaciones ya terminó.", 403, "rsvp_closed");
    const details = currentGuest.data(); const answer = parsed.data;
    if (answer.attending === "yes" && (answer.totalPeople < 1 || answer.totalPeople > details.allowedSeats)) throw new ValidationError(`Tu pase permite hasta ${details.allowedSeats} personas en total, incluyendo a la persona titular.`);
    if (answer.attending === "no" && answer.totalPeople !== 0) throw new ValidationError("Si no asistirás, el número de personas debe ser cero.");
    saved = { attending: answer.attending, totalPeople: answer.totalPeople, message: answer.message };
    const value = { name: details.displayName, nameNormalized: normalize(details.displayName), ...saved,
      companions: answer.attending === "yes" ? answer.totalPeople - 1 : 0, allowedSeats: details.allowedSeats, guestId: guest.id,
      menuPreference: null, allergies: "", songSuggestion: null, source: "web", personalizedPass: true,
      editTokenHash: null, updatedAt: FieldValue.serverTimestamp(),
      ...(!existing.exists ? { createdAt: FieldValue.serverTimestamp() } : {}),
    };
    transaction.set(responseRef, value, { merge: true });
  });
  return { ok: true, rsvpId: responseRef.id, response: saved };
}

export async function deletePass(context, guestId) {
  requirePassEvent(context.event);
  const ref = context.ref.collection("guests").doc(guestId);
  if (!(await ref.get()).exists) throw new NotFoundError();
  await ref.delete();
}

export function assertPassOrigin(request) {
  const url = new URL(request.url);
  const expected = `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (request.headers.get("origin") !== expected) throw new ForbiddenError("Origen de solicitud no permitido.");
}
