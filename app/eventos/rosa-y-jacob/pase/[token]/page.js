import { notFound } from "next/navigation";
import { RosaJacobInvitation } from "@/components/events/rosa-jacob/RosaJacobInvitation";
import { rosaJacob } from "@/config/events/rosa-jacob";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Rosa Sarahi y Jacob Israel", robots: { index: false, follow: false }, openGraph: { title: "Rosa Sarahi y Jacob Israel | Nuestra boda", images: ["/images/events/rosa-y-jacob/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "rosa-y-jacob" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Rosa Sarahi y Jacob Israel.</p></main>;
  }
  return <RosaJacobInvitation wedding={rosaJacob} pass={pass} passToken={token} />;
}
