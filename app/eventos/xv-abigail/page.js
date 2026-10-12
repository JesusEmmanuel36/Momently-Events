import { AbigailXvInvitation } from "@/components/events/abigail-xv/AbigailXvInvitation";
import { abigailXv } from "@/config/events/abigail-xv";
export const metadata={title:"Abigail | Mis XV años",description:"12 de diciembre de 2026 · Salón Gina Loren",openGraph:{images:[abigailXv.hero.image]}};
export default function Page(){return <AbigailXvInvitation wedding={abigailXv}/>;}
