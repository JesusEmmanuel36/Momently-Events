import { PatriciaInvitation } from "@/components/events/patricia-bautizo/PatriciaInvitation";
import { patriciaBautizo } from "@/config/events/patricia-bautizo";
export const metadata = { title: "Patricia Valentina | Mi bautizo", description: patriciaBautizo.hero.quote, openGraph: { title: "Patricia Valentina | Mi bautizo", description: "1 de noviembre de 2026 · Acatlán de Juárez", images: [patriciaBautizo.hero.image] } };
export default function PatriciaPage() { return <PatriciaInvitation event={patriciaBautizo} />; }
