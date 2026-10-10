import { z } from "zod";
import { normalizeSlug, slugPattern } from "./slug.js";

const text = (max) => z.string().trim().max(max);
const webUrl = z.string().url().refine(value => /^https?:\/\//i.test(value), "Usa un enlace http o https.");
const optionalUrl = z.union([z.literal(""), webUrl]).optional().default("");
const locationSchema = z.object({ enabled: z.boolean().default(true), name: text(120), time: text(30), address: text(250), mapsUrl: optionalUrl, wazeUrl: optionalUrl, imageUrl: optionalUrl });
const storyItem = z.object({ year: text(10), title: text(120), description: text(500), imageUrl: optionalUrl });
const galleryItem = z.object({ id: text(80), url: webUrl, alt: text(160), order: z.number().int().min(0) });
const itineraryItem = z.object({ time: text(30), title: text(120), description: text(300).default(""), icon: z.enum(["heart", "camera", "glass", "music", "sparkles"]).default("heart") });
const giftItem = z.object({ name: text(100), description: text(1000).default(""), url: optionalUrl, type: text(40).default("link") });
const hotelItem = z.object({ name: text(120), detail: text(250), address: text(250), url: optionalUrl, mapsUrl: optionalUrl });
const infoItem = z.object({ title: text(120), description: text(300), icon: z.enum(["users", "car", "clock", "tree", "umbrella"]).default("users") });
const faqItem = z.object({ question: text(180), answer: text(800) });
const sectionsSchema = z.object({ story: z.boolean(), gallery: z.boolean(), itinerary: z.boolean(), gifts: z.boolean(), hotels: z.boolean(), important: z.boolean(), calendar: z.boolean(), songRequest: z.boolean(), faqs: z.boolean(), names: z.boolean().default(true), date: z.boolean().default(true), hero: z.boolean().default(true), welcome: z.boolean().default(true), countdown: z.boolean().default(true), paragraphs: z.boolean().default(false), family: z.boolean().default(false), contact: z.boolean().default(true), closing: z.boolean().default(true) });

export const eventInputSchema = z.object({
  partner1: text(80).default(""), partner2: text(80).default(""), eventTitle: text(150).default(""),
  slug: z.string().transform(normalizeSlug).pipe(z.string().min(3).max(80).regex(slugPattern)),
  date: z.union([z.literal(""), z.string().datetime({ offset: true })]), timezone: text(60).default("America/Monterrey"), templateKey: z.enum(["brown-romance", "flexible-celebration"]).default("brown-romance"),
  paragraphs: z.array(z.object({ enabled: z.boolean().default(true), title: text(160).default(""), text: text(3000).default("") })).max(40).default([]),
  family: z.array(z.object({ enabled: z.boolean().default(true), title: text(120).default(""), names: text(1500).default("") })).max(20).default([]),
  decorations: z.object({ envelope: z.boolean().default(true), flowers: z.boolean().default(true), envelopeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#D7B6AC"), flowerColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#D7B6AC"), foliageColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#A9B09A"), sealColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#D8C3A5") }).default({ envelope: true, flowers: true, envelopeColor: "#D7B6AC", flowerColor: "#D7B6AC", foliageColor: "#A9B09A", sealColor: "#D8C3A5" }),
  askMenuPreference: z.boolean().default(true), askAllergies: z.boolean().default(true), askMessage: z.boolean().default(true),
  heroSubtitle: text(80).default("Nuestra boda"), heroQuote: text(500), heroImageUrl: optionalUrl,
  welcomeTitle: text(120).default("Con todo nuestro amor"), welcomeText: text(1500),
  ceremony: locationSchema, reception: locationSchema,
  story: z.array(storyItem).max(30).default([]), gallery: z.array(galleryItem).max(40).default([]), itinerary: z.array(itineraryItem).max(30).default([]),
  dressCode: z.object({ enabled: z.boolean().default(true), title: text(120), text: text(500), colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).max(12) }),
  gifts: z.array(giftItem).max(30).default([]), hotels: z.array(hotelItem).max(20).default([]), importantInfo: z.array(infoItem).max(30).default([]), faqs: z.array(faqItem).max(30).default([]),
  bank: z.object({ enabled: z.boolean(), bank: text(100), holder: text(160), clabe: text(30), account: text(30) }), sections: sectionsSchema,
  music: z.object({ enabled: z.boolean(), url: optionalUrl, label: text(100) }), video: z.object({ enabled: z.boolean(), url: optionalUrl, posterUrl: optionalUrl }),
  theme: z.object({ primary: z.string().regex(/^#[0-9a-fA-F]{6}$/), dark: z.string().regex(/^#[0-9a-fA-F]{6}$/), champagne: z.string().regex(/^#[0-9a-fA-F]{6}$/), cream: z.string().regex(/^#[0-9a-fA-F]{6}$/), ivory: z.string().regex(/^#[0-9a-fA-F]{6}$/), rose: z.string().regex(/^#[0-9a-fA-F]{6}$/), sage: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  whatsapp: text(30).default(""), rsvpEnabled: z.boolean().default(true), rsvpDeadline: z.union([z.literal(""), z.string().datetime({ offset: true })]).optional().default(""), maxCompanions: z.coerce.number().int().min(0).max(20).default(5),
  seoTitle: text(120).default(""), seoDescription: text(250).default(""),
});

export function buildEventDocument(data, actorUid) {
  return {
    schemaVersion: 2, slug: data.slug, status: "draft", templateKey: data.templateKey, ownerUids: [], createdByUid: actorUid,
    publicData: {
      eventTitle: data.eventTitle, couple: { partner1: data.partner1, partner2: data.partner2 }, weddingDate: { iso: data.date, timezone: data.timezone }, paragraphs: data.paragraphs, family: data.family, decorations: data.decorations,
      hero: { subtitle: data.heroSubtitle, quote: data.heroQuote, imageUrl: data.heroImageUrl }, welcome: { title: data.welcomeTitle, text: data.welcomeText },
      music: data.music, story: data.story, gallery: data.gallery, video: data.video,
      ceremony: data.ceremony, reception: data.reception, itinerary: data.itinerary, dressCode: data.dressCode,
      gifts: data.gifts, hotels: data.hotels, importantInfo: data.importantInfo, faqs: data.faqs, bank: data.bank, sections: data.sections, contact: { whatsapp: data.whatsapp },
      seo: { title: data.seoTitle || data.eventTitle || [data.partner1, data.partner2].filter(Boolean).join(" & ") || "Invitación", description: data.seoDescription || data.heroQuote, ogImageUrl: data.heroImageUrl },
      theme: data.theme,
    },
    settings: { rsvp: { enabled: data.rsvpEnabled, deadline: data.rsvpDeadline || null, maxCompanions: data.maxCompanions, askMenuPreference: data.askMenuPreference, askAllergies: data.askAllergies, askMessage: data.askMessage, askSongSuggestion: data.sections.songRequest }, invitation: { passwordProtected: false } },
  };
}
