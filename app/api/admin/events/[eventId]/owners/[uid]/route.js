import { FieldValue } from "firebase-admin/firestore";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { apiError, AppError, NotFoundError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
export const runtime = "nodejs";
export async function DELETE(request, { params }) { try { assertSameOrigin(request); const admin = await requireAdmin(); const { eventId, uid } = await params; const db = getAdminDb(); const ref = db.collection("events").doc(eventId); await db.runTransaction(async (transaction) => { const snapshot = await transaction.get(ref); if (!snapshot.exists) throw new NotFoundError(); const owners = snapshot.data().ownerUids || []; if (!owners.includes(uid)) throw new NotFoundError(); if (owners.length <= 1) throw new AppError("No puedes quitar al último propietario del evento.", 409, "last_owner"); transaction.update(ref, { ownerUids: FieldValue.arrayRemove(uid), updatedAt: FieldValue.serverTimestamp() }); }); await db.collection("auditLogs").add({ actorUid: admin.uid, eventId, action: "owner.removed", createdAt: FieldValue.serverTimestamp(), metadata: { ownerUid: uid } }); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
