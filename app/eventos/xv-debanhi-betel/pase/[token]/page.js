import { notFound } from "next/navigation";
import { DebanhiXvInvitation } from "@/components/events/debanhi-xv/DebanhiXvInvitation";
import { debanhiXv } from "@/config/events/debanhi-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Debanhi Betel", robots: { index: false, follow: false }, openGraph: { title: "Debanhi Betel | Mis XV años", images: ["/images/events/xv-debanhi/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-debanhi-betel" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Debanhi Betel.</p></main>;
  }
  return <DebanhiXvInvitation wedding={debanhiXv} pass={pass} passToken={token} />;
}
