import { requireEventOwner } from "@/lib/auth/session";
import { apiError, NotFoundError } from "@/lib/errors";
import { isabelaPhotos, abigailPhotos, claudiaPorfirioPhotos, angelaKarolPhotos, andreyLeiraPhotos, kristellRicardoPhotos } from "@/lib/event-photos/config";
import { listGuestPhotos } from "@/lib/event-photos/gallery";
export const runtime = "nodejs";
export async function GET(request, { params }) {
  try {
    const { eventId } = await params;
    const { event } = await requireEventOwner(eventId);
    const photoEvent = [isabelaPhotos, abigailPhotos, claudiaPorfirioPhotos, angelaKarolPhotos, andreyLeiraPhotos, kristellRicardoPhotos].find(config => config.slug === event.slug);
    if (!photoEvent) throw new NotFoundError();
    const result = await listGuestPhotos(new URL(request.url).searchParams.get("cursor") || "", { event: photoEvent });
    return Response.json({ ...result, photos: result.photos.map(photo => ({ ...photo, download: photo.url.replace("/image/upload/", "/image/upload/fl_attachment/") })) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
