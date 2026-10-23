import {CarlaVicenteInvitation} from "@/components/events/carla-vicente/CarlaVicenteInvitation";
import {carlaVicente} from "@/config/events/carla-vicente";
export const metadata={title:"Carla y Vicente | Nuestra celebración",description:"26 de diciembre de 2026 · Jiutepec, Morelos · Parroquia Santiago Apóstol y Residencial San Isidro",openGraph:{images:[carlaVicente.hero.image]}};
export default function Page(){return <CarlaVicenteInvitation event={carlaVicente}/>}
