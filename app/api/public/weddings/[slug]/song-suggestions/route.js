import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminDb } from "@/lib/firebase/admin";
import { apiError, NotFoundError, ValidationError } from "@/lib/errors";
import { enforceRsvpRateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
const schema = z.object({ title: z.string().trim().min(1).max(120), artist: z.string().trim().max(120).default(""), website: z.string().max(500).default("") });
export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    if (slug !== "joanna-y-ruben") throw new NotFoundError();
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) throw new ValidationError("Escribe el nombre de la canción (máximo 120 caracteres).");
    if (parsed.data.website) return new Response(null, { status: 204 });
    const db = getAdminDb();
    const slugDoc = await db.collection("slugs").doc(slug).get();
    if (!slugDoc.exists) throw new NotFoundError();
    const eventRef = db.collection("events").doc(slugDoc.data().eventId);
    const snapshot = await eventRef.get();
    if (!snapshot.exists || snapshot.data().status !== "published" || snapshot.data().slug !== slug) throw new NotFoundError();
    await enforceRsvpRateLimit(request, `${eventRef.id}:songs`);
    const ref = eventRef.collection("songSuggestions").doc();
    await ref.create({ title: parsed.data.title, artist: parsed.data.artist, createdAt: FieldValue.serverTimestamp() });
    return Response.json({ ok: true, suggestionId: ref.id }, { status: 201 });
  } catch (error) { return apiError(error); }
}
