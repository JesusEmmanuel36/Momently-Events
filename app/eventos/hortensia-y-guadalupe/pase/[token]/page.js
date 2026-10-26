import { notFound } from "next/navigation";
import { HortensiaGuadalupeInvitation } from "@/components/events/hortensia-guadalupe/HortensiaGuadalupeInvitation";
import { hortensiaGuadalupe } from "@/config/events/hortensia-guadalupe";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Hortensia y Guadalupe", robots: { index: false, follow: false }, openGraph: { title: "Hortensia y Guadalupe | Bodas de oro", images: ["/images/events/hortensia-y-guadalupe/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "hortensia-y-guadalupe" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Hortensia y Guadalupe.</p></main>;
  }
  return <HortensiaGuadalupeInvitation wedding={hortensiaGuadalupe} pass={pass} passToken={token} />;
}
