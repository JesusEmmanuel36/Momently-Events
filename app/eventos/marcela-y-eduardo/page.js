import { MarcelaEduardoInvitation } from "@/components/events/marcela-eduardo/MarcelaEduardoInvitation";
import { marcelaEduardo } from "@/config/events/marcela-eduardo";
export const metadata={title:"Marcela y Eduardo | Nuestra boda",description:"26 de diciembre de 2026 · Misa 12:00 p. m. · Recepción 2:00 p. m.",openGraph:{images:[marcelaEduardo.hero.image]}};
export default function Page(){return <MarcelaEduardoInvitation wedding={marcelaEduardo}/>;}
