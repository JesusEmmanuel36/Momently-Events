import { MarioJazminInvitation } from "@/components/events/mario-jazmin/MarioJazminInvitation";
import { marioJazmin } from "@/config/events/mario-jazmin";
export const metadata = { title: "Mario & Jazmin | Nuestra boda", description: "26 de diciembre de 2026 · Navojoa, Sonora", openGraph: { images: [marioJazmin.hero.image] } };
export default function Page() { return <MarioJazminInvitation wedding={marioJazmin}/>; }
