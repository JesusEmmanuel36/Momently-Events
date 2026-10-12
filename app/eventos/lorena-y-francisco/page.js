import { LorenaFranciscoInvitation } from "@/components/events/lorena-francisco/LorenaFranciscoInvitation";
import { lorenaFrancisco } from "@/config/events/lorena-francisco";
export const metadata={title:"Lorena y Francisco | Nuestra boda",description:"6 de marzo de 2027 · Axapusco · Quinta Doña Carmelita",openGraph:{images:[lorenaFrancisco.hero.image]}};
export default function Page(){return <LorenaFranciscoInvitation wedding={lorenaFrancisco}/>;}
