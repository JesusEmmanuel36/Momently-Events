import { notFound, redirect } from "next/navigation";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { toPublicWedding } from "@/lib/wedding/public-data";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export default async function Preview({ params }) { try { await requireAdmin(); } catch { redirect("/admin/login"); } const { eventId } = await params; const snap = await getAdminDb().collection("events").doc(eventId).get(); if (!snap.exists) notFound(); return <><div className="preview-banner">Vista previa privada · Esta invitación puede no estar publicada</div><WeddingRenderer event={toPublicWedding({ id: snap.id, ...snap.data() })} /></>; }
