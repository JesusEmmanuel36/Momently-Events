import { CarlosComunionInvitation } from "@/components/events/carlos-comunion/CarlosComunionInvitation";
import { carlosComunion } from "@/config/events/carlos-comunion";
export const metadata={title:"Carlos | Mi primera comunión",description:"Sábado 28 de noviembre de 2026 · 1:00 p. m.",openGraph:{title:"Carlos | Mi primera comunión",images:["/images/events/carlos-comunion/envelope-closed.png"]}};
export default function Page(){return <CarlosComunionInvitation event={carlosComunion}/>;}
