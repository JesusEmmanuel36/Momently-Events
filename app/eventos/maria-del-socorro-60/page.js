import { MariaSocorro60Invitation } from "@/components/events/maria-socorro-60/MariaSocorro60Invitation";
import { mariaSocorro60 } from "@/config/events/maria-socorro-60";
export const metadata={title:"María del Socorro | Mis 60 años",description:"7 de noviembre de 2026 · Plaza Bonita · 8:00 a 11:30 p. m. · San Nicolás de los Garza.",openGraph:{images:[mariaSocorro60.hero.image]}};
export default function Page(){return <MariaSocorro60Invitation wedding={mariaSocorro60}/>;}
