import { KrystelInvitation } from "@/components/events/krystel-xv/KrystelInvitation";
import { krystelXv } from "@/config/events/krystel-xv";

const previewImage = krystelXv.hero.image || "/images/events/krystel-xv/envelope-closed.png";

export const metadata = {
  title: "Krystel | Mis XV años",
  description: krystelXv.hero.quote,
  openGraph: {
    title: "Krystel | Mis XV años",
    description: "27 de diciembre de 2026 · Balleza, Chihuahua",
    images: [previewImage],
  },
};

export default function KrystelPage() {
  return <KrystelInvitation event={krystelXv} />;
}
