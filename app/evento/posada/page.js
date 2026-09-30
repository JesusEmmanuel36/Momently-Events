import { PosadaInvitation } from "./PosadaInvitation";

export const metadata = {
  title: "Posada bajo las estrellas | Invitación",
  description: "Una noche de villancicos, piñata y tradición navideña.",
  openGraph: {
    title: "Posada bajo las estrellas",
    description: "19 de diciembre de 2026 · Hacienda Los Pinos",
    images: ["/images/events/posada-navidad/sobre-navideno.png"],
  },
};

export default function PosadaPage() {
  return <PosadaInvitation />;
}
