import { DamarisXvInvitation } from "@/components/events/damaris-xv/DamarisXvInvitation";
import { damarisXv } from "@/config/events/damaris-xv";
export const metadata={title:"Damaris Yolimar | Mis XV años",description:"21 de noviembre de 2026 · 6:45 p. m. · La Gloria, Escobedo",openGraph:{images:[damarisXv.hero.image]}};
export default function Page(){return <DamarisXvInvitation wedding={damarisXv}/>;}
