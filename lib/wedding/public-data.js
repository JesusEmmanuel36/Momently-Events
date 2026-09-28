import { wedding as demo } from "@/config/wedding";

const clean = (value) => value === undefined ? null : value;
const displayTime = (value) => {
  const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
  if (!match) return value;
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
};
export function toPublicWedding(event) {
  const data = event.publicData || {}; const settings = event.settings?.rsvp || {};
  return JSON.parse(JSON.stringify({
    eventId: event.id, slug: event.slug, templateKey: event.templateKey || "brown-romance", status: event.status,
    publicData: clean(data), rsvp: { enabled: settings.enabled === true, deadline: settings.deadline?.toDate?.()?.toISOString?.() || settings.deadline || null, maxCompanions: Number(settings.maxCompanions || 0), askMenuPreference: settings.askMenuPreference !== false, askAllergies: settings.askAllergies !== false, askMessage: settings.askMessage !== false, askSongSuggestion: settings.askSongSuggestion !== false },
  }));
}

export function toTemplateWedding(safeEvent) {
  const data = safeEvent.publicData || {}; const couple = data.couple || {}; const date = data.weddingDate?.iso || demo.date; const dateValue = new Date(date);
  const formatDate = Number.isNaN(dateValue.getTime()) ? demo.dateLong : new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: data.weddingDate?.timezone || "America/Monterrey" }).format(dateValue);
  const galleryItems = [...(data.gallery || [])].sort((a, b) => (a.order || 0) - (b.order || 0)).filter((item) => item.url);
  const gallery = galleryItems.map((item) => item.url);
  const mapLocation = (place, fallback) => ({ enabled: place?.enabled !== false, label: fallback.label, name: place?.name || `Lugar de la ${fallback.label.toLowerCase()}`, time: displayTime(place?.time || ""), address: place?.address || "Agrega la dirección", image: place?.imageUrl || fallback.image, mapsUrl: place?.mapsUrl || "", wazeUrl: place?.wazeUrl || "" });
  const sections = data.sections || {};
  const story = (data.story || []).map((item) => ({ ...item, image: item.imageUrl }));
  const itinerary = (data.itinerary || []).map((item) => ({ ...item, time: displayTime(item.time) }));
  const gifts = data.gifts || []; const hotels = data.hotels || []; const important = data.importantInfo || []; const faqs = data.faqs || [];
  const bank = data.bank || { enabled: false, bank: "", holder: "", clabe: "", account: "" };
  return {
    ...demo, eventId: safeEvent.eventId, slug: safeEvent.slug, isLive: true,
    couple: { bride: couple.partner1 || "Persona 1", groom: couple.partner2 || "Persona 2" }, date, dateDisplay: dateValue.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric", timeZone: data.weddingDate?.timezone || "America/Monterrey" }).toUpperCase().replace(/ DE /g, " · "), dateLong: formatDate.charAt(0).toUpperCase() + formatDate.slice(1),
    heroSubtitle: data.hero?.subtitle || "Nuestra boda", heroQuote: data.hero?.quote || demo.heroQuote, welcomeTitle: data.welcome?.title || "Con todo nuestro amor", welcome: data.welcome?.text ? data.welcome.text.split("\n").filter(Boolean) : demo.welcome,
    images: { ...demo.images, hero: data.hero?.imageUrl || demo.images.hero, gallery }, galleryItems,
    music: { enabled: data.music?.enabled === true, src: data.music?.url || demo.music.src, label: data.music?.label || demo.music.label }, video: data.video || { enabled: false, url: "", posterUrl: "" }, theme: data.theme || {},
    story, ceremony: mapLocation(data.ceremony, demo.ceremony), reception: mapLocation(data.reception, demo.reception), itinerary,
    dressCode: data.dressCode ? { title: data.dressCode.title, note: data.dressCode.text, colors: data.dressCode.colors || [] } : demo.dressCode,
    gifts, bank, hotels, important, faqs,
    rsvpDeadline: safeEvent.rsvp.deadline ? new Date(safeEvent.rsvp.deadline).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }) : demo.rsvpDeadline,
    rsvpSettings: safeEvent.rsvp, features: { music: data.music?.enabled === true, video: data.video?.enabled === true, ceremony: data.ceremony?.enabled !== false, reception: data.reception?.enabled !== false, story: sections.story !== false && story.length > 0, gallery: sections.gallery !== false && gallery.length > 0, itinerary: sections.itinerary !== false && itinerary.length > 0, dressCode: data.dressCode?.enabled !== false, gifts: sections.gifts !== false && (gifts.length > 0 || bank.enabled === true), hotels: sections.hotels !== false && hotels.length > 0, important: sections.important !== false && important.length > 0, calendar: sections.calendar !== false, rsvp: safeEvent.rsvp.enabled, songRequest: sections.songRequest !== false && safeEvent.rsvp.askSongSuggestion !== false, faqs: sections.faqs !== false && faqs.length > 0 }, whatsapp: data.contact?.whatsapp ? `https://wa.me/${data.contact.whatsapp.replace(/\D/g, "")}` : "",
  };
}
