import { notFound } from "next/navigation";
import { KarlaMichelleXvInvitation } from "@/components/events/karla-michelle-xv/KarlaMichelleXvInvitation";
import { karlaMichelleXv } from "@/config/events/karla-michelle-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Karla Michelle", robots: { index: false, follow: false }, openGraph: { title: "Karla Michelle | Mis XV años", images: ["/images/events/xv-karla-michelle/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-karla-michelle" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Karla Michelle.</p></main>;
  }
  return <KarlaMichelleXvInvitation wedding={karlaMichelleXv} pass={pass} passToken={token} />;
}
