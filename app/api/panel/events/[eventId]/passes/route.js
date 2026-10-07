import { requireEventOwner } from "@/lib/auth/session";
import { apiError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { createPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export async function POST(request, { params }) {
  try {
    assertSameOrigin(request);
    const { eventId } = await params;
    const context = await requireEventOwner(eventId);
    return Response.json(await createPass(context, await request.json()), { status: 201 });
  } catch (error) { return apiError(error); }
}
