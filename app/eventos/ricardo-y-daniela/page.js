import { notFound } from "next/navigation";
import { RicardoDanielaInvitation } from "@/components/events/ricardo-daniela/RicardoDanielaInvitation";
import { ricardoDaniela } from "@/config/events/ricardo-daniela";
export const metadata = { title: "Ricardo & Daniela | Boda y bautizo de Ailany Fernanda", description: "23 de enero de 2027 · San Miguel Coatlichán · Salón de Eventos Muños", openGraph: { images: [ricardoDaniela.hero.image] } };
export default function Page() { if (ricardoDaniela.publicEnabled === false) notFound(); return <RicardoDanielaInvitation wedding={ricardoDaniela}/>; }
