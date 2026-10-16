import { ImeldaJudithXvInvitation } from "@/components/events/imelda-judith-xv/ImeldaJudithXvInvitation";
import { imeldaJudithXv } from "@/config/events/imelda-judith-xv";
export const metadata={title:"Imelda Judith | Mis XV años",description:"31 de octubre de 2026 · Misa 7:00 p. m. · Eventos Piedra Rubí 9:00 p. m.",openGraph:{images:[imeldaJudithXv.hero.image]}};
export default function Page(){return <ImeldaJudithXvInvitation wedding={imeldaJudithXv}/>;}
