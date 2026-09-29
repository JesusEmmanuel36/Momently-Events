import { LeslyMarcelinoInvitation } from "@/components/events/lesly-marcelino/LeslyMarcelinoInvitation";
import { leslyMarcelino } from "@/config/events/lesly-marcelino";

export const metadata = {
  title: "Lesly y Marcelino | Nuestra boda",
  description: leslyMarcelino.hero.quote,
  openGraph: {
    title: "Lesly y Marcelino | Nuestra boda",
    description: "27 de diciembre de 2026 · Anacleta Jardín de Eventos",
    images: [leslyMarcelino.hero.image],
  },
};

export default function LeslyMarcelinoPage() { return <LeslyMarcelinoInvitation wedding={leslyMarcelino} />; }
