import { SaraiErickInvitation } from "@/components/events/sarai-erick/SaraiErickInvitation";
import { saraiErickPageData } from "@/config/events/sarai-erick";
export const metadata = {
  title: "Erick y Sarai | Nuestra boda",
  description: "19 de junio de 2027 · Celebra con nosotros nuestra boda.",
  openGraph: { title: "Erick y Sarai | Nuestra boda", images: ["/images/wedding/envelope/envelope-closed.png"] },
};
export default function SaraiErickPage() { return <SaraiErickInvitation wedding={saraiErickPageData} />; }
