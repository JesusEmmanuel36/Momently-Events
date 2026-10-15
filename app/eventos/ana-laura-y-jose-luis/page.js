import { AnaLauraJoseLuisInvitation } from "@/components/events/ana-laura-jose-luis/AnaLauraJoseLuisInvitation";
import { anaLauraJoseLuis } from "@/config/events/ana-laura-jose-luis";
export const metadata={title:"Ana Laura y José Luis | Nuestra boda",description:"7 de noviembre de 2026 · Misa 1:00 p. m. · Santuario del Señor del Sacromonte · Salón Las Torres.",openGraph:{images:[anaLauraJoseLuis.hero.image]}};
export default function Page(){return <AnaLauraJoseLuisInvitation wedding={anaLauraJoseLuis}/>;}
