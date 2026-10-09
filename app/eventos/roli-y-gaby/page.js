import { RoliGabyInvitation } from "@/components/events/roli-gaby/RoliGabyInvitation";
import { roliGaby } from "@/config/events/roli-gaby";
export const metadata={title:"Roli y Gaby | Nuestra boda civil",description:"26 de diciembre de 2026 · 8:00 p. m. · Sala de fiestas Aryadne, Baca, Yucatán",openGraph:{title:"Roli y Gaby | Nuestra boda civil",images:["/images/events/roli-y-gaby/hero.png"]}};
export default function Page(){return <RoliGabyInvitation wedding={roliGaby}/>;}
