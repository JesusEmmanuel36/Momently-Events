import { LuisJavierInvitation } from "@/components/events/luis-javier/LuisJavierInvitation";
import { luisJavier } from "@/config/events/luis-javier";
export const metadata = {
  title: "Luis y Javier | Nuestra boda",
  description: "11 de diciembre de 2026 · 5:00 p. m. · Casa Huaipe",
  openGraph: { title: "Luis y Javier | Nuestra boda", images: [luisJavier.hero.image] },
};
export default function Page() { return <LuisJavierInvitation wedding={luisJavier} />; }
