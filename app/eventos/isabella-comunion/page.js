import { IsabellaComunionInvitation } from "@/components/events/isabella-comunion/IsabellaComunionInvitation";
import { isabellaComunion } from "@/config/events/isabella-comunion";
export const metadata={title:"Isabella | Mi primera comunión",description:"5 de diciembre de 2026 · San Pedro Cholula",openGraph:{images:[isabellaComunion.hero.image]}};
export default function Page(){return <IsabellaComunionInvitation wedding={isabellaComunion}/>;}
