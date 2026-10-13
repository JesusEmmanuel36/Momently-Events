import { RolandoErikaInvitation } from "@/components/events/rolando-erika/RolandoErikaInvitation";
import { rolandoErika } from "@/config/events/rolando-erika";
export const metadata={title:"Rolando y Erika | Nuestra boda",description:"19 de diciembre de 2026 · Hércules, Querétaro",openGraph:{images:[rolandoErika.hero.image]}};
export default function Page(){return <RolandoErikaInvitation wedding={rolandoErika}/>;}
