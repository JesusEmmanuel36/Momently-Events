import { ClaudiaPorfirioInvitation } from "@/components/events/claudia-porfirio/ClaudiaPorfirioInvitation";
import { claudiaPorfirio } from "@/config/events/claudia-porfirio";
export const metadata={title:"Claudia y Porfirio | Nuestra boda",description:"7 de noviembre de 2026 · Salón y Jardín Haida · Matamoros",openGraph:{images:[claudiaPorfirio.hero.image]}};
export default function Page(){return <ClaudiaPorfirioInvitation wedding={claudiaPorfirio}/>;}
