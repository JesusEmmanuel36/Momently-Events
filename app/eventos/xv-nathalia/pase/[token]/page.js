import { notFound } from "next/navigation";
import { NathaliaXvInvitation } from "@/components/events/nathalia-xv/NathaliaXvInvitation";
import { nathaliaXv } from "@/config/events/nathalia-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Nathalia Isabella", robots: { index: false, follow: false }, openGraph: { title: "Nathalia Isabella | Mis XV años", images: ["/images/events/xv-nathalia/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-nathalia" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Nathalia Isabella.</p></main>;
  }
  return <NathaliaXvInvitation wedding={nathaliaXv} pass={pass} passToken={token} />;
}
