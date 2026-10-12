import { OrlyXvInvitation } from "@/components/events/orly-xv/OrlyXvInvitation";
import { orlyXv } from "@/config/events/orly-xv";
export const metadata={title:"Orly Rivka | Mis XV años",description:"25 de octubre de 2026 · 1:00 p. m.",openGraph:{images:[orlyXv.hero.image]}};
export default function Page(){return <OrlyXvInvitation wedding={orlyXv}/>;}
