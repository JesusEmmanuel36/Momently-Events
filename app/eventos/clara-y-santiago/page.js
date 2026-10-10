import { ClaraSantiagoInvitation } from "@/components/events/clara-santiago/ClaraSantiagoInvitation";
import { claraSantiago } from "@/config/events/clara-santiago";
export const metadata = {
  title: "Clara y Santiago | Nuestra boda",
  description: "29 de noviembre de 2026 · 5:00 p. m. · Salón de Eventos Las Hadas, Valle de Tules",
  openGraph: { title: "Clara y Santiago | Nuestra boda", images: ["/images/events/clara-y-santiago/hero.png"] },
};
export default function Page() { return <ClaraSantiagoInvitation wedding={claraSantiago} />; }
