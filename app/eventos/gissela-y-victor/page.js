import {GisselaVictorInvitation} from "@/components/events/gissela-victor/GisselaVictorInvitation";
import {gisselaVictor} from "@/config/events/gissela-victor";
export const metadata={title:"Gissela y Víctor | Nuestra boda",description:"28 de noviembre de 2026 · 12:30 p. m. · Grupo Diamante · Una aventura juntos",openGraph:{images:[gisselaVictor.hero.image]}};
export default function Page(){return <GisselaVictorInvitation wedding={gisselaVictor}/>}
