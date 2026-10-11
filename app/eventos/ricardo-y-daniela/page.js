import { RicardoDanielaInvitation } from "@/components/events/ricardo-daniela/RicardoDanielaInvitation";
import { ricardoDaniela } from "@/config/events/ricardo-daniela";
export const metadata = { title: "Ricardo & Daniela | Nuestra boda", description: "23 de enero de 2027 · San Miguel Coatlichán · Salón de Eventos Muños", openGraph: { images: [ricardoDaniela.hero.image] } };
export default function Page() { return <RicardoDanielaInvitation wedding={ricardoDaniela}/>; }
