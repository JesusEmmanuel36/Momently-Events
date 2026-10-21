import {KristellRicardoInvitation} from "@/components/events/kristell-ricardo/KristellRicardoInvitation";
import {kristellRicardo} from "@/config/events/kristell-ricardo";
export const metadata={title:"Kristell y Ricardo | Nuestra boda",description:"26 de diciembre de 2026 · Kanasín",openGraph:{images:[kristellRicardo.hero.image]}};
export default function Page(){return <KristellRicardoInvitation wedding={kristellRicardo}/>;}
