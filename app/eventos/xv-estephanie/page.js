import { EstephanieXvInvitation } from "@/components/events/estephanie-xv/EstephanieXvInvitation";
import { estephanieXv } from "@/config/events/estephanie-xv";
export const metadata={title:"Estephanie García | Mis XV años",description:"19 de diciembre de 2026 · 6:00 p. m. · Salón El Corcel, Tonalá, Chiapas",openGraph:{title:"Estephanie García | Mis XV años",images:["/images/events/xv-estephanie/hero.png"]}};
export default function Page(){return <EstephanieXvInvitation wedding={estephanieXv}/>;}
