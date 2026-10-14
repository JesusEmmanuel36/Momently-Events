import { NarcisoMaritzaInvitation } from "@/components/events/narciso-maritza/NarcisoMaritzaInvitation";
import { narcisoMaritza } from "@/config/events/narciso-maritza";
export const metadata={title:"Narciso y Maritza | Bodas de plata",description:"28 de noviembre de 2026 · Nachitos Salón de Eventos · 2:00 a 7:00 p. m.",openGraph:{images:[narcisoMaritza.hero.image]}};
export default function Page(){return <NarcisoMaritzaInvitation wedding={narcisoMaritza}/>;}
