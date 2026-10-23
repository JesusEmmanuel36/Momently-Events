import {MariaJoseInvitation} from "@/components/events/maria-jose-xv/MariaJoseInvitation";
import {mariaJoseXv} from "@/config/events/maria-jose-xv";
export const metadata={title:"María José | Mis XV años",description:"23 de diciembre de 2026 · 6:00 p. m. · Salón Dorado, Cintalapa, Chiapas",openGraph:{images:[mariaJoseXv.hero.image]}};
export default function Page(){return <MariaJoseInvitation event={mariaJoseXv}/>}
