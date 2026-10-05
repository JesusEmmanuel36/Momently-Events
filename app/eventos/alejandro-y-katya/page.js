import { AlejandroKatyaInvitation } from "@/components/events/alejandro-katya/AlejandroKatyaInvitation";
import { alejandroKatya } from "@/config/events/alejandro-katya";
export const metadata = {title:"Alejandro y Katya | Nuestra boda",description:"20 de octubre de 2026 · 6:30 p. m. · Luna Dorada, Chetumal",openGraph:{title:"Alejandro y Katya | Nuestra boda",images:["/images/events/alejandro-y-katya/envelope-closed.png"]}};
export default function Page(){return <AlejandroKatyaInvitation wedding={alejandroKatya}/>;}
