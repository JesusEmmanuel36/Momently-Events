import { XimenaXvInvitation } from "@/components/events/ximena-xv/XimenaXvInvitation";
import { ximenaXv } from "@/config/events/ximena-xv";
export const metadata={title:"Ximena Isabel | Mis XV años",description:"26 de diciembre de 2026",openGraph:{images:[ximenaXv.hero.image]}};
export default function Page(){return <XimenaXvInvitation wedding={ximenaXv}/>;}
