import { FernandaAlejandroInvitation } from "@/components/events/fernanda-alejandro/FernandaAlejandroInvitation";
import { fernandaAlejandroPageData } from "@/config/events/fernanda-alejandro";
export const metadata = {title:"Fernanda y Alejandro | Nuestra boda",description:"7 de noviembre de 2026 · Ajax, Ontario",openGraph:{title:"Fernanda y Alejandro | Nuestra boda",images:["/images/events/fernanda-alejandro/foto1.png"]}};
export default function FernandaAlejandroPage(){return <FernandaAlejandroInvitation wedding={fernandaAlejandroPageData}/>;}
