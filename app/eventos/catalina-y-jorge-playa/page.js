import { CatalinaJorgePlayaInvitation } from "@/components/events/catalina-jorge-playa/CatalinaJorgePlayaInvitation";
import { catalinaJorgePlaya } from "@/config/events/catalina-jorge-playa";
export const metadata={title:"Catalina y Jorge | Boda junto al mar",description:"23 de enero de 2027 · 8:00 p. m. · Mazatlán, Sinaloa",openGraph:{images:[catalinaJorgePlaya.hero.image]}};
export default function Page(){return <CatalinaJorgePlayaInvitation wedding={catalinaJorgePlaya}/>;}
