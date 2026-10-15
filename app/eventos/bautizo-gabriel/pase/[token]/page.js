import { notFound } from "next/navigation";
import { GabrielBautizoInvitation } from "@/components/events/gabriel-bautizo/GabrielBautizoInvitation";
import { gabrielBautizo } from "@/config/events/gabriel-bautizo";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Gabriel Alexandro", robots: { index: false, follow: false }, openGraph: { title: "Gabriel Alexandro | Mi bautizo", images: ["/images/events/bautizo-gabriel/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "bautizo-gabriel" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Gabriel Alexandro.</p></main>;
  }
  return <GabrielBautizoInvitation wedding={gabrielBautizo} pass={pass} passToken={token} />;
}
