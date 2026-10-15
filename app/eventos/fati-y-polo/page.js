import { FatiPoloInvitation } from "@/components/events/fati-polo/FatiPoloInvitation";
import { fatiPolo } from "@/config/events/fati-polo";
export const metadata={title:"Fati y Polo | Nuestra boda",description:"26 de diciembre de 2026 · Irapuato · Misa 2:00 p. m. · Recepción 6:00 p. m.",openGraph:{images:[fatiPolo.hero.image]}};
export default function Page(){return <FatiPoloInvitation wedding={fatiPolo}/>;}
