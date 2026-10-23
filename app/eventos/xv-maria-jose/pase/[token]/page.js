import { notFound } from "next/navigation";
import { MariaJoseInvitation } from "@/components/events/maria-jose-xv/MariaJoseInvitation";
import { mariaJoseXv } from "@/config/events/maria-jose-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | María José", robots: { index: false, follow: false }, openGraph: { title: "María José | Mis XV años", images: ["/images/events/xv-maria-jose/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-maria-jose" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a María José.</p></main>;
  }
  return <MariaJoseInvitation event={mariaJoseXv} pass={pass} />;
}
