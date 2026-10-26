import {CarlaVicenteInvitation} from "@/components/events/carla-vicente/CarlaVicenteInvitation";
import {carlaVicente} from "@/config/events/carla-vicente";
export const metadata={title:"Carla y Vicente | Bodas de oro",description:"26 de diciembre de 2026 · Jiutepec, Morelos · Parroquia Santiago Apóstol y Residencial San Isidro",openGraph:{title:"Carla y Vicente | Bodas de oro",description:"26 de diciembre de 2026 · Jiutepec, Morelos",images:[carlaVicente.hero.image]}};
export default function Page(){return <CarlaVicenteInvitation event={carlaVicente}/>}
