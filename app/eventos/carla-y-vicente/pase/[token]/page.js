import { notFound } from "next/navigation";
import { CarlaVicenteInvitation } from "@/components/events/carla-vicente/CarlaVicenteInvitation";
import { carlaVicente } from "@/config/events/carla-vicente";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tu pase | Carla y Vicente",
  description: "Tu invitación personalizada a la celebración de las bodas de oro de Carla y Vicente · 26 de diciembre de 2026.",
  robots: { index: false, follow: false },
  openGraph: { type: "website", title: "Carla y Vicente | Bodas de oro", description: "26 de diciembre de 2026 · Una invitación especial para ti.", images: ["/images/events/carla-vicente/envelope-closed.webp"] },
  twitter: { card: "summary_large_image", title: "Carla y Vicente | Bodas de oro", description: "26 de diciembre de 2026 · Una invitación especial para ti.", images: ["/images/events/carla-vicente/envelope-closed.webp"] }
};
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "carla-y-vicente" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Carla y Vicente.</p></main>;
  }
  return <CarlaVicenteInvitation event={carlaVicente} pass={pass} />;
}
