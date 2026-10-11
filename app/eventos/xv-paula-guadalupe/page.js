import { PaulaXvInvitation } from "@/components/events/paula-xv/PaulaXVInvitation";
import { paulaXv } from "@/config/events/paula-xv";
export const metadata = {title:"Paula Guadalupe | Mis XV años",description:"28 de noviembre de 2026 · Hermosillo, Sonora",openGraph:{images:[paulaXv.hero.image]}};
export default function Page(){return <PaulaXvInvitation wedding={paulaXv}/>;}
