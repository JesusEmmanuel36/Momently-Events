import { ZoeEmilianoInvitation } from "@/components/events/zoe-emiliano/ZoeEmilianoInvitation";
import { zoeEmiliano } from "@/config/events/zoe-emiliano";
export const metadata = {title:"Zoé y Emiliano | Nuestra boda",description:"24 de octubre de 2026 · Jardín de Eventos Pozo de Luna · 2:00 p. m.",openGraph:{title:"Zoé y Emiliano | Nuestra boda",images:["/images/events/zoe-y-emiliano/envelope-closed.png"]}};
export default function Page(){return <ZoeEmilianoInvitation wedding={zoeEmiliano}/>;}
