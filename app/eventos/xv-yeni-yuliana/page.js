import { YeniYulianaInvitation } from "@/components/events/yeni-yuliana/YeniYulianaInvitation";
import { yeniYuliana } from "@/config/events/yeni-yuliana";
export const metadata={title:"Yeni Yuliana | Mis XV años",description:"25 de diciembre de 2026 · Cabalgata 10:30 a. m. · Misa 1:00 p. m.",openGraph:{images:[yeniYuliana.hero.image]}};
export default function Page(){return <YeniYulianaInvitation wedding={yeniYuliana}/>;}
