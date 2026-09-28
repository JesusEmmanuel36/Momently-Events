import { notFound } from "next/navigation";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";
import { getAdminDb } from "@/lib/firebase/admin";
import { toPublicWedding } from "@/lib/wedding/public-data";
import { slugPattern } from "@/lib/wedding/slug";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function loadWedding(slug) {
  if (!slugPattern.test(slug)) return null; const db = getAdminDb(); const slugDoc = await db.collection("slugs").doc(slug).get(); if (!slugDoc.exists) return null;
  const eventDoc = await db.collection("events").doc(slugDoc.data().eventId).get(); if (!eventDoc.exists || eventDoc.data().status !== "published") return null;
  return toPublicWedding({ id: eventDoc.id, ...eventDoc.data() });
}
export async function generateMetadata({ params }) {
  try { const { slug } = await params; const event = await loadWedding(slug); if (!event) return { title: "Invitación no disponible | Momently Events" }; const seo = event.publicData.seo || {}; const title = seo.title || `${event.publicData.couple.partner1} & ${event.publicData.couple.partner2} | Nuestra boda`; return { title, description: seo.description || "Acompáñanos a celebrar nuestra boda.", openGraph: { title, description: seo.description, images: seo.ogImageUrl ? [seo.ogImageUrl] : [] }, twitter: { card: "summary_large_image", title, description: seo.description, images: seo.ogImageUrl ? [seo.ogImageUrl] : [] } }; } catch { return { title: "Momently Events" }; }
}
export default async function WeddingPage({ params }) { const { slug } = await params; let event; try { event = await loadWedding(slug); } catch { event = null; } if (!event) notFound(); return <WeddingRenderer event={event} />; }
