import { notFound } from "next/navigation";
import { YoatzinAldoInvitation } from "@/components/events/yoatzin-aldo/YoatzinAldoInvitation";
import { yoatzinAldo } from "@/config/events/yoatzin-aldo";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Yoatzin y Aldo", robots: { index: false, follow: false }, openGraph: { title: "Yoatzin y Aldo | Nuestra boda", images: ["/images/events/yoatzin-y-aldo/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "yoatzin-y-aldo" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Yoatzin y Aldo.</p></main>;
  }
  return <YoatzinAldoInvitation wedding={yoatzinAldo} pass={pass} passToken={token} />;
}
