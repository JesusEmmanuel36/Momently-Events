import { notFound } from "next/navigation";
import { PalomaCarlosInvitation } from "@/components/events/paloma-carlos/PalomaCarlosInvitation";
import { palomaCarlos } from "@/config/events/paloma-carlos";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Paloma y Carlos", robots: { index: false, follow: false }, openGraph: { title: "Paloma y Carlos | Nuestra boda", images: ["/images/events/palomaycarlos/envelope-closed-pc.webp"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "paloma-y-carlos" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Paloma y Carlos.</p></main>;
  }
  return <PalomaCarlosInvitation wedding={palomaCarlos} pass={pass} passToken={token} />;
}
