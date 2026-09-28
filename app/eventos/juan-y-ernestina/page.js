import { JuanErnestinaInvitation } from "@/components/events/juan-ernestina/JuanErnestinaInvitation";
import { juanErnestina } from "@/config/events/juan-ernestina";

export const metadata = {
  title: "Juan y Ernestina | Nuestra boda",
  description: juanErnestina.hero.quote,
  openGraph: {
    title: "Juan y Ernestina | Nuestra boda",
    description: "30 de diciembre de 2026 · San Luis Potosí",
    images: [juanErnestina.hero.image],
  },
};

export default function JuanErnestinaPage() { return <JuanErnestinaInvitation wedding={juanErnestina} />; }
