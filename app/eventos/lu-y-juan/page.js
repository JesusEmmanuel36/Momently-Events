import { LuJuanInvitation } from "@/components/events/lu-juan/LuJuanInvitation";
import { luJuan } from "@/config/events/lu-juan";
export const metadata={title:"Lu y Juan | Nuestra boda",description:"19 de diciembre de 2026 · Puebla",openGraph:{title:"Lu y Juan | Nuestra boda",images:["/images/events/lu-y-juan/envelope-closed.png"]}};
export default function Page(){return <LuJuanInvitation wedding={luJuan}/>;}
