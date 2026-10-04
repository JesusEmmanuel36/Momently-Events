import { EufraLetyInvitation } from "@/components/events/eufra-lety/EufraLetyInvitation";
import { eufraLetyPageData } from "@/config/events/eufra-lety";
export const metadata = { title: "Eufra y Lety | Nuestra boda", description: "22 de diciembre de 2026 · Tixtla de Guerrero, Guerrero", openGraph: { title: "Eufra y Lety | Nuestra boda", images: ["/images/events/eufra-y-lety/envelope-closed-el.png"] } };
export default function EufraLetyPage() { return <EufraLetyInvitation wedding={eufraLetyPageData} />; }
