import { createHash, randomBytes } from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import nextEnv from "@next/env";
import { ivanErnestina } from "../config/events/ivan-ernestina.js";
import { leslyMarcelino } from "../config/events/lesly-marcelino.js";

nextEnv.loadEnvConfig(process.cwd());

const templates = { [ivanErnestina.slug]: ivanErnestina, [leslyMarcelino.slug]: leslyMarcelino };
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
const legacySlug = slug === "ivan-y-ernestina" ? "juan-y-ernestina" : "";
const legacySlugRef = legacySlug ? db.collection("slugs").doc(legacySlug) : null;
const legacySlugSnapshot = !slugSnapshot.exists && legacySlugRef ? await legacySlugRef.get() : null;
const existingEventId = slugSnapshot.data()?.eventId || legacySlugSnapshot?.data()?.eventId;
const eventRef = existingEventId ? db.collection("events").doc(existingEventId) : db.collection("events").doc();
const existing = await eventRef.get();
const now = FieldValue.serverTimestamp();
const ceremony = event.ceremony || { enabled: false, name: "", time: "", address: "", mapsUrl: "", image: "" };
const reception = event.reception || { enabled: false, name: "", time: "", address: "", mapsUrl: "", image: event.hero.image };
const itinerary = [
  ...(ceremony.enabled === false ? [] : [{ time: "13:00", title: "Ceremonia", description: ceremony.name, icon: "heart" }]),
  ...(reception.enabled === false ? [] : [{ time: event.slug === "lesly-y-marcelino" ? "19:00" : "15:00", title: "Recepción", description: reception.name, icon: "glass" }]),
];
const gifts = event.registry?.number ? [{ name: "Liverpool", description: `Mesa de regalos ${event.registry.number}`, url: event.registry.url, type: "link" }] : [];

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
    gallery: (event.gallery || []).map((photo, index) => ({ id: `photo-${index + 1}`, url: photo.src, alt: photo.alt, order: index })),
    video: { enabled: false, url: "", posterUrl: "" },
    ceremony: { enabled: ceremony.enabled !== false, name: ceremony.name, time: ceremony.time, address: ceremony.address, mapsUrl: ceremony.mapsUrl, wazeUrl: "", imageUrl: ceremony.image },
    reception: { enabled: reception.enabled !== false, name: reception.name, time: reception.time, address: reception.address, mapsUrl: reception.mapsUrl, wazeUrl: "", imageUrl: reception.image || event.hero.image },
    itinerary,
    dressCode: { enabled: Boolean(event.dressCode), title: event.dressCode?.title || "", text: event.dressCode?.text || "", colors: [] },
    gifts,
    hotels: [], importantInfo: [], faqs: [],
    bank: { enabled: false, bank: "", holder: "", clabe: "", account: "" },
    sections: { story: false, gallery: Boolean(event.gallery?.length), itinerary: itinerary.length > 0, gifts: gifts.length > 0, hotels: false, important: false, calendar: true, songRequest: false, faqs: false },
    contact: { whatsapp: event.contact?.phone || "" },
    seo: { title: `${event.couple.partner1} y ${event.couple.partner2} | Nuestra boda`, description: event.hero.quote, ogImageUrl: event.hero.image },
    theme: event.slug === "lesly-y-marcelino" ? { primary: "#7f91ae", dark: "#5d607d", champagne: "#d8c5a5", cream: "#f7f2f8", ivory: "#fffdfb", rose: "#b494c5", sage: "#a7b6a0" } : { primary: "#65724b", dark: "#494747", champagne: "#dfc777", cream: "#f6f1e9", ivory: "#fffdf9", rose: "#df897c", sage: "#65724b" },
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
if (legacySlugSnapshot?.exists) await legacySlugRef.delete();

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
