import { ArielGabrielaInvitation } from "@/components/events/ariel-gabriela/ArielGabrielaInvitation";
import { arielGabriela } from "@/config/events/ariel-gabriela";
export const metadata={title:"Ariel y Gabriela | Nuestra boda",description:"19 de diciembre de 2026 · Hermosillo, Sonora",openGraph:{images:[arielGabriela.hero.image]}};
export default function Page(){return <ArielGabrielaInvitation wedding={arielGabriela}/>;}
