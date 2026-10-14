import { AkariXvInvitation } from "@/components/events/akari-xv/AkariXvInvitation";
import { akariXv } from "@/config/events/akari-xv";
export const metadata={title:"Akari Elienahi | Mis XV años",description:"27 de noviembre de 2026 · Cuisillos, Jalisco",openGraph:{images:[akariXv.hero.image]}};
export default function Page(){return <AkariXvInvitation wedding={akariXv}/>;}
