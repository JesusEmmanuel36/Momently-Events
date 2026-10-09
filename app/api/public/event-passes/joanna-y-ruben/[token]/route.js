import { apiError } from "@/lib/errors";
import { readPass, confirmPass, assertPassOrigin, publishedPassEvent } from "@/lib/event-passes/server";
import { enforceRsvpRateLimit } from "@/lib/security/rate-limit";
export const runtime = "nodejs";
export async function GET(_request, { params }) {
  try {
    const { token } = await params;
    return Response.json(await readPass(token, { slug: "joanna-y-ruben" }), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
export async function POST(request, { params }) {
  try {
    assertPassOrigin(request);
    const { token } = await params;
    const raw = await request.json();
    const context = await publishedPassEvent({ slug: "joanna-y-ruben" });
    await enforceRsvpRateLimit(request, context.ref.id);
    return Response.json(await confirmPass(token, raw, { context }), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
