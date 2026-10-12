import { HortensiaGuadalupeInvitation } from "@/components/events/hortensia-guadalupe/HortensiaGuadalupeInvitation";
import { hortensiaGuadalupe } from "@/config/events/hortensia-guadalupe";
export const metadata={title:"Hortensia y Guadalupe | Bodas de oro",description:"50 años de amor · 26 de diciembre de 2026 · Salón Anthea",openGraph:{images:[hortensiaGuadalupe.hero.image]}};
export default function Page(){return <HortensiaGuadalupeInvitation wedding={hortensiaGuadalupe}/>;}
