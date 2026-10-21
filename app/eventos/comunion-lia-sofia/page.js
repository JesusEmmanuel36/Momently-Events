import {LiaSofiaComunionInvitation} from "@/components/events/lia-sofia-comunion/LiaSofiaComunionInvitation";
import {liaSofiaComunion} from "@/config/events/lia-sofia-comunion";
export const metadata={title:"Lía Sofía | Mi primera comunión",description:"28 de noviembre de 2026 · Misa 4:00 p. m. · Melchor Ocampo",openGraph:{images:[liaSofiaComunion.hero.image]}};
export default function Page(){return <LiaSofiaComunionInvitation wedding={liaSofiaComunion}/>;}
