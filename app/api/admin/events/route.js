import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, ConflictError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { buildEventDocument, eventInputSchema } from "@/lib/wedding/schemas";

export const runtime = "nodejs";
export async function POST(request) {
  try {
    assertSameOrigin(request); const admin = await requireAdmin(); const parsed = eventInputSchema.safeParse(await request.json());
    if (!parsed.success) throw new ValidationError("Revisa la información de la boda.", parsed.error.flatten().fieldErrors);
    const db = getAdminDb(); const eventRef = db.collection("events").doc(); const slugRef = db.collection("slugs").doc(parsed.data.slug); const now = FieldValue.serverTimestamp(); const eventDocument = buildEventDocument(parsed.data, admin.uid); if (eventDocument.settings.rsvp.deadline) eventDocument.settings.rsvp.deadline = Timestamp.fromDate(new Date(eventDocument.settings.rsvp.deadline));
    await db.runTransaction(async (transaction) => {
      if ((await transaction.get(slugRef)).exists) throw new ConflictError("Este enlace ya está siendo utilizado.");
      transaction.create(eventRef, { ...eventDocument, createdAt: now, updatedAt: now, publishedAt: null });
      transaction.create(slugRef, { eventId: eventRef.id, createdAt: now });
    });
    await db.collection("auditLogs").add({ actorUid: admin.uid, eventId: eventRef.id, action: "event.created", createdAt: now, metadata: {} });
    return Response.json({ id: eventRef.id, slug: parsed.data.slug }, { status: 201 });
  } catch (error) { return apiError(error); }
}
