import { RubiXimenaXvInvitation } from "@/components/events/rubi-ximena-xv/RubiXimenaXvInvitation";
import { rubiXimenaXv } from "@/config/events/rubi-ximena-xv";

export const metadata = {
  title: "Rubí Ximena | Mis XV años",
  description: "14 de noviembre de 2026 · Lagos de Moreno, Jalisco",
  openGraph: { title: "Rubí Ximena | Mis XV años", images: ["/images/events/xv-rubi-ximena/portada.png"] },
};

export default function Page() {
  return <RubiXimenaXvInvitation wedding={rubiXimenaXv} />;
}
