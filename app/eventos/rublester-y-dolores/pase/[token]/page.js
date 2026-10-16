import { notFound } from "next/navigation";
import { RublesterDoloresInvitation } from "@/components/events/rublester-dolores/RublesterDoloresInvitation";
import { rublesterDolores } from "@/config/events/rublester-dolores";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Rublester y Lolita", robots: { index: false, follow: false }, openGraph: { title: "Rublester y Lolita | Bodas de plata", images: ["/images/events/rublester-y-dolores/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "rublester-y-dolores" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Rublester y Lolita.</p></main>;
  }
  return <RublesterDoloresInvitation wedding={rublesterDolores} pass={pass} passToken={token} />;
}
