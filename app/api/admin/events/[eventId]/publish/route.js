import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, NotFoundError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
export const runtime = "nodejs";
export async function POST(request, { params }) {
  try { assertSameOrigin(request); const admin = await requireAdmin(); const { eventId } = await params; const ref = getAdminDb().collection("events").doc(eventId); const snap = await ref.get(); if (!snap.exists) throw new NotFoundError(); const event = snap.data(); if (!event.slug || !event.publicData?.couple?.partner1 || !event.publicData?.couple?.partner2 || !event.publicData?.weddingDate?.iso || !event.publicData?.hero?.quote) throw new ValidationError("Completa nombres, fecha, slug y portada antes de publicar."); const now = FieldValue.serverTimestamp(); await ref.update({ status: "published", publishedAt: now, updatedAt: now }); await getAdminDb().collection("auditLogs").add({ actorUid: admin.uid, eventId, action: "event.published", createdAt: now, metadata: {} }); return Response.json({ ok: true }); } catch (error) { return apiError(error); }
}
