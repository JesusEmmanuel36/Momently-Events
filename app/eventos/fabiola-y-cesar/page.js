import {FabiolaCesarInvitation} from "@/components/events/fabiola-cesar/FabiolaCesarInvitation";
import {fabiolaCesar} from "@/config/events/fabiola-cesar";
export const metadata={title:"Fabiola y César | Nuestra boda",description:"14 de noviembre de 2026 · Parroquia de San Andrés Jilotepec · Rancho Santa Rita",openGraph:{images:[fabiolaCesar.hero.image]}};
export default function Page(){return <FabiolaCesarInvitation wedding={fabiolaCesar}/>;}
