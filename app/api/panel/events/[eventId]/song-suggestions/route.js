import { requireEventOwner } from "@/lib/auth/session";
import { apiError, NotFoundError } from "@/lib/errors";
export const runtime = "nodejs";
export async function GET(_request, { params }) {
  try {
    const { eventId } = await params;
    const { ref, event } = await requireEventOwner(eventId);
    if (!["joanna-y-ruben", "xv-lizbeth-astrid"].includes(event.slug)) throw new NotFoundError();
    const snapshot = await ref.collection("songSuggestions").orderBy("createdAt", "desc").limit(500).get();
    return Response.json({ songs: snapshot.docs.map((doc) => { const data = doc.data(); return { id: doc.id, title: data.title, artist: data.artist, createdAt: data.createdAt?.toDate?.().toISOString() || null }; }) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
