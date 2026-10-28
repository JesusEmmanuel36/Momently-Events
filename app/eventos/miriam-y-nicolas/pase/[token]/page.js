import { notFound } from "next/navigation";
import { MiriamNicolasInvitation } from "@/components/events/miriam-nicolas/MiriamNicolasInvitation";
import { miriamNicolas } from "@/config/events/miriam-nicolas";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Miriam y Nicolás", robots: { index: false, follow: false }, openGraph: { title: "Miriam y Nicolás | Nuestra boda", images: ["/images/events/miriam-y-nicolas/envelope-closed.webp"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "miriam-y-nicolas" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Miriam y Nicolás.</p></main>;
  }
  return <MiriamNicolasInvitation wedding={miriamNicolas} pass={pass} passToken={token} />;
}
