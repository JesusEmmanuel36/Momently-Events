import {YamilethInvitation} from "@/components/events/yamileth-xv/YamilethInvitation";
import {yamilethXv} from "@/config/events/yamileth-xv";
export const metadata={title:"Yamileth Abigail | Mis XV años",description:"8 de noviembre de 2026 · Misa 11:00 a. m. en Peñuela, Veracruz · Recepción en Yanga",openGraph:{images:[yamilethXv.hero.image]}};
export default function Page(){return <YamilethInvitation event={yamilethXv}/>}
