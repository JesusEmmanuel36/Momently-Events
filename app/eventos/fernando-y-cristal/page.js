import { FernandoCristalInvitation } from "@/components/events/fernando-cristal/FernandoCristalInvitation";
import { fernandoCristal } from "@/config/events/fernando-cristal";
export const metadata={title:"Fernando y Cristal | Nuestra boda",description:"23 de diciembre de 2026 · Misa 12:00 p. m. · Recepción 3:00 p. m.",openGraph:{title:"Fernando y Cristal | Nuestra boda",images:["/images/events/fernando-y-cristal/envelope-closed.png"]}};
export default function Page(){return <FernandoCristalInvitation wedding={fernandoCristal}/>;}
