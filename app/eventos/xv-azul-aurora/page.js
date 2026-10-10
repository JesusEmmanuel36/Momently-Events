import { AzulAuroraXvInvitation } from "@/components/events/azul-aurora-xv/AzulAuroraXvInvitation";
import { azulAuroraXv } from "@/config/events/azul-aurora-xv";
export const metadata = {
  title: "Azul Aurora | Mis XV años",
  description: "23 de enero de 2027 · Parroquia de San Francisco Totimehuacán · Misión de San Francisco",
  openGraph: { title: "Azul Aurora | Mis XV años", images: ["/images/events/azul-aurora/image.png"] },
};
export default function Page() { return <AzulAuroraXvInvitation wedding={azulAuroraXv} />; }
