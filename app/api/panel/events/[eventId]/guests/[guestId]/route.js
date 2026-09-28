import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { requireEventOwner } from "@/lib/auth/session";
import { apiError, NotFoundError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
const schema = z.object({ displayName: z.string().trim().min(2).max(100), phone: z.string().trim().max(30).default(""), groupName: z.string().trim().max(100).default(""), allowedSeats: z.coerce.number().int().min(1).max(20), notes: z.string().trim().max(500).default("") });
export const runtime = "nodejs";
export async function PATCH(request, { params }) { try { assertSameOrigin(request); const { eventId, guestId } = await params; const { ref } = await requireEventOwner(eventId); const parsed = schema.safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Revisa los datos."); const guest = ref.collection("guests").doc(guestId); if (!(await guest.get()).exists) throw new NotFoundError(); await guest.update({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() }); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
export async function DELETE(request, { params }) { try { assertSameOrigin(request); const { eventId, guestId } = await params; const { ref } = await requireEventOwner(eventId); const guest = ref.collection("guests").doc(guestId); if (!(await guest.get()).exists) throw new NotFoundError(); await guest.delete(); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
