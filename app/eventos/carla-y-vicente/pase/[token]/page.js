import { notFound } from "next/navigation";
import { CarlaVicenteInvitation } from "@/components/events/carla-vicente/CarlaVicenteInvitation";
import { carlaVicente } from "@/config/events/carla-vicente";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Carla y Vicente", robots: { index: false, follow: false }, openGraph: { title: "Carla y Vicente | Mis XV años", images: ["/images/events/carla-y-vicente/envelope-closed.png"] } };
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
