import { GerardoEvelyneInvitation } from "@/components/events/gerardo-evelyne/GerardoEvelyneInvitation";
import { gerardoEvelyne } from "@/config/events/gerardo-evelyne";
export const metadata={title:"Gerardo y Evelyne | Nuestra boda",description:"31 de octubre de 2026 · 5:00 p. m. · Salón Jardín de Miguel",openGraph:{images:[gerardoEvelyne.hero.image]}};
export default function Page(){return <GerardoEvelyneInvitation wedding={gerardoEvelyne}/>;}
