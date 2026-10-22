import {OscarBrendaInvitation} from "@/components/events/oscar-brenda/OscarBrendaInvitation";
import {oscarBrenda} from "@/config/events/oscar-brenda";
export const metadata={title:"Óscar Oswaldo y Brenda Mitziry | Nuestra boda",description:"21 de noviembre de 2026 · Misa 10:00 a. m. · Recepción 5:00 p. m.",openGraph:{images:[oscarBrenda.hero.image]}};
export default function Page(){return <OscarBrendaInvitation wedding={oscarBrenda}/>;}
