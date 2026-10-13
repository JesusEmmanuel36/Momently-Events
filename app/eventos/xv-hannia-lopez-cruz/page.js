import { HanniaXvInvitation } from "@/components/events/hannia-xv/HanniaXvInvitation";
import { hanniaXv } from "@/config/events/hannia-xv";
export const metadata={title:"Hannia López Cruz | Mis XV años",description:"12 de diciembre de 2026 · Banderilla, Veracruz",openGraph:{images:[hanniaXv.hero.image]}};
export default function Page(){return <HanniaXvInvitation wedding={hanniaXv}/>;}
