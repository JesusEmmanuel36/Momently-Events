import { LiahAmmyInvitation } from "@/components/events/liah-ammy/LiahAmmyInvitation";
import { liahAmmy } from "@/config/events/liah-ammy";
export const metadata = { title: "Liah Nicolle y Ammy Sophia | Nuestro bautizo", description: liahAmmy.hero.quote, openGraph: { title: "Liah Nicolle y Ammy Sophia | Nuestro bautizo", description: "29 de noviembre de 2026 · Bautizo y segundo cumpleaños de Liah Nicolle", images: ["/images/events/liah-y-ammy/envelope-closed.png"] } };
export default function LiahAmmyPage() { return <LiahAmmyInvitation event={liahAmmy} />; }
