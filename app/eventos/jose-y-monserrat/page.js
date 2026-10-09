import { JoseMonserratInvitation } from "@/components/events/jose-monserrat/JoseMonserratInvitation";
import { joseMonserrat } from "@/config/events/jose-monserrat";
export const metadata = {title:"José Delfino y Monserrat | Nuestra boda",description:"20 de diciembre de 2026 · Ceremonia religiosa a las 12:00 p. m.",openGraph:{title:"José Delfino y Monserrat | Nuestra boda",images:["/images/events/joseymontserrat/envelope-closed.png"]}};
export default function Page(){return <JoseMonserratInvitation wedding={joseMonserrat}/>;}
