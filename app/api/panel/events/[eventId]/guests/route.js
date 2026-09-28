import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { requireEventOwner } from "@/lib/auth/session";
import { apiError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
const guestSchema = z.object({ displayName: z.string().trim().min(2).max(100), phone: z.string().trim().max(30).default(""), groupName: z.string().trim().max(100).default(""), allowedSeats: z.coerce.number().int().min(1).max(20).default(1), notes: z.string().trim().max(500).default("") });
export const runtime = "nodejs";
export async function POST(request, { params }) { try { assertSameOrigin(request); const { eventId } = await params; const { ref } = await requireEventOwner(eventId); const parsed = guestSchema.safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Revisa los datos del invitado.", parsed.error.flatten().fieldErrors); const now = FieldValue.serverTimestamp(); const created = await ref.collection("guests").add({ ...parsed.data, createdAt: now, updatedAt: now }); return Response.json({ id: created.id }, { status: 201 }); } catch (error) { return apiError(error); } }
