import { ErickErikaInvitation } from "@/components/events/erick-erika/ErickErikaInvitation";
import { erickErika } from "@/config/events/erick-erika";

export const metadata = {
  title: "Erick y Erika | Nuestra boda",
  description: erickErika.hero.quote,
  openGraph: {
    title: "Erick y Erika | Nuestra boda",
    description: "14 de noviembre de 2026 · Una invitación para ti",
    images: [erickErika.hero.image],
  },
};

export default function ErickErikaPage() {
  return <ErickErikaInvitation wedding={erickErika} />;
}
