import { MargaritaMateoInvitation } from "@/components/events/margarita-mateo/MargaritaMateoInvitation";
import { margaritaMateo } from "@/config/events/margarita-mateo";

export const metadata = {
  title: "Margarita y Mateo | Nuestra boda",
  description: margaritaMateo.hero.quote,
  openGraph: {
    title: "Margarita y Mateo | Nuestra boda",
    description: "19 de diciembre de 2026 · Coscomatepec, Veracruz",
    images: [margaritaMateo.hero.image],
  },
};

export default function MargaritaMateoPage() {
  return <MargaritaMateoInvitation wedding={margaritaMateo} />;
}
