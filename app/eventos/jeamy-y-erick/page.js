import {JeamyErickInvitation} from "@/components/events/jeamy-erick/JeamyErickInvitation";
import {jeamyErick} from "@/config/events/jeamy-erick";
export const metadata={title:"Jeamy y Erick | Nuestra boda",description:"26 de diciembre de 2026 · Santuario del Señor del Sacromonte · Salón Imperial",openGraph:{images:[jeamyErick.hero.image]}};
export default function Page(){return <JeamyErickInvitation wedding={jeamyErick}/>;}
