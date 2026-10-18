import { notFound } from "next/navigation";
import { MariaLuisInvitation } from "@/components/events/maria-luis/MariaLuisInvitation";
import { mariaLuis } from "@/config/events/maria-luis";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | María Luisa y Luis Enrique", robots: { index: false, follow: false }, openGraph: { title: "María Luisa y Luis Enrique | Nuestra boda", images: ["/images/events/maria-y-luis/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "maria-y-luis" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a María Luisa y Luis Enrique.</p></main>;
  }
  return <MariaLuisInvitation wedding={mariaLuis} pass={pass} passToken={token} />;
}
