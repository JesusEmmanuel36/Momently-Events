import { RigoSinahiInvitation } from "@/components/events/rigo-sinahi/RigoSinahiInvitation";
import { rigoSinahi } from "@/config/events/rigo-sinahi";
export const metadata = {title:"Rigo & Sinahí | Nuestra boda",description:"14 de noviembre de 2026 · Salón de Eventos Lunali",openGraph:{images:[rigoSinahi.hero.image]}};
export default function Page(){return <RigoSinahiInvitation wedding={rigoSinahi}/>;}
