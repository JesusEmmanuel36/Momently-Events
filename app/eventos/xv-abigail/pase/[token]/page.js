import { notFound } from "next/navigation";
import { AbigailXvInvitation } from "@/components/events/abigail-xv/AbigailXvInvitation";
import { abigailXv } from "@/config/events/abigail-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Abigail", robots: { index: false, follow: false }, openGraph: { title: "Abigail | Mis XV años", images: ["/images/events/xv-abigail/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-abigail" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Abigail.</p></main>;
  }
  return <AbigailXvInvitation wedding={abigailXv} pass={pass} passToken={token} />;
}
