import { FieldValue } from "firebase-admin/firestore";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { apiError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { removeEventOwner } from "@/lib/wedding/remove-owner";
export const runtime = "nodejs";
export async function DELETE(request, { params }) {
  try {
    assertSameOrigin(request);
    const admin = await requireAdmin();
    const { eventId, uid } = await params;
    await removeEventOwner({ db: getAdminDb(), fieldValue: FieldValue, eventId, uid, actorUid: admin.uid });
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
