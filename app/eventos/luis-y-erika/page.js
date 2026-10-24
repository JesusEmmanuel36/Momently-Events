import {LuisErikaInvitation} from "@/components/events/luis-erika/LuisErikaInvitation";
import {luisErika} from "@/config/events/luis-erika";
export const metadata={title:"Luis Antonio y Erika | Nuestra boda",description:"27 de junio de 2027 · Villa de Zaachila, Oaxaca · Una celebración de amor y tradición",openGraph:{title:"Luis Antonio y Erika | Nuestra boda",images:[luisErika.hero.image]}};
export default function Page(){return <LuisErikaInvitation event={luisErika}/>}
