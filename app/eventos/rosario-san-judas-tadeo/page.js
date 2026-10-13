import { RosarioSanJudasInvitation } from "@/components/events/rosario-san-judas/RosarioSanJudasInvitation";
import { rosarioSanJudas } from "@/config/events/rosario-san-judas";
export const metadata={title:"Rosario de San Judas Tadeo | Familia de los Santos",description:"28 de octubre de 2026 · 6:00 p. m.",openGraph:{images:[rosarioSanJudas.hero.image]}};
export default function Page(){return <RosarioSanJudasInvitation event={rosarioSanJudas}/>;}
