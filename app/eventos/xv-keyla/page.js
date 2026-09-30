import { KeylaInvitation } from "./KeylaInvitation";

export const metadata = {
  title: "Keyla | Mis XV años",
  description: "Invitación a los XV años de Keyla · 5 de diciembre de 2026",
  openGraph: {
    title: "Keyla | Mis XV años",
    description: "Sábado 5 de diciembre de 2026 · Colima",
    images: ["/images/events/keyla-xv/envelope-closed.png"],
  },
};

export default function KeylaPage() {
  return <KeylaInvitation />;
}
