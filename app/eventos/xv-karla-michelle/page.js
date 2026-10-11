import { KarlaMichelleXvInvitation } from "@/components/events/karla-michelle-xv/KarlaMichelleXvInvitation";
import { karlaMichelleXv } from "@/config/events/karla-michelle-xv";
export const metadata={title:"Karla Michelle | Mis XV años",description:"26 de diciembre de 2026 · Una noche para soñar",openGraph:{images:[karlaMichelleXv.hero.image]}};
export default function Page(){return <KarlaMichelleXvInvitation wedding={karlaMichelleXv}/>;}
