import { notFound } from "next/navigation";
import { NarcisoMaritzaInvitation } from "@/components/events/narciso-maritza/NarcisoMaritzaInvitation";
import { narcisoMaritza } from "@/config/events/narciso-maritza";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Narciso y Maritza", robots: { index: false, follow: false }, openGraph: { title: "Narciso y Maritza | Bodas de plata", images: ["/images/events/narciso-y-maritza/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "narciso-y-maritza" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Narciso y Maritza.</p></main>;
  }
  return <NarcisoMaritzaInvitation wedding={narcisoMaritza} pass={pass} passToken={token} />;
}
