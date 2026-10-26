import { notFound } from "next/navigation";
import { FabiolaJuanPabloInvitation } from "@/components/events/fabiola-juan-pablo/FabiolaJuanPabloInvitation";
import { fabiolaJuanPablo } from "@/config/events/fabiola-juan-pablo";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Fabiola y Juan Pablo", robots: { index: false, follow: false }, openGraph: { title: "Fabiola y Juan Pablo | Nuestra boda", images: ["/images/events/fabiola-y-juan-pablo/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "fabiola-y-juan-pablo" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Fabiola y Juan Pablo.</p></main>;
  }
  return <FabiolaJuanPabloInvitation wedding={fabiolaJuanPablo} pass={pass} passToken={token} />;
}
