import { CarlosKarlaInvitation } from "@/components/events/carlos-karla/CarlosKarlaInvitation";
import { carlosKarla } from "@/config/events/carlos-karla";
export const metadata = { title: "Carlos y Karla | Nuestra boda", description: "24 de octubre de 2026 · 6:00 p. m. · Pesquería", openGraph: { title: "Carlos y Karla | Nuestra boda", images: [carlosKarla.hero.image] } };
export default function Page() { return <CarlosKarlaInvitation wedding={carlosKarla}/>; }
