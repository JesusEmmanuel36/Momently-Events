import { notFound } from "next/navigation";
import { KristellRicardoInvitation } from "@/components/events/kristell-ricardo/KristellRicardoInvitation";
import { kristellRicardo } from "@/config/events/kristell-ricardo";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Kristell y Ricardo", robots: { index: false, follow: false }, openGraph: { title: "Kristell y Ricardo | Nuestra boda", images: ["/images/events/kristell-y-ricardo/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "kristell-y-ricardo" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Kristell y Ricardo.</p></main>;
  }
  return <KristellRicardoInvitation wedding={kristellRicardo} pass={pass} passToken={token} />;
}
