import { RicardoBelindaInvitation } from "@/components/events/ricardo-belinda/RicardoBelindaInvitation";
import { ricardoBelinda } from "@/config/events/ricardo-belinda";
export const metadata = {title:"Ricardo & Belinda | Nuestra boda",description:"23 de octubre de 2026 · Chignahuapan, Puebla",openGraph:{images:[ricardoBelinda.hero.image]}};
export default function Page(){return <RicardoBelindaInvitation wedding={ricardoBelinda}/>;}
