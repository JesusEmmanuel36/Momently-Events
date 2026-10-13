import { notFound } from "next/navigation";
import { ClaudiaPorfirioInvitation } from "@/components/events/claudia-porfirio/ClaudiaPorfirioInvitation";
import { claudiaPorfirio } from "@/config/events/claudia-porfirio";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Claudia y Porfirio", robots: { index: false, follow: false }, openGraph: { title: "Claudia y Porfirio | Nuestra boda", images: ["/images/events/claudia-y-porfirio/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "claudia-y-porfirio" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Claudia y Porfirio.</p></main>;
  }
  return <ClaudiaPorfirioInvitation wedding={claudiaPorfirio} pass={pass} passToken={token} />;
}
