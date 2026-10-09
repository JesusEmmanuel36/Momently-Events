import { supportsPersonalizedPasses } from "@/lib/event-passes/config";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { apiError, AppError, NotFoundError, ValidationError } from "@/lib/errors";
import { createSecureToken, hashToken, safeCompareHash } from "@/lib/security/crypto";
import { enforceRsvpRateLimit } from "@/lib/security/rate-limit";
import { publicRsvpSchemaFor } from "@/lib/rsvp/schema";
import { slugPattern } from "@/lib/wedding/slug";

export const runtime = "nodejs";
async function getPublishedEvent(slug) {
  if (!slugPattern.test(slug)) throw new NotFoundError(); const db = getAdminDb(); const slugDoc = await db.collection("slugs").doc(slug).get(); if (!slugDoc.exists) throw new NotFoundError();
  const eventRef = db.collection("events").doc(slugDoc.data().eventId); const eventDoc = await eventRef.get(); if (!eventDoc.exists || eventDoc.data().status !== "published") throw new NotFoundError(); return { db, eventRef, event: eventDoc.data() };
}
function ensureRsvpOpen(event, companions, ignoreDeadline = false, slug = "") {
  const settings = event.settings?.rsvp; if (!settings?.enabled) throw new AppError("Las confirmaciones no están disponibles.", 403, "rsvp_disabled");
  const maxCompanions = slug === "esmeralda-y-antonio" ? 3 : slug === "isamara-y-wsbaldo" ? 1 : Number(settings.maxCompanions || 0);
  if (companions > maxCompanions) throw new ValidationError(`Puedes registrar hasta ${maxCompanions} acompañantes.`);
  const deadline = settings.deadline?.toDate?.() || (settings.deadline ? new Date(settings.deadline) : null); if (!ignoreDeadline && deadline && Date.now() > deadline.getTime()) throw new AppError("El periodo de confirmaciones ya terminó.", 403, "rsvp_closed");
}
function allowedData(data, source = "web") {
  return { name: data.name, nameNormalized: data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), attending: data.attending, companions: data.attending === "yes" ? data.companions : 0, totalPeople: data.attending === "yes" ? 1 + data.companions : 0, menuPreference: data.attending === "yes" ? (data.menuPreference || null) : null, allergies: data.allergies, message: data.message, songSuggestion: data.songTitle || data.artist ? { title: data.songTitle, artist: data.artist } : null, source };
}
export async function POST(request, { params }) {
  try {
    const { slug } = await params; const raw = await request.json(); if (raw.website) return new Response(null, { status: 204 }); const parsed = publicRsvpSchemaFor(slug).safeParse(raw); if (!parsed.success) throw new ValidationError("Revisa los datos de tu confirmación.", parsed.error.flatten().fieldErrors);
    if (supportsPersonalizedPasses(slug)) throw new AppError("Confirma tu asistencia desde el enlace de tu pase personalizado.", 403, "personalized_pass_required"); const context = await getPublishedEvent(slug); if (slug === "isamara-y-wsbaldo") parsed.data.companions = parsed.data.attending === "yes" ? 1 : 0; ensureRsvpOpen(context.event, parsed.data.companions, slug === "erick-y-erika", slug); await enforceRsvpRateLimit(request, context.eventRef.id);
    const token = createSecureToken(); const ref = context.eventRef.collection("rsvps").doc(); const now = FieldValue.serverTimestamp();
    await ref.create({ ...allowedData(parsed.data), editTokenHash: hashToken(token), createdAt: now, updatedAt: now });
    return Response.json({ ok: true, rsvpId: ref.id, editToken: token }, { status: 201 });
  } catch (error) { return apiError(error); }
}
export async function PATCH(request, { params }) {
  try {
    const { slug } = await params; const raw = await request.json(); const parsed = publicRsvpSchemaFor(slug).safeParse(raw); if (!parsed.success || !parsed.data.rsvpId) throw new ValidationError("No fue posible identificar tu confirmación.");
    const token = request.headers.get("x-rsvp-edit-token"); if (!token) throw new AppError("Token de edición requerido.", 401, "edit_token_required");
    if (supportsPersonalizedPasses(slug)) throw new AppError("Confirma tu asistencia desde el enlace de tu pase personalizado.", 403, "personalized_pass_required"); const context = await getPublishedEvent(slug); if (slug === "isamara-y-wsbaldo") parsed.data.companions = parsed.data.attending === "yes" ? 1 : 0; ensureRsvpOpen(context.event, parsed.data.companions, slug === "erick-y-erika", slug); await enforceRsvpRateLimit(request, context.eventRef.id);
    const ref = context.eventRef.collection("rsvps").doc(parsed.data.rsvpId); const snapshot = await ref.get(); if (!snapshot.exists || !safeCompareHash(token, snapshot.data().editTokenHash)) throw new AppError("No fue posible editar esta confirmación.", 403, "invalid_edit_token");
    await ref.update({ ...allowedData(parsed.data), updatedAt: FieldValue.serverTimestamp() }); return Response.json({ ok: true, rsvpId: ref.id });
  } catch (error) { return apiError(error); }
}
