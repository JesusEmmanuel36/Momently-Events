import { DavidReynaInvitation } from "@/components/events/david-reyna/DavidReynaInvitation";
import { davidReyna } from "@/config/events/david-reyna";
export const metadata={title:"David y Reyna | Nuestra boda civil",description:"26 de diciembre de 2026 · Salón Calindha Eventos · Inicio de la ceremonia 5:30 p. m.",openGraph:{images:["/images/events/david-y-reyna/hero.png"]}};
export default function Page(){return <DavidReynaInvitation wedding={davidReyna}/>;}
