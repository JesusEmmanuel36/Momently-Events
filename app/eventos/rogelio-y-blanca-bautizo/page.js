import { RogelioBlancaBautizoInvitation } from "@/components/events/rogelio-blanca-bautizo/RogelioBlancaBautizoInvitation";
import { rogelioBlancaBautizo } from "@/config/events/rogelio-blanca-bautizo";
export const metadata = {
  title: "Rogelio y Blanca Silvana · Boda y bautizo",
  description: "7 de noviembre de 2026 · Nuestra boda y el bautizo del pequeño Rogelio",
  openGraph: { title: "Nuestra boda y su bautizo", images: ["/images/events/rogelio-y-blanca-bautizo/hero.png"] },
};
export default function Page() { return <RogelioBlancaBautizoInvitation wedding={rogelioBlancaBautizo} />; }
