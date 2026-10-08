import { EsmeraldaAntonioInvitation } from "@/components/events/esmeralda-antonio/EsmeraldaAntonioInvitation";
import { esmeraldaAntonio } from "@/config/events/esmeralda-antonio";
export const metadata = {title:"Esmeralda y Antonio | Nuestra boda",description:"5 de diciembre de 2026 · Misa a las 2:00 p. m.",openGraph:{title:"Esmeralda y Antonio | Nuestra boda",images:["/images/events/esmeralda-y-antonio/envelope-closed.png"]}};
export default function Page(){return <EsmeraldaAntonioInvitation wedding={esmeraldaAntonio}/>;}
