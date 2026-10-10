import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, ConflictError, NotFoundError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { buildEventDocument, eventInputSchema } from "@/lib/wedding/schemas";
import { assertAvailableTemplatePath } from "@/lib/wedding/admin-links";

export const runtime = "nodejs";
export async function PATCH(request, { params }) {
  try {
    assertSameOrigin(request); const admin = await requireAdmin(); const { eventId } = await params; const parsed = eventInputSchema.safeParse(await request.json());
    if (!parsed.success) throw new ValidationError("Revisa la información del evento.", parsed.error.flatten().fieldErrors);
    const db = getAdminDb(); const ref = db.collection("events").doc(eventId); const next = buildEventDocument(parsed.data, admin.uid); if (next.settings.rsvp.deadline) next.settings.rsvp.deadline = Timestamp.fromDate(new Date(next.settings.rsvp.deadline)); const now = FieldValue.serverTimestamp();
    await db.runTransaction(async (transaction) => {
      const currentSnapshot = await transaction.get(ref); if (!currentSnapshot.exists) throw new NotFoundError(); const current = currentSnapshot.data();
      if (!["brown-romance", "flexible-celebration"].includes(current.templateKey)) throw new ValidationError("Esta invitación usa una plantilla del proyecto y no se puede reemplazar desde el creador.");
      if (current.slug !== parsed.data.slug) {
        assertAvailableTemplatePath(parsed.data.slug);
        const nextSlug = db.collection("slugs").doc(parsed.data.slug); if ((await transaction.get(nextSlug)).exists) throw new ConflictError("Este enlace ya está siendo utilizado.");
        transaction.create(nextSlug, { eventId, createdAt: now }); transaction.delete(db.collection("slugs").doc(current.slug));
      }
      transaction.update(ref, { slug: next.slug, publicPath: `/eventos/${next.slug}`, templateKey: next.templateKey, publicData: { ...current.publicData, ...next.publicData }, settings: { ...current.settings, ...next.settings, rsvp: { ...current.settings?.rsvp, ...next.settings.rsvp } }, updatedAt: now });
    });
    await db.collection("auditLogs").add({ actorUid: admin.uid, eventId, action: "event.updated", createdAt: now, metadata: {} });
    return Response.json({ ok: true, slug: parsed.data.slug });
  } catch (error) { return apiError(error); }
}
