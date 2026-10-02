import { GabrielaInvitation } from "@/components/events/gabriela-xv/GabrielaInvitation";
import { gabrielaXv } from "@/config/events/gabriela-xv";
export const metadata = { title: "Gabriela Elizabeth | Mis XV años", description: gabrielaXv.hero.quote, openGraph: { title: "Gabriela Elizabeth | Mis XV años", description: "31 de octubre de 2026", images: ["/images/events/gabriela-xv/envelope-closed.png"] } };
export default function GabrielaPage() { return <GabrielaInvitation event={gabrielaXv} />; }
