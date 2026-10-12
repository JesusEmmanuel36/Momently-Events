import { notFound } from "next/navigation";
import { NahomiXvInvitation } from "@/components/events/nahomi-xv/NahomiXvInvitation";
import { nahomiXv } from "@/config/events/nahomi-xv";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Nahomi", robots: { index: false, follow: false }, openGraph: { title: "Nahomi | Mis XV años", images: ["/images/events/xv-nahomi/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "xv-nahomi" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Nahomi.</p></main>;
  }
  return <NahomiXvInvitation wedding={nahomiXv} pass={pass} passToken={token} />;
}
