import { notFound } from "next/navigation";
import { FabiolaCesarInvitation } from "@/components/events/fabiola-cesar/FabiolaCesarInvitation";
import { fabiolaCesar } from "@/config/events/fabiola-cesar";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Fabiola y César", robots: { index: false, follow: false }, openGraph: { title: "Fabiola y César | Nuestra boda", images: ["/images/events/fabiola-y-cesar/ramas.svg"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "fabiola-y-cesar" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Fabiola y César.</p></main>;
  }
  return <FabiolaCesarInvitation wedding={fabiolaCesar} pass={pass} passToken={token} />;
}
