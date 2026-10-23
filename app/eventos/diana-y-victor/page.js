import {DianaVictorInvitation} from "@/components/events/diana-victor/DianaVictorInvitation";
import {dianaVictor} from "@/config/events/diana-victor";
export const metadata={title:"Diana y Víctor | Nuestra celebración",description:"11 de noviembre de 2026 · 1:00 p. m. · La Perla, carretera a Valladolid",openGraph:{images:[dianaVictor.hero.image]}};
export default function Page(){return <DianaVictorInvitation event={dianaVictor}/>}
