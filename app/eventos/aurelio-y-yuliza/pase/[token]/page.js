import { notFound } from "next/navigation";
import { AurelioYulizaInvitation } from "@/components/events/aurelio-yuliza/AurelioYulizaInvitation";
import { aurelioYuliza } from "@/config/events/aurelio-yuliza";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Aurelio Sebastián y Yuliza", robots: { index: false, follow: false }, openGraph: { title: "Aurelio Sebastián y Yuliza | Nuestra boda", images: ["/images/events/aurelio-y-yuliza/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "aurelio-y-yuliza" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Aurelio Sebastián y Yuliza.</p></main>;
  }
  return <AurelioYulizaInvitation wedding={aurelioYuliza} pass={pass} passToken={token} />;
}
