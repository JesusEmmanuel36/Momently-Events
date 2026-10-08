import { annaIsabella } from "../config/events/anna-isabella.js";
import { fernandoCristal } from "../config/events/fernando-cristal.js";
import { esmeraldaAntonio } from "../config/events/esmeralda-antonio.js";
import { fabiolaJuanPablo } from "../config/events/fabiola-juan-pablo.js";
import { alejandraReyes } from "../config/events/alejandra-reyes.js";
import { almaKarina } from "../config/events/alma-karina.js";
import { dianaJose } from "../config/events/diana-jose.js";
import { isamaraWsbaldo } from "../config/events/isamara-wsbaldo.js";
import { fergieXv } from "../config/events/fergie.js";
import { luisIrma } from "../config/events/luis-irma.js";
import { alejandraDavid } from "../config/events/alejandra-david.js";
import { luJuan } from "../config/events/lu-juan.js";
import { fatimaJavier } from "../config/events/fatima-javier.js";
import { luisManuelNancy } from "../config/events/luis-manuel-nancy.js";
import { adamarisGuillermo } from "../config/events/adamaris-guillermo.js";
import { homeroNorma } from "../config/events/homero-norma.js";
import { armandoYamilet } from "../config/events/armando-yamilet.js";
import { zukyAdali } from "../config/events/zuky-adali.js";
import { rominaComunion } from "../config/events/romina-comunion.js";
import { calebCiriam } from "../config/events/caleb-ciriam.js";
import { andreaArturo } from "../config/events/andrea-arturo.js";
import { mayraYaneli } from "../config/events/mayra-yaneli.js";
import { fabiolaDaniel } from "../config/events/fabiola-daniel.js";
import { anaPaula } from "../config/events/ana-paula.js";
import { alejandroKatya } from "../config/events/alejandro-katya.js";
import { createHash, randomBytes } from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import nextEnv from "@next/env";
import { ivanErnestina } from "../config/events/ivan-ernestina.js";
import { leslyMarcelino } from "../config/events/lesly-marcelino.js";
import { andreaAnahis } from "../config/events/andrea-anahis.js";
import { roxana50 } from "../config/events/roxana-50.js";
import { saraBlase } from "../config/events/sara-blase.js";
import { margaritaMateo } from "../config/events/margarita-mateo.js";
import { krystelXv } from "../config/events/krystel-xv.js";
import { erickErika } from "../config/events/erick-erika.js";
import { keylaXv } from "../config/events/keyla-xv.js";

import { amadayXv } from "../config/events/amaday-xv.js";

import { marianaXv } from "../config/events/mariana-xv.js";

import { karinaDaniel } from "../config/events/karina-daniel.js";

import { patriciaBautizo } from "../config/events/patricia-bautizo.js";

import { danishaXv } from "../config/events/danisha-xv.js";

import { gabrielaXv } from "../config/events/gabriela-xv.js";

import { joseMarcela } from "../config/events/jose-marcela.js";

import { omarLiliana } from "../config/events/omar-liliana.js";

import { fernandaAlejandro } from "../config/events/fernanda-alejandro.js";

import { valeryXv } from "../config/events/valery-xv.js";

import { geraldineXv } from "../config/events/geraldine-xv.js";

import { saraiErick } from "../config/events/sarai-erick.js";

nextEnv.loadEnvConfig(process.cwd());

import { liahAmmy } from "../config/events/liah-ammy.js";

import { eufraLety } from "../config/events/eufra-lety.js";

import { galileaXv } from "../config/events/galilea-xv.js";

import { adrianaFrancisco } from "../config/events/adriana-francisco.js";

import { carlosComunion } from "../config/events/carlos-comunion.js";

import { camilaZoe } from "../config/events/camila-zoe.js";

import { hansTadeo } from "../config/events/hans-tadeo.js";

const templates = { [annaIsabella.slug]: annaIsabella, [fernandoCristal.slug]: fernandoCristal, [esmeraldaAntonio.slug]: esmeraldaAntonio, [fabiolaJuanPablo.slug]: fabiolaJuanPablo, [alejandraReyes.slug]: alejandraReyes, [almaKarina.slug]: almaKarina, [dianaJose.slug]: dianaJose, [isamaraWsbaldo.slug]: isamaraWsbaldo, [fergieXv.slug]: fergieXv, [luisIrma.slug]: luisIrma, [alejandraDavid.slug]: alejandraDavid, [luJuan.slug]: luJuan, [fatimaJavier.slug]: fatimaJavier, [luisManuelNancy.slug]: luisManuelNancy, [adamarisGuillermo.slug]: adamarisGuillermo, [homeroNorma.slug]: homeroNorma, [armandoYamilet.slug]: armandoYamilet, [zukyAdali.slug]: zukyAdali, [rominaComunion.slug]: rominaComunion, [calebCiriam.slug]: calebCiriam, [andreaArturo.slug]: andreaArturo, [mayraYaneli.slug]: mayraYaneli, [fabiolaDaniel.slug]: fabiolaDaniel, [anaPaula.slug]: anaPaula, [alejandroKatya.slug]: alejandroKatya, [hansTadeo.slug]:hansTadeo, [camilaZoe.slug]:camilaZoe, [carlosComunion.slug]:carlosComunion, [adrianaFrancisco.slug]:adrianaFrancisco, [galileaXv.slug]: galileaXv, [eufraLety.slug]: eufraLety, [liahAmmy.slug]: liahAmmy, [saraiErick.slug]: saraiErick, [geraldineXv.slug]: geraldineXv, [valeryXv.slug]: valeryXv, [fernandaAlejandro.slug]: fernandaAlejandro, [omarLiliana.slug]: omarLiliana, [joseMarcela.slug]: joseMarcela, [gabrielaXv.slug]: gabrielaXv, [danishaXv.slug]: danishaXv, [patriciaBautizo.slug]: patriciaBautizo, [karinaDaniel.slug]: karinaDaniel, [marianaXv.slug]: marianaXv, [amadayXv.slug]: amadayXv, [ivanErnestina.slug]: ivanErnestina, [leslyMarcelino.slug]: leslyMarcelino, [andreaAnahis.slug]: andreaAnahis, [roxana50.slug]: roxana50, [saraBlase.slug]: saraBlase, [margaritaMateo.slug]: margaritaMateo, [krystelXv.slug]: krystelXv, [erickErika.slug]: erickErika, [keylaXv.slug]: keylaXv };
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
if (!event.date || Number.isNaN(new Date(event.date).getTime())) throw new Error(`Confirma la fecha del evento ${slug} antes de activar su panel.`);
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
const itinerary = event.itinerary || [
  ...(ceremony.enabled === false ? [] : [{ time: "13:00", title: "Ceremonia", description: ceremony.name, icon: "heart" }]),
  ...(reception.enabled === false ? [] : [{ time: event.slug === "lesly-y-marcelino" ? "19:00" : "15:00", title: "Recepción", description: reception.name, icon: "glass" }]),
];
const gifts = event.gifts || (event.registry?.number ? [{ name: "Liverpool", description: `Mesa de regalos ${event.registry.number}`, url: event.registry.url, type: "link" }] : []);
const rsvpDeadline = event.rsvpDeadline ? new Date(event.rsvpDeadline) : null;
if (rsvpDeadline && Number.isNaN(rsvpDeadline.getTime())) {
  throw new Error(`La fecha límite de RSVP no es válida para ${event.slug}: ${event.rsvpDeadline}`);
}

const document = {
  schemaVersion: 2,
  slug: event.slug,
  publicPath: `/eventos/${event.slug}`,
  status: "published",
  templateKey: event.templateKey,
  ownerUids: existing.data()?.ownerUids || [],
  createdByUid: existing.data()?.createdByUid || "system:provision-event",
  publicData: {
    eventTitle: event.eventTitle || "",
    couple: event.couple,
    weddingDate: { iso: event.date, timezone: event.timezone },
    hero: { subtitle: event.hero.subtitle, quote: event.hero.quote, imageUrl: event.hero.image },
    welcome: { title: "Con enorme alegría", text: event.hero.quote },
    music: event.music,
    story: [],
    gallery: (event.gallery || []).map((photo, index) => ({ id: `photo-${index + 1}`, url: photo.src, alt: photo.alt, order: index })),
    video: { enabled: false, url: "", posterUrl: "" },
    ceremony: { enabled: ceremony.enabled !== false, name: ceremony.name || "", time: ceremony.time || "", address: ceremony.address || "", mapsUrl: ceremony.mapsUrl || "", wazeUrl: "", imageUrl: ceremony.image || "" },
    reception: { enabled: reception.enabled !== false, name: reception.name || "", time: reception.time || "", address: reception.address || "", mapsUrl: reception.mapsUrl || "", wazeUrl: "", imageUrl: reception.image || event.hero.image || "" },
    itinerary,
    dressCode: { enabled: Boolean(event.dressCode), title: event.dressCode?.title || "", text: event.dressCode?.text || "", colors: [] },
    gifts,
    hotels: event.slug === isamaraWsbaldo.slug ? event.hotels : [], importantInfo: event.importantInfo || [], faqs: [],
    bank: event.bank || { enabled: false, bank: "", holder: "", clabe: "", account: "" },
    sections: { story: false, gallery: Boolean(event.gallery?.length), itinerary: itinerary.length > 0, gifts: gifts.length > 0, hotels: event.slug === isamaraWsbaldo.slug, important: Boolean(event.importantInfo?.length), calendar: true, songRequest: Boolean(event.askSongSuggestion), faqs: false },
    contact: { whatsapp: event.contact?.phone || "" },
    seo: { title: event.eventTitle || `${event.couple.partner1} y ${event.couple.partner2} | Nuestra boda`, description: event.hero.quote, ogImageUrl: event.hero.image },
    theme: event.theme || (event.slug === "lesly-y-marcelino" ? { primary: "#7f91ae", dark: "#5d607d", champagne: "#d8c5a5", cream: "#f7f2f8", ivory: "#fffdfb", rose: "#b494c5", sage: "#a7b6a0" } : { primary: "#65724b", dark: "#494747", champagne: "#dfc777", cream: "#f6f1e9", ivory: "#fffdf9", rose: "#df897c", sage: "#65724b" }),
  },
  settings: {
    rsvp: { enabled: event.rsvpEnabled !== false, deadline: rsvpDeadline ? Timestamp.fromDate(rsvpDeadline) : null, maxCompanions: event.maxCompanions, askMenuPreference: false, askAllergies: event.askAllergies !== false, askMessage: event.askMessage !== false, askSongSuggestion: Boolean(event.askSongSuggestion) },
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
