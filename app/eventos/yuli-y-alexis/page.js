import { YuliAlexisInvitation } from "@/components/events/yuli-alexis/YuliAlexisInvitation";
import { yuliAlexis } from "@/config/events/yuli-alexis";
export const metadata={title:"Yuli y Alexis | Nuestra boda",description:"7 de noviembre de 2026 · Ceremonia 5:30 p. m. · Recepción 6:30 p. m.",openGraph:{title:"Yuli y Alexis | Nuestra boda",images:["/images/events/yuli-y-alexis/envelope-closed.png"]}};
export default function Page(){return <YuliAlexisInvitation wedding={yuliAlexis}/>;}
