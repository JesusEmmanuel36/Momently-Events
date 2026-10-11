import { ReynaDomingoInvitation } from "@/components/events/reyna-domingo/ReynaDomingoInvitation";
import { reynaDomingo } from "@/config/events/reyna-domingo";
export const metadata = {title:"Reyna Berenice & Domingo | Nuestra boda",description:"26 de diciembre de 2026 · Acapulco de Juárez",openGraph:{images:[reynaDomingo.hero.image]}};
export default function Page(){return <ReynaDomingoInvitation wedding={reynaDomingo}/>;}
