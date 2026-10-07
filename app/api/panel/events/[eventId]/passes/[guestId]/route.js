import { requireEventOwner } from "@/lib/auth/session";
import { apiError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { updatePass, deletePass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export async function PATCH(request, { params }) {
  try {
    assertSameOrigin(request);
    const { eventId, guestId } = await params;
    const context = await requireEventOwner(eventId);
    return Response.json(await updatePass(context, guestId, await request.json()));
  } catch (error) { return apiError(error); }
}
export async function DELETE(request, { params }) {
  try {
    assertSameOrigin(request);
    const { eventId, guestId } = await params;
    await deletePass(await requireEventOwner(eventId), guestId);
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
