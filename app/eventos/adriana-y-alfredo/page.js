import { AdrianaAlfredoInvitation } from "@/components/events/adriana-alfredo/AdrianaAlfredoInvitation";
import { adrianaAlfredo } from "@/config/events/adriana-alfredo";
export const metadata={title:"Adriana y Alfredo | Nuestra boda civil",description:"5 de diciembre de 2026 · Las Ninfas, Xochimilco · Embarcadero 3:30 p. m. puntual.",openGraph:{images:[adrianaAlfredo.hero.image]}};
export default function Page(){return <AdrianaAlfredoInvitation wedding={adrianaAlfredo}/>;}
