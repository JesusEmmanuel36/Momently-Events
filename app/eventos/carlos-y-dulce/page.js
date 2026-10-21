import {CarlosDulceInvitation} from "@/components/events/carlos-dulce/CarlosDulceInvitation";
import {carlosDulce} from "@/config/events/carlos-dulce";
export const metadata={title:"Carlos y Dulce | Nuestra boda",description:"21 de noviembre de 2026 · Quinta San Miguel, Ayotlán, Jalisco",openGraph:{images:[carlosDulce.hero.image]}};
export default function Page(){return <CarlosDulceInvitation wedding={carlosDulce}/>;}
