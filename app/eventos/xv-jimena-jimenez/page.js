import { JimenaXvInvitation } from "@/components/events/jimena-xv/JimenaXvInvitation";
import { jimenaXv } from "@/config/events/jimena-xv";
export const metadata={title:"Jimena Jiménez Cruz | Mis XV años",description:"28 de noviembre de 2026 · Misa 1:00 p. m. · Atizapán de Zaragoza",openGraph:{title:"Jimena Jiménez Cruz | Mis XV años",images:["/images/events/xv-jimena-jimenez/envelope-closed.png"]}};
export default function Page(){return <JimenaXvInvitation wedding={jimenaXv}/>;}
