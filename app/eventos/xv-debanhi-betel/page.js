import { DebanhiXvInvitation } from "@/components/events/debanhi-xv/DebanhiXvInvitation";
import { debanhiXv } from "@/config/events/debanhi-xv";
export const metadata={title:"Debanhi Betel | Mis XV años",description:"14 de noviembre de 2026 · Mis XV años",openGraph:{images:[debanhiXv.hero.image]}};
export default function Page(){return <DebanhiXvInvitation wedding={debanhiXv}/>;}
