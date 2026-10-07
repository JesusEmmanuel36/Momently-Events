import { FergieInvitation } from "@/components/events/fergie/FergieInvitation";
import { fergieXv } from "@/config/events/fergie";
export const metadata={title:"Fergie | Mis XV años",description:"28 de noviembre de 2026 · Jardín de Eventos Ahuehuetes, Naucalpan",openGraph:{title:"Fergie | Mis XV años",images:["/images/events/xv-fergie/envelope-closed.png"]}};
export default function Page(){return <FergieInvitation wedding={fergieXv}/>;}
