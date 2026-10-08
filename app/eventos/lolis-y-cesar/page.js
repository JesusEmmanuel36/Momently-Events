import { LolisCesarInvitation } from "@/components/events/lolis-cesar/LolisCesarInvitation";
import { lolisCesar } from "@/config/events/lolis-cesar";
export const metadata={title:"Lolis y César | Nuestra boda",description:"5 de diciembre de 2026 · Ceremonia 1:00 p. m. · Recepción 3:00 p. m.",openGraph:{title:"Lolis y César | Nuestra boda",images:["/images/events/lolis-y-cesar/envelope-closed.png"]}};
export default function Page(){return <LolisCesarInvitation wedding={lolisCesar}/>;}
