import { SusanIsabelXvInvitation } from "@/components/events/susan-isabel-xv/SusanIsabelXvInvitation";
import { susanIsabelXv } from "@/config/events/susan-isabel-xv";
export const metadata={title:"Susan Isabel | Mis XV años",description:"7 de noviembre de 2026 · Acompáñame a celebrar mis XV años. Misa 1:30 p. m. y comida 3:00 p. m.",openGraph:{images:[susanIsabelXv.hero.image]}};
export default function Page(){return <SusanIsabelXvInvitation wedding={susanIsabelXv}/>;}
