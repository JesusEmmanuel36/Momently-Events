import { calebCiriamEnlacePhotos, guestPhotosAreOpen } from "@/lib/event-photos/config";
import { apiError, AppError } from "@/lib/errors";
import { processGuestPhoto } from "@/lib/event-photos/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  try { return Response.json(await processGuestPhoto(request, { event: calebCiriamEnlacePhotos }), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiError(error); }
}

export async function GET(request) {
  try {
    if (!guestPhotosAreOpen(Date.now(), calebCiriamEnlacePhotos)) throw new AppError("El álbum estará disponible el 15 de noviembre de 2026.", 403, "photos_not_open");
    const { listGuestPhotos } = await import("@/lib/event-photos/gallery");
    return Response.json(await listGuestPhotos(new URL(request.url).searchParams.get("cursor") || "", { event: calebCiriamEnlacePhotos }), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
