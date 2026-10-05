import { AnaPaulaInvitation } from "@/components/events/ana-paula/AnaPaulaInvitation";
import { anaPaula } from "@/config/events/ana-paula";
export const metadata={title:"Ana Paula | Mi bautizo",description:"26 de diciembre de 2026 · Cuautitlán Izcalli, Estado de México",openGraph:{title:"Ana Paula | Mi bautizo",images:["/images/events/bautizmo-ana-paula/envelope-closed.png"]}};
export default function Page(){return <AnaPaulaInvitation event={anaPaula}/>;}
