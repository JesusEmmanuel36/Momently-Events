import { AmadayInvitation } from "@/components/events/amaday-xv/AmadayInvitation";
import { amadayXv } from "@/config/events/amaday-xv";
export const metadata = { title: "Amaday Guadalupe | Mis XV años", description: amadayXv.hero.quote, openGraph: { title: "Amaday Guadalupe | Mis XV años", description: "Carbó, Sonora · Una invitación para ti", images: ["/images/events/amaday-xv/envelope-closed.png"] } };
export default function AmadayPage() { return <AmadayInvitation event={amadayXv} />; }
