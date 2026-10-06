import { FatimaJavierInvitation } from "@/components/events/fatima-javier/FatimaJavierInvitation";
import { fatimaJavier } from "@/config/events/fatima-javier";
export const metadata={title:"Fátima y Javier | Nuestra boda",description:"7 de noviembre de 2026 · Romita, Guanajuato",openGraph:{title:"Fátima y Javier | Nuestra boda",images:["/images/events/fatima-y-javier/envelope-closed.png"]}};
export default function Page(){return <FatimaJavierInvitation wedding={fatimaJavier}/>;}
