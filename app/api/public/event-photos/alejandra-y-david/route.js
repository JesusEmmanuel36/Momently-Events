import { alejandraDavidPhotos } from "@/lib/event-photos/config";
import { apiError } from "@/lib/errors";
import { processGuestPhoto } from "@/lib/event-photos/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  try { return Response.json(await processGuestPhoto(request, { event: alejandraDavidPhotos }), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiError(error); }
}

export async function GET(request) {
  try {
    const { listGuestPhotos } = await import("@/lib/event-photos/gallery");
    return Response.json(await listGuestPhotos(new URL(request.url).searchParams.get("cursor") || "", { event: alejandraDavidPhotos }), { headers: { "Cache-Control": "public, max-age=30, s-maxage=60" } });
  } catch (error) { return apiError(error); }
}
