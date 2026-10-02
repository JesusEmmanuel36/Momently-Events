import { OmarLilianaInvitation } from "@/components/events/omar-liliana/OmarLilianaInvitation";
import { omarLiliana } from "@/config/events/omar-liliana";
export const metadata = { title: "Omar y Liliana | Nuestra boda", description: omarLiliana.hero.quote, openGraph: { title: "Omar y Liliana | Nuestra boda", description: "26 de octubre de 2026 · Ciudad Juárez", images: ["/images/events/omar-liliana/envelope-closed.png"] } };
export default function OmarLilianaPage() { return <OmarLilianaInvitation wedding={omarLiliana} />; }
