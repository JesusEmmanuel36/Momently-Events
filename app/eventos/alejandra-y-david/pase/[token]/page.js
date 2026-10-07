import { notFound } from "next/navigation";
import { AlejandraDavidInvitation } from "@/components/events/alejandra-david/AlejandraDavidInvitation";
import { alejandraDavid } from "@/config/events/alejandra-david";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Alejandra y David", robots: { index: false, follow: false }, openGraph: { title: "Alejandra y David | Nuestra boda", images: ["/images/events/alejandra-y-david/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a los novios.</p></main>;
  }
  return <AlejandraDavidInvitation wedding={alejandraDavid} pass={pass} passToken={token} />;
}
