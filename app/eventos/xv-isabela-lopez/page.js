import { IsabelaXvInvitation } from "@/components/events/isabela-xv/IsabelaXvInvitation";
import { isabelaXv } from "@/config/events/isabela-xv";
export const metadata={title:"Isabela | Mis XV años",description:"14 de marzo de 2027 · Una celebración inspirada en París",openGraph:{images:[isabelaXv.hero.image]}};
export default function Page(){return <IsabelaXvInvitation wedding={isabelaXv}/>;}
