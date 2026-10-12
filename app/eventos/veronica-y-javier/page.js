import { VeronicaJavierInvitation } from "@/components/events/veronica-javier/VeronicaJavierInvitation";
import { veronicaJavier } from "@/config/events/veronica-javier";
export const metadata={title:"Verónica y Javier | Nuestra boda",description:"20 de diciembre de 2026 · Huejotzingo, Puebla",openGraph:{images:[veronicaJavier.hero.image]}};
export default function Page(){return <VeronicaJavierInvitation wedding={veronicaJavier}/>;}
