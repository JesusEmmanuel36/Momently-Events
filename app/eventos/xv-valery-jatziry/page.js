import { ValeryInvitation } from "@/components/events/valery-xv/ValeryInvitation";
import { valeryXv } from "@/config/events/valery-xv";
export const metadata = { title: "Valery Jatziry | Mis XV años", description: valeryXv.hero.quote, openGraph: { title: "Valery Jatziry | Mis XV años", description: "7 de noviembre de 2026 · Santo Tomás Chiconautla", images: ["/images/events/xv-valery-jatziry/envelope-closed.png"] } };
export default function Page() { return <ValeryInvitation event={valeryXv} />; }
