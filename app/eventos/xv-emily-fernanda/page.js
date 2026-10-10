import { EmilyFernandaXvInvitation } from "@/components/events/emily-fernanda-xv/EmilyFernandaXvInvitation";
import { emilyFernandaXv } from "@/config/events/emily-fernanda-xv";

export const metadata = {
  title: "Emily Fernanda | Mis XV años",
  description: "19 de diciembre de 2026 · Misa a las 4:00 p. m. · Salón Garden Palace",
  openGraph: { title: "Emily Fernanda | Mis XV años", images: ["/images/events/xv-emily-fernanda/envelope-closed.png"] },
};

export default function Page() { return <EmilyFernandaXvInvitation wedding={emilyFernandaXv} />; }
