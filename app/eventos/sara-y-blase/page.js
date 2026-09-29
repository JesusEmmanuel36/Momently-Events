import { SaraBlaseInvitation } from "@/components/events/sara-blase/SaraBlaseInvitation";
import { saraBlase } from "@/config/events/sara-blase";

export const metadata = {
  title: "Sara y Blase | Nuestra boda",
  description: saraBlase.hero.quote,
  openGraph: {
    title: "Sara y Blase | Nuestra boda",
    description: "7 de noviembre de 2026 · Parroquia del Señor del Salitre y Salón Marbella",
    images: [saraBlase.hero.image],
  },
};

export default function SaraBlasePage() {
  return <SaraBlaseInvitation wedding={saraBlase} />;
}
