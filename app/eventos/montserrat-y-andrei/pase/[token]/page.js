import { notFound } from "next/navigation";
import { MontserratAndreiInvitation } from "@/components/events/montserrat-andrei/MontserratAndreiInvitation";
import { montserratAndrei } from "@/config/events/montserrat-andrei";
import { readPass } from "@/lib/event-passes/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Tu pase | Montserrat y Blair Andrei", robots: { index: false, follow: false }, openGraph: { title: "Montserrat y Blair Andrei | Nuestra boda", images: ["/images/events/montserrat-y-andrei/envelope-closed.png"] } };
export default async function Page({ params }) {
  const { token } = await params;
  let pass;
  try { pass = await readPass(token, { slug: "montserrat-y-andrei" }); }
  catch (error) {
    if (error.status === 404) notFound();
    return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a Montserrat y Blair Andrei.</p></main>;
  }
  return <MontserratAndreiInvitation wedding={montserratAndrei} pass={pass} passToken={token} />;
}
