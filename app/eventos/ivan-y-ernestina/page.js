import { IvanErnestinaInvitation } from "@/components/events/ivan-ernestina/IvanErnestinaInvitation";
import { ivanErnestina } from "@/config/events/ivan-ernestina";

export const metadata = {
  title: "Iván y Ernestina | Nuestra boda",
  description: ivanErnestina.hero.quote,
  openGraph: {
    title: "Iván y Ernestina | Nuestra boda",
    description: "30 de diciembre de 2026 · San Luis Potosí",
    images: [ivanErnestina.hero.image],
  },
};

export default function IvanErnestinaPage() { return <IvanErnestinaInvitation wedding={ivanErnestina} />; }
