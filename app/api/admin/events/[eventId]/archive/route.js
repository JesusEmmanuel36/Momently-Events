import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, NotFoundError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
export const runtime = "nodejs";
export async function POST(request, { params }) { try { assertSameOrigin(request); const admin = await requireAdmin(); const { eventId } = await params; const ref = getAdminDb().collection("events").doc(eventId); if (!(await ref.get()).exists) throw new NotFoundError(); const now = FieldValue.serverTimestamp(); await ref.update({ status: "archived", updatedAt: now }); await getAdminDb().collection("auditLogs").add({ actorUid: admin.uid, eventId, action: "event.archived", createdAt: now, metadata: {} }); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
