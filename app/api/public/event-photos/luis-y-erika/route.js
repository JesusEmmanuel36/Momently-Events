import { luisErikaPhotos } from "@/lib/event-photos/config";
import { apiError, AppError } from "@/lib/errors";
import { processGuestPhoto } from "@/lib/event-photos/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  try { return Response.json(await processGuestPhoto(request, { event: luisErikaPhotos }), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiError(error); }
}

export async function GET(request) {
  try {
    if (Date.now() < Date.parse(luisErikaPhotos.opensAt)) throw new AppError("El álbum estará disponible el 27 de junio de 2027.", 403, "photos_not_open");
    const { listGuestPhotos } = await import("@/lib/event-photos/gallery");
    return Response.json(await listGuestPhotos(new URL(request.url).searchParams.get("cursor") || "", { event: luisErikaPhotos }), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
