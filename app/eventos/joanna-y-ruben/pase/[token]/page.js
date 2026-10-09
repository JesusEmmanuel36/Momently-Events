import { notFound } from "next/navigation";
import { JoannaRubenInvitation } from "@/components/events/joanna-ruben/JoannaRubenInvitation";
import { joannaRuben } from "@/config/events/joanna-ruben";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Joanna y Rubén", robots: { index: false, follow: false }, openGraph: { title: "Joanna y Rubén | Nuestra boda", images: ["/images/events/joanna-y-ruben/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "joanna-y-ruben" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a los novios.</p></main>;
  }
  return <JoannaRubenInvitation wedding={joannaRuben} pass={pass} passToken={token} />;
}
