import { FieldValue } from "firebase-admin/firestore";
import { requireEventOwner } from "@/lib/auth/session";
import { apiError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
import { panelRsvpSchema } from "@/lib/rsvp/schema";
export const runtime = "nodejs";
export async function GET(_request, { params }) {
  try {
    const { eventId } = await params;
    const { ref } = await requireEventOwner(eventId);
    const snapshot = await ref.collection("rsvps").orderBy("createdAt", "desc").limit(500).get();
    const rsvps = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        attending: data.attending,
        companions: data.companions,
        totalPeople: data.totalPeople,
        menuPreference: data.menuPreference,
        allergies: data.allergies,
        message: data.message,
        songSuggestion: data.songSuggestion,
        source: data.source,
        createdAt: data.createdAt?.toDate?.().toISOString?.() || null,
      };
    });
    return Response.json({ rsvps }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request, { params }) { try { assertSameOrigin(request); const { eventId } = await params; const { ref } = await requireEventOwner(eventId); const parsed = panelRsvpSchema.safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Revisa los datos.", parsed.error.flatten().fieldErrors); const data = parsed.data; const now = FieldValue.serverTimestamp(); const rsvp = { name: data.name, nameNormalized: data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), attending: data.attending, companions: data.attending === "yes" ? data.companions : 0, totalPeople: data.attending === "yes" ? data.companions + 1 : 0, menuPreference: data.menuPreference || null, allergies: data.allergies, message: data.message, songSuggestion: data.songTitle || data.artist ? { title: data.songTitle, artist: data.artist } : null, source: "panel", editTokenHash: null, createdAt: now, updatedAt: now }; const created = await ref.collection("rsvps").add(rsvp); return Response.json({ id: created.id }, { status: 201 }); } catch (error) { return apiError(error); } }
