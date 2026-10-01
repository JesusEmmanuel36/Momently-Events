import { KarinaDanielInvitation } from "@/components/events/karina-daniel/KarinaDanielInvitation";
import { karinaDaniel } from "@/config/events/karina-daniel";
export const metadata = { title: "Karina y Daniel | Nuestra boda", description: karinaDaniel.hero.quote, openGraph: { title: "Karina y Daniel | Nuestra boda", description: "5 de diciembre · Una invitación para ti", images: ["/images/events/karina-daniel/envelope-closed.png"] } };
export default function KarinaDanielPage() { return <KarinaDanielInvitation wedding={karinaDaniel} />; }
