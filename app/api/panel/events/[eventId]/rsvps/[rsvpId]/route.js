import { FieldValue } from "firebase-admin/firestore";
import { requireEventOwner } from "@/lib/auth/session";
import { apiError, NotFoundError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { panelRsvpSchemaFor } from "@/lib/rsvp/schema";
export const runtime = "nodejs";
export async function PATCH(request, { params }) { try { assertSameOrigin(request); const { eventId, rsvpId } = await params; const { ref, session, event: ownedEvent } = await requireEventOwner(eventId); const parsed = panelRsvpSchemaFor(ownedEvent.slug).safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Revisa los datos.", parsed.error.flatten().fieldErrors); const rsvpRef = ref.collection("rsvps").doc(rsvpId); if (!(await rsvpRef.get()).exists) throw new NotFoundError(); const data = parsed.data; await rsvpRef.update({ name: data.name, nameNormalized: data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), attending: data.attending, companions: data.attending === "yes" ? data.companions : 0, totalPeople: data.attending === "yes" ? data.companions + 1 : 0, menuPreference: data.menuPreference || null, allergies: data.allergies, message: data.message, songSuggestion: data.songTitle || data.artist ? { title: data.songTitle, artist: data.artist } : null, updatedAt: FieldValue.serverTimestamp() }); await ref.firestore.collection("auditLogs").add({ actorUid: session.uid, eventId, action: "rsvp.updated_by_owner", createdAt: FieldValue.serverTimestamp(), metadata: { rsvpId } }); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
export async function DELETE(request, { params }) {
  try {
    assertSameOrigin(request);
    const { eventId, rsvpId } = await params;
    const { ref, session } = await requireEventOwner(eventId);
    const rsvpRef = ref.collection("rsvps").doc(rsvpId);
    if (!(await rsvpRef.get()).exists) throw new NotFoundError();
    await rsvpRef.delete();
    await ref.firestore.collection("auditLogs").add({
      actorUid: session.uid,
      eventId,
      action: "rsvp.deleted_by_owner",
      createdAt: FieldValue.serverTimestamp(),
      metadata: { rsvpId },
    });
    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
