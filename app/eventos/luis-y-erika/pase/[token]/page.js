import { notFound } from "next/navigation";
import { LuisErikaInvitation } from "@/components/events/luis-erika/LuisErikaInvitation";
import { luisErika } from "@/config/events/luis-erika";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Luis Antonio y Erika", robots: { index: false, follow: false }, openGraph: { title: "Luis Antonio y Erika | Nuestra boda", images: ["/images/events/luis-y-erika/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "luis-y-erika" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Luis Antonio y Erika.</p></main>;
  }
  return <LuisErikaInvitation event={luisErika} pass={pass} passToken={token} />;
}
