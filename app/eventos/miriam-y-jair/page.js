import { MiriamJairInvitation } from "@/components/events/miriam-jair/MiriamJairInvitation";
import { miriamJair } from "@/config/events/miriam-jair";

export const metadata = {
  title: "Miriam & Jair | Nuestra boda",
  description: "19 de diciembre de 2026 · Tizayuca, Hidalgo",
  openGraph: { title: "Miriam & Jair | Nuestra boda", description: "Acompáñanos en este día tan especial.", images: ["/images/events/miriam-jair/envelope-closed.png"] },
};
export default function Page() { return <MiriamJairInvitation event={miriamJair} />; }
