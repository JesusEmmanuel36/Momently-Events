import { apiError } from "@/lib/errors";
import { processGuestPhoto } from "@/lib/event-photos/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  try { return Response.json(await processGuestPhoto(request), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiError(error); }
}
