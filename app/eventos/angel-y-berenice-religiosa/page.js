import {AngelBereniceReligiosaInvitation} from "@/components/events/angel-berenice-religiosa/AngelBereniceReligiosaInvitation";
import {angelBereniceReligiosa} from "@/config/events/angel-berenice-religiosa";
export const metadata={title:"Ángel Miguel y Berenice | Boda religiosa",description:"20 de diciembre de 2026 · Ceremonia 11:00 a. m. · Comida 2:00 p. m.",openGraph:{images:[angelBereniceReligiosa.hero.image]}};
export default function Page(){return <AngelBereniceReligiosaInvitation wedding={angelBereniceReligiosa}/>;}
