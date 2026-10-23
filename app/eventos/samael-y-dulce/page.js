import {SamaelDulceInvitation} from "@/components/events/samael-dulce/SamaelDulceInvitation";
import {samaelDulce} from "@/config/events/samael-dulce";
export const metadata={title:"Samael y Dulce | Nuestra boda",description:"30 de enero de 2027 · Salón París · Ceremonia 4:30 p. m. y fiesta 5:00 p. m.",openGraph:{images:[samaelDulce.hero.image]}};
export default function Page(){return <SamaelDulceInvitation wedding={samaelDulce}/>}
