import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { apiError, NotFoundError, ValidationError } from "@/lib/errors";
import { createSecureToken, hashToken } from "@/lib/security/crypto";
import { assertSameOrigin } from "@/lib/security/same-origin";
export const runtime = "nodejs";
export async function POST(request, { params }) { try { assertSameOrigin(request); const admin = await requireAdmin(); const { eventId } = await params; const parsed = z.object({ email: z.string().trim().toLowerCase().email().max(254) }).safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Ingresa un correo válido."); const eventRef = getAdminDb().collection("events").doc(eventId); if (!(await eventRef.get()).exists) throw new NotFoundError(); const token = createSecureToken(); const inviteRef = getAdminDb().collection("ownerInvites").doc(); const now = Date.now(); await inviteRef.create({ eventId, emailNormalized: parsed.data.email, tokenHash: hashToken(token), expiresAt: Timestamp.fromMillis(now + 48 * 60 * 60 * 1000), usedAt: null, createdByUid: admin.uid, createdAt: FieldValue.serverTimestamp() }); await getAdminDb().collection("auditLogs").add({ actorUid: admin.uid, eventId, action: "owner.invited", createdAt: FieldValue.serverTimestamp(), metadata: { inviteId: inviteRef.id } }); const base = process.env.APP_URL || new URL(request.url).origin; return Response.json({ inviteUrl: `${base}/panel/activar?invite=${inviteRef.id}&token=${token}`, expiresAt: new Date(now + 48 * 60 * 60 * 1000).toISOString() }, { status: 201 }); } catch (error) { return apiError(error); } }
