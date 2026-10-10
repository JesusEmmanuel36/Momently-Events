import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { createOwnerAccount } from "@/lib/wedding/owner-account";
export const runtime = "nodejs";
export async function POST(request, { params }) {
  try {
    assertSameOrigin(request); const admin = await requireAdmin(); const { eventId } = await params;
    const parsed = z.object({ email: z.string().trim().toLowerCase().email().max(254), password: z.string().min(8).max(128) }).safeParse(await request.json());
    if (!parsed.success) throw new ValidationError("Ingresa un correo válido y una contraseña de al menos 8 caracteres.");
    const result = await createOwnerAccount({ auth: getAdminAuth(), db: getAdminDb(), fieldValue: FieldValue, eventId, actorUid: admin.uid, ...parsed.data });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
