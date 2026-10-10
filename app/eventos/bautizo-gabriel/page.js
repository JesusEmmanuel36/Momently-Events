import { GabrielBautizoInvitation } from "@/components/events/gabriel-bautizo/GabrielBautizoInvitation";
import { gabrielBautizo } from "@/config/events/gabriel-bautizo";
export const metadata = { title: "Gabriel Alexandro | Mi bautizo", description: "15 de noviembre de 2026 · San Luis Potosí", openGraph: { title: "Gabriel Alexandro | Mi bautizo", images: [gabrielBautizo.hero.image] } };
export default function Page() { return <GabrielBautizoInvitation wedding={gabrielBautizo}/>; }
