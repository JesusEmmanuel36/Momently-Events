import { MontserratAndreiInvitation } from "@/components/events/montserrat-andrei/MontserratAndreiInvitation";
import { montserratAndrei } from "@/config/events/montserrat-andrei";
export const metadata = {
  title: "Montserrat y Blair Andrei | Nuestra boda",
  description: "16 de enero de 2027 · 2:00 p. m. · Salón de eventos Confetti. Una celebración con el encanto del bordado yucateco.",
  openGraph: { title: "Montserrat y Blair Andrei | Nuestra boda", images: [montserratAndrei.hero.image] }
};
export default function Page() { return <MontserratAndreiInvitation wedding={montserratAndrei}/>; }
