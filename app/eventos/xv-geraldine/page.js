import { GeraldineInvitation } from "@/components/events/geraldine-xv/GeraldineInvitation";
import { geraldineXv } from "@/config/events/geraldine-xv";
export const metadata = { title: "Geraldine | Mis XV años", description: "Sábado 24 de octubre de 2026 · Texcoco, Estado de México", openGraph: { title: "Geraldine | Mis XV años", description: geraldineXv.hero.quote, images: ["/images/events/geraldine-xv/envelope-closed.png"] } };
export default function Page() { return <GeraldineInvitation event={geraldineXv} />; }
