"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloudinaryAssetField, GalleryEditor, StoryEditor, StructuredListEditor } from "@/components/admin/CloudinaryFields";
import { LiveInvitationPreview } from "@/components/admin/LiveInvitationPreview";
import { normalizeSlug } from "@/lib/wedding/slug";

const Field = ({ label, hint, children }) => <label className="admin-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
const parseJsonArray = (value) => { try { const parsed = JSON.parse(String(value || "[]")); return Array.isArray(parsed) ? parsed : []; } catch { return []; } };

const ITINERARY_FIELDS = [{ key: "time", label: "Hora", type: "time", step: 300, required: true }, { key: "title", label: "Actividad", placeholder: "Ceremonia", required: true }, { key: "description", label: "Descripción", placeholder: "Inicio de la ceremonia", type: "textarea", wide: true }, { key: "icon", label: "Icono", type: "select", options: [["heart", "Corazón"], ["camera", "Cámara"], ["glass", "Copa"], ["music", "Música"], ["sparkles", "Destellos"]] }];
const GIFT_FIELDS = [{ key: "name", label: "Nombre", placeholder: "Liverpool", required: true }, { key: "url", label: "Enlace de la mesa", placeholder: "https://…", type: "url", required: true }, { key: "description", label: "Descripción", placeholder: "Mesa de regalos de los novios", type: "textarea", wide: true }];
const HOTEL_FIELDS = [{ key: "name", label: "Nombre del hotel", placeholder: "Hotel Central", required: true }, { key: "detail", label: "Detalle", placeholder: "Tarifa especial para invitados" }, { key: "address", label: "Dirección", placeholder: "Av. Principal 100", wide: true }, { key: "url", label: "Sitio web", placeholder: "https://…", type: "url", required: true }, { key: "mapsUrl", label: "Google Maps", placeholder: "https://maps.google.com/…", type: "url", required: true }];
const INFO_FIELDS = [{ key: "title", label: "Título", placeholder: "Adultos únicamente", required: true }, { key: "icon", label: "Icono", type: "select", options: [["users", "Personas"], ["car", "Automóvil"], ["clock", "Reloj"], ["tree", "Jardín"], ["umbrella", "Paraguas"]] }, { key: "description", label: "Descripción", placeholder: "Escribe la recomendación para los invitados", type: "textarea", wide: true, required: true }];
const FAQ_FIELDS = [{ key: "question", label: "Pregunta", placeholder: "¿Puedo llevar niños?", required: true, wide: true }, { key: "answer", label: "Respuesta", placeholder: "Escribe una respuesta clara para los invitados", type: "textarea", required: true, wide: true }];

const TIMEZONES = [
  ["México", [
    ["America/Monterrey", "Monterrey"], ["America/Mexico_City", "Ciudad de México"], ["America/Cancun", "Cancún"],
    ["America/Merida", "Mérida"], ["America/Matamoros", "Matamoros"], ["America/Chihuahua", "Chihuahua"],
    ["America/Ciudad_Juarez", "Ciudad Juárez"], ["America/Ojinaga", "Ojinaga"], ["America/Mazatlan", "Mazatlán"],
    ["America/Hermosillo", "Hermosillo"], ["America/Tijuana", "Tijuana"], ["America/Bahia_Banderas", "Bahía de Banderas"],
  ]],
  ["América", [
    ["America/Los_Angeles", "Los Ángeles"], ["America/Denver", "Denver"], ["America/Chicago", "Chicago"],
    ["America/New_York", "Nueva York"], ["America/Bogota", "Bogotá"], ["America/Lima", "Lima"],
    ["America/Guatemala", "Guatemala"], ["America/Panama", "Panamá"], ["America/Santiago", "Santiago"],
    ["America/Argentina/Buenos_Aires", "Buenos Aires"], ["America/Sao_Paulo", "São Paulo"],
  ]],
  ["Europa", [
    ["Europe/Madrid", "Madrid"], ["Europe/London", "Londres"], ["Europe/Paris", "París"],
    ["Europe/Rome", "Roma"], ["Europe/Berlin", "Berlín"],
  ]],
  ["Otras", [
    ["UTC", "UTC"], ["Asia/Dubai", "Dubái"], ["Asia/Tokyo", "Tokio"], ["Australia/Sydney", "Sídney"],
  ]],
];

const timezoneExists = (timezone) => TIMEZONES.some(([, zones]) => zones.some(([value]) => value === timezone));

function normalizeTimeInput(value) {
  const time = String(value || "").trim();
  const twentyFourHour = time.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (twentyFourHour) return `${twentyFourHour[1].padStart(2, "0")}:${twentyFourHour[2]}`;
  const twelveHour = time.match(/^(\d{1,2})(?::(\d{2}))?\s*([AP])\.?\s*M\.?$/i);
  if (!twelveHour) return "";
  let hour = Number(twelveHour[1]) % 12;
  if (twelveHour[3].toUpperCase() === "P") hour += 12;
  return `${String(hour).padStart(2, "0")}:${twelveHour[2] || "00"}`;
}

function dateParts(date, timezone) {
  return Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

function toLocalDateTime(iso, timezone, fallback) {
  const date = new Date(iso || fallback);
  if (Number.isNaN(date.getTime())) return "";
  const parts = dateParts(date, timezone);
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

function toIsoDateTime(localValue, timezone) {
  const match = String(localValue || "").match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
  if (!match) return "";
  const [, year, month, day, hour = "00", minute = "00"] = match;
  const wanted = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  let instant = wanted;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = dateParts(new Date(instant), timezone);
    const observed = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
    instant += wanted - observed;
  }
  return new Date(instant).toISOString();
}

const safePreviewUrl = (value) => {
  const url = String(value || "").trim();
  return url.startsWith("/") || /^https?:\/\/[^\s]+$/i.test(url) ? url : "";
};

function toPreviewEvent(payload, eventId) {
  const location = (place) => ({ ...place, imageUrl: safePreviewUrl(place.imageUrl), mapsUrl: safePreviewUrl(place.mapsUrl), wazeUrl: safePreviewUrl(place.wazeUrl) });
  return {
    eventId: eventId || "live-preview", slug: payload.slug || "vista-previa", status: "draft", templateKey: payload.templateKey,
    publicData: {
      couple: { partner1: payload.partner1, partner2: payload.partner2 }, weddingDate: { iso: payload.date, timezone: payload.timezone },
      hero: { subtitle: payload.heroSubtitle, quote: payload.heroQuote, imageUrl: safePreviewUrl(payload.heroImageUrl) }, welcome: { title: payload.welcomeTitle, text: payload.welcomeText },
      ceremony: location(payload.ceremony), reception: location(payload.reception),
      story: payload.story.map((item) => ({ ...item, imageUrl: safePreviewUrl(item.imageUrl) })), gallery: payload.gallery.map((item) => ({ ...item, url: safePreviewUrl(item.url) })).filter((item) => item.url),
      itinerary: payload.itinerary, dressCode: payload.dressCode, gifts: payload.gifts.filter((item) => safePreviewUrl(item.url)), hotels: payload.hotels.filter((item) => safePreviewUrl(item.url)), importantInfo: payload.importantInfo, faqs: payload.faqs, bank: payload.bank, sections: payload.sections,
      music: { ...payload.music, url: safePreviewUrl(payload.music.url) }, video: { ...payload.video, url: safePreviewUrl(payload.video.url), posterUrl: safePreviewUrl(payload.video.posterUrl) },
      theme: payload.theme, contact: { whatsapp: payload.whatsapp }, seo: { title: payload.seoTitle, description: payload.seoDescription, ogImageUrl: safePreviewUrl(payload.heroImageUrl) },
    },
    rsvp: { enabled: payload.rsvpEnabled, deadline: payload.rsvpDeadline || null, maxCompanions: payload.maxCompanions, askMenuPreference: true, askAllergies: true, askMessage: true, askSongSuggestion: payload.sections.songRequest },
  };
}

export function EventForm({ event }) {
  const router = useRouter(); const formRef = useRef(null); const previewTimer = useRef(null); const data = event?.publicData || {}; const settings = event?.settings?.rsvp || {}; const sections = { story: data.sections?.story !== false, gallery: data.sections?.gallery !== false, itinerary: data.sections?.itinerary !== false, gifts: data.sections?.gifts !== false, hotels: data.sections?.hotels !== false, important: data.sections?.important !== false, calendar: data.sections?.calendar !== false, songRequest: data.sections?.songRequest !== false, faqs: data.sections?.faqs !== false }; const [error, setError] = useState(""); const [saving, setSaving] = useState(false); const [slug, setSlug] = useState(event?.slug || ""); const [previewEvent, setPreviewEvent] = useState(null); const [storyItems, setStoryItems] = useState(data.story || []); const [galleryItems, setGalleryItems] = useState(data.gallery || []); const [itineraryItems, setItineraryItems] = useState((data.itinerary || []).map((item) => ({ ...item, time: normalizeTimeInput(item.time) }))); const [giftItems, setGiftItems] = useState(data.gifts || []); const [hotelItems, setHotelItems] = useState(data.hotels || []); const [infoItems, setInfoItems] = useState(data.importantInfo || []); const [faqItems, setFaqItems] = useState(data.faqs || []); const selectedTimezone = data.weddingDate?.timezone || "America/Monterrey"; const theme = { primary: "#594238", dark: "#3A2A24", champagne: "#D8C3A5", cream: "#F5EEE6", ivory: "#FBF8F3", rose: "#D7B6AC", sage: "#A9B09A", ...data.theme };
  const buildPayload = (formElement) => {
    const form = new FormData(formElement);
    const location = (prefix) => ({ enabled: form.get(`${prefix}Enabled`) === "on", name: String(form.get(`${prefix}Name`) || ""), time: String(form.get(`${prefix}Time`) || ""), address: String(form.get(`${prefix}Address`) || ""), mapsUrl: String(form.get(`${prefix}MapsUrl`) || ""), wazeUrl: String(form.get(`${prefix}WazeUrl`) || ""), imageUrl: String(form.get(`${prefix}ImageUrl`) || "") });
    const gallery = parseJsonArray(form.get("galleryData")).map((item, index) => ({ ...item, id: item.id || `photo-${index + 1}`, order: index }));
    const timezone = String(form.get("timezone") || "America/Monterrey");
    return { partner1: form.get("partner1"), partner2: form.get("partner2"), slug: normalizeSlug(form.get("slug")), date: toIsoDateTime(form.get("date"), timezone), timezone, templateKey: "brown-romance", heroSubtitle: form.get("heroSubtitle"), heroQuote: form.get("heroQuote"), heroImageUrl: form.get("heroImageUrl"), welcomeTitle: form.get("welcomeTitle"), welcomeText: form.get("welcomeText"), ceremony: location("ceremony"), reception: location("reception"), story: parseJsonArray(form.get("storyData")), gallery, itinerary: parseJsonArray(form.get("itineraryData")), dressCode: { enabled: form.get("dressEnabled") === "on", title: form.get("dressTitle"), text: form.get("dressText"), colors: String(form.get("dressColors") || "").split(",").map((color) => color.trim()).filter(Boolean) }, gifts: parseJsonArray(form.get("giftsData")), hotels: parseJsonArray(form.get("hotelsData")), importantInfo: parseJsonArray(form.get("importantInfoData")), faqs: parseJsonArray(form.get("faqsData")), bank: { enabled: form.get("bankEnabled") === "on", bank: form.get("bankName"), holder: form.get("bankHolder"), clabe: form.get("bankClabe"), account: form.get("bankAccount") }, sections: { story: form.get("storyEnabled") === "on", gallery: form.get("galleryEnabled") === "on", itinerary: form.get("itineraryEnabled") === "on", gifts: form.get("giftsEnabled") === "on", hotels: form.get("hotelsEnabled") === "on", important: form.get("importantEnabled") === "on", calendar: form.get("calendarEnabled") === "on", songRequest: form.get("songRequestEnabled") === "on", faqs: form.get("faqsEnabled") === "on" }, music: { enabled: form.get("musicEnabled") === "on", url: form.get("musicUrl"), label: form.get("musicLabel") }, video: { enabled: form.get("videoEnabled") === "on", url: form.get("videoUrl"), posterUrl: form.get("videoPosterUrl") }, theme: Object.fromEntries(Object.keys(theme).map((key) => [key, form.get(`theme-${key}`)])), whatsapp: form.get("whatsapp"), rsvpEnabled: form.get("rsvpEnabled") === "on", rsvpDeadline: form.get("rsvpDeadline") ? toIsoDateTime(form.get("rsvpDeadline"), timezone) : "", maxCompanions: Number(form.get("maxCompanions")), seoTitle: form.get("seoTitle"), seoDescription: form.get("seoDescription") };
  };
  const refreshPreview = () => { if (formRef.current) setPreviewEvent(toPreviewEvent(buildPayload(formRef.current), event?.id)); };
  const queuePreview = () => { window.clearTimeout(previewTimer.current); previewTimer.current = window.setTimeout(refreshPreview, 120); };
  const updateStory = (next) => { setStoryItems(next); window.setTimeout(queuePreview, 0); };
  const updateGallery = (next) => { setGalleryItems(next); window.setTimeout(queuePreview, 0); };
  const updateItinerary = (next) => { setItineraryItems(next); window.setTimeout(queuePreview, 0); };
  const updateGifts = (next) => { setGiftItems(next); window.setTimeout(queuePreview, 0); };
  const updateHotels = (next) => { setHotelItems(next); window.setTimeout(queuePreview, 0); };
  const updateInfo = (next) => { setInfoItems(next); window.setTimeout(queuePreview, 0); };
  const updateFaqs = (next) => { setFaqItems(next); window.setTimeout(queuePreview, 0); };
  useEffect(() => { refreshPreview(); return () => window.clearTimeout(previewTimer.current); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const submit = async (formEvent) => {
    formEvent.preventDefault(); setSaving(true); setError(""); const payload = buildPayload(formEvent.currentTarget);
    try { const url = event ? `/api/admin/events/${event.id}` : "/api/admin/events"; const response = await fetch(url, { method: event ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); router.push(`/admin/eventos/${result.id || event.id}`); router.refresh(); } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const place = (key, title, fallback) => { const item = data[key] || {}; return <fieldset className="admin-section"><legend>{title}</legend><label className="admin-check"><input type="checkbox" name={`${key}Enabled`} defaultChecked={item.enabled !== false} /> Mostrar esta sección</label><div className="admin-grid"><Field label="Nombre"><input name={`${key}Name`} defaultValue={item.name || fallback} required /></Field><Field label="Hora"><input name={`${key}Time`} type="time" step="300" defaultValue={normalizeTimeInput(item.time)} required /></Field><Field label="Dirección"><input name={`${key}Address`} defaultValue={item.address || ""} required /></Field><Field label="URL Google Maps"><input name={`${key}MapsUrl`} defaultValue={item.mapsUrl || ""} type="url" /></Field><Field label="URL Waze"><input name={`${key}WazeUrl`} defaultValue={item.wazeUrl || ""} type="url" /></Field><Field label="Fotografía del lugar"><CloudinaryAssetField name={`${key}ImageUrl`} defaultValue={item.imageUrl || ""} eventId={event?.id} label="Subir fotografía" onAssetChange={queuePreview} /></Field></div></fieldset>; };
  return <div className="event-editor-layout"><form ref={formRef} className="admin-form" onSubmit={submit} onInput={queuePreview} onChange={queuePreview}>
    <fieldset className="admin-section"><legend>Información general</legend><div className="admin-grid"><Field label="Persona 1"><input name="partner1" defaultValue={data.couple?.partner1 || ""} required /></Field><Field label="Persona 2"><input name="partner2" defaultValue={data.couple?.partner2 || ""} required /></Field><Field label="Fecha del evento" hint="Selecciona únicamente el día del evento."><input name="date" type="date" defaultValue={toLocalDateTime(data.weddingDate?.iso, selectedTimezone, "2027-06-14T06:00:00.000Z").slice(0, 10)} required /></Field><Field label="Zona horaria" hint="Se usa para mostrar correctamente la fecha y el conteo regresivo."><select name="timezone" defaultValue={selectedTimezone} required>{!timezoneExists(selectedTimezone) && <option value={selectedTimezone}>{selectedTimezone}</option>}{TIMEZONES.map(([region, zones]) => <optgroup label={region} key={region}>{zones.map(([value, label]) => <option value={value} key={value}>{label} — {value}</option>)}</optgroup>)}</select></Field><Field label="Enlace de la invitación" hint="Escribe palabras normales: los espacios y acentos se convertirán automáticamente en guiones."><input name="slug" value={slug} onChange={(e) => setSlug(normalizeSlug(e.target.value))} placeholder="nombre-del-evento" autoComplete="off" required /><small className="slug-preview">/eventos/{slug || "nombre-del-evento"}</small></Field><Field label="Plantilla"><select disabled><option>Personalizada</option></select></Field></div></fieldset>
    <fieldset className="admin-section"><legend>Portada y bienvenida</legend><div className="admin-grid"><Field label="Subtítulo"><input name="heroSubtitle" defaultValue={data.hero?.subtitle || "Nuestro evento"} /></Field><Field label="Fotografía principal"><CloudinaryAssetField name="heroImageUrl" defaultValue={data.hero?.imageUrl || ""} eventId={event?.id} label="Subir fotografía principal" onAssetChange={queuePreview} /></Field><Field label="Frase principal"><textarea name="heroQuote" rows="3" defaultValue={data.hero?.quote || "Nos encantará compartir contigo este momento tan especial."} required /></Field><Field label="Título de bienvenida"><input name="welcomeTitle" defaultValue={data.welcome?.title || "Te damos la bienvenida"} /></Field><Field label="Mensaje de bienvenida"><textarea name="welcomeText" rows="5" defaultValue={data.welcome?.text || "Estamos preparando una celebración inolvidable y queremos compartirla contigo."} required /></Field></div></fieldset>
    <fieldset className="admin-section"><legend>Nuestra historia</legend><label className="admin-check"><input type="checkbox" name="storyEnabled" defaultChecked={sections.story} /> Mostrar nuestra historia</label><p className="admin-section__intro">Agrega cada momento importante y, si quieres, acompáñalo con una fotografía.</p><input type="hidden" name="storyData" value={JSON.stringify(storyItems)} /><StoryEditor items={storyItems} eventId={event?.id} onChange={updateStory} /></fieldset>
    <fieldset className="admin-section"><legend>Galería</legend><label className="admin-check"><input type="checkbox" name="galleryEnabled" defaultChecked={sections.gallery} /> Mostrar galería</label><p className="admin-section__intro">Sube una o varias fotografías; puedes describirlas, ordenarlas o eliminarlas.</p><input type="hidden" name="galleryData" value={JSON.stringify(galleryItems)} /><GalleryEditor items={galleryItems} eventId={event?.id} onChange={updateGallery} /></fieldset>
    {place("ceremony", "Ceremonia", "Parroquia del Sagrado Corazón")}{place("reception", "Recepción", "Hacienda San Gabriel")}
    <fieldset className="admin-section"><legend>Itinerario</legend><label className="admin-check"><input type="checkbox" name="itineraryEnabled" defaultChecked={sections.itinerary} /> Mostrar itinerario</label><p className="admin-section__intro">Agrega las actividades en el orden en que sucederán durante la celebración.</p><input type="hidden" name="itineraryData" value={JSON.stringify(itineraryItems)} /><StructuredListEditor items={itineraryItems} onChange={updateItinerary} fields={ITINERARY_FIELDS} addLabel="Agregar actividad" itemLabel="Actividad" pluralLabel="Actividades" emptyText="Agrega la ceremonia, recepción, cena, baile u otros momentos." createItem={{ time: "", title: "", description: "", icon: "heart" }} /></fieldset>
    <fieldset className="admin-section"><legend>Dress code</legend><label className="admin-check"><input type="checkbox" name="dressEnabled" defaultChecked={data.dressCode?.enabled !== false} /> Mostrar dress code</label><div className="admin-grid"><Field label="Título"><input name="dressTitle" defaultValue={data.dressCode?.title || "Formal / Elegante"} /></Field><Field label="Texto"><textarea name="dressText" defaultValue={data.dressCode?.text || "Te agradecemos reservar el blanco para la novia."} /></Field><Field label="Colores hex separados por coma"><input name="dressColors" defaultValue={(data.dressCode?.colors || ["#594238", "#A58F82", "#D8C3A5", "#A9B09A"]).join(", ")} /></Field></div></fieldset>
    <fieldset className="admin-section"><legend>Mesa de regalos</legend><label className="admin-check"><input type="checkbox" name="giftsEnabled" defaultChecked={sections.gifts} /> Mostrar sección de regalos</label><p className="admin-section__intro">Agrega las tiendas o mesas de regalos que podrán visitar los invitados.</p><input type="hidden" name="giftsData" value={JSON.stringify(giftItems)} /><StructuredListEditor items={giftItems} onChange={updateGifts} fields={GIFT_FIELDS} addLabel="Agregar mesa" itemLabel="Mesa" pluralLabel="Mesas" emptyText="Puedes agregar Liverpool, Amazon u otra opción para los invitados." createItem={{ name: "", url: "", description: "", type: "link" }} /><div className="admin-subsection"><label className="admin-check"><input type="checkbox" name="bankEnabled" defaultChecked={data.bank?.enabled === true} /> Permitir regalo mediante transferencia</label><div className="admin-grid"><Field label="Banco"><input name="bankName" defaultValue={data.bank?.bank || ""} /></Field><Field label="Titular"><input name="bankHolder" defaultValue={data.bank?.holder || ""} /></Field><Field label="CLABE"><input name="bankClabe" inputMode="numeric" defaultValue={data.bank?.clabe || ""} /></Field><Field label="Número de cuenta"><input name="bankAccount" inputMode="numeric" defaultValue={data.bank?.account || ""} /></Field></div></div></fieldset>
    <fieldset className="admin-section"><legend>Hoteles</legend><label className="admin-check"><input type="checkbox" name="hotelsEnabled" defaultChecked={sections.hotels} /> Mostrar hoteles</label><p className="admin-section__intro">Recomienda opciones de hospedaje cercanas al evento.</p><input type="hidden" name="hotelsData" value={JSON.stringify(hotelItems)} /><StructuredListEditor items={hotelItems} onChange={updateHotels} fields={HOTEL_FIELDS} addLabel="Agregar hotel" itemLabel="Hotel" pluralLabel="Hoteles" emptyText="Agrega hoteles, tarifas especiales y su ubicación." createItem={{ name: "", detail: "", address: "", url: "", mapsUrl: "" }} /></fieldset>
    <fieldset className="admin-section"><legend>Información importante</legend><label className="admin-check"><input type="checkbox" name="importantEnabled" defaultChecked={sections.important} /> Mostrar información importante</label><p className="admin-section__intro">Incluye recomendaciones útiles para los invitados.</p><input type="hidden" name="importantInfoData" value={JSON.stringify(infoItems)} /><StructuredListEditor items={infoItems} onChange={updateInfo} fields={INFO_FIELDS} addLabel="Agregar aviso" itemLabel="Aviso" pluralLabel="Avisos" emptyText="Agrega información sobre niños, estacionamiento, clima o puntualidad." createItem={{ title: "", description: "", icon: "users" }} /></fieldset>
    <fieldset className="admin-section"><legend>Música y video</legend><div className="admin-grid"><div><label className="admin-check"><input type="checkbox" name="musicEnabled" defaultChecked={data.music?.enabled === true} /> Activar música</label><Field label="Canción"><CloudinaryAssetField name="musicUrl" kind="audio" defaultValue={data.music?.url || ""} eventId={event?.id} label="Subir canción" onAssetChange={queuePreview} /></Field><Field label="Etiqueta"><input name="musicLabel" defaultValue={data.music?.label || "Nuestra canción"} /></Field></div><div><label className="admin-check"><input type="checkbox" name="videoEnabled" defaultChecked={data.video?.enabled === true} /> Activar video</label><Field label="Video"><CloudinaryAssetField name="videoUrl" kind="video" defaultValue={data.video?.url || ""} eventId={event?.id} label="Subir video" onAssetChange={queuePreview} /></Field><Field label="Portada del video"><CloudinaryAssetField name="videoPosterUrl" defaultValue={data.video?.posterUrl || ""} eventId={event?.id} label="Subir portada" onAssetChange={queuePreview} /></Field></div></div></fieldset>
    <fieldset className="admin-section"><legend>Preguntas frecuentes</legend><label className="admin-check"><input type="checkbox" name="faqsEnabled" defaultChecked={sections.faqs} /> Mostrar preguntas frecuentes</label><p className="admin-section__intro">Resuelve con anticipación las dudas habituales de los invitados.</p><input type="hidden" name="faqsData" value={JSON.stringify(faqItems)} /><StructuredListEditor items={faqItems} onChange={updateFaqs} fields={FAQ_FIELDS} addLabel="Agregar pregunta" itemLabel="Pregunta" pluralLabel="Preguntas" emptyText="Agrega preguntas sobre niños, estacionamiento, horarios o cualquier detalle del evento." createItem={{ question: "", answer: "" }} /></fieldset>
    <fieldset className="admin-section"><legend>Tema visual</legend><div className="theme-grid">{Object.entries(theme).map(([key, value]) => <Field label={key} key={key}><input name={`theme-${key}`} type="color" defaultValue={value} /></Field>)}</div></fieldset>
    <fieldset className="admin-section"><legend>Confirmaciones y contacto</legend><div className="admin-toggle-grid"><label className="admin-check"><input type="checkbox" name="rsvpEnabled" defaultChecked={settings.enabled !== false} /> Activar RSVP</label><label className="admin-check"><input type="checkbox" name="songRequestEnabled" defaultChecked={sections.songRequest} /> Permitir sugerencias de canciones</label><label className="admin-check"><input type="checkbox" name="calendarEnabled" defaultChecked={sections.calendar} /> Mostrar botón para agregar al calendario</label></div><div className="admin-grid"><Field label="Fecha límite para confirmar" hint="Los invitados podrán confirmar hasta esta fecha y hora."><input name="rsvpDeadline" type="datetime-local" step="60" defaultValue={toLocalDateTime(settings.deadline, selectedTimezone, "2027-05-21T05:59:00.000Z")} /></Field><Field label="Máximo de acompañantes"><input name="maxCompanions" type="number" min="0" max="20" defaultValue={settings.maxCompanions ?? 5} /></Field><Field label="WhatsApp"><input name="whatsapp" defaultValue={data.contact?.whatsapp || ""} /></Field></div></fieldset>
    <fieldset className="admin-section"><legend>SEO</legend><div className="admin-grid"><Field label="Título"><input name="seoTitle" defaultValue={data.seo?.title || ""} /></Field><Field label="Descripción"><textarea name="seoDescription" defaultValue={data.seo?.description || ""} /></Field></div></fieldset>
    {error && <p className="form__error">{error}</p>}<div className="admin-form__footer"><button className="button" disabled={saving}>{saving ? "Guardando…" : event ? "Guardar cambios" : "Crear borrador"}</button></div>
  </form><LiveInvitationPreview event={previewEvent} /></div>;
}
