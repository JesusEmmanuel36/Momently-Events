import { Hermelinda70Invitation } from "@/components/events/hermelinda-70/Hermelinda70Invitation";
import { hermelinda70 } from "@/config/events/hermelinda-70";
export const metadata = { title: "Hermelinda Mejía Villa | Mis 70 años", description: "28 de octubre de 2026 · Misa de acción de gracias, 5:00 p. m. · Jalapa, Guerrero", openGraph: { title: "Hermelinda | Mis 70 años", images: [hermelinda70.hero.image] } };
export default function Page() { return <Hermelinda70Invitation wedding={hermelinda70}/>; }
