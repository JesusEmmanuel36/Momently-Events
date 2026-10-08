import { AnnaIsabellaInvitation } from "@/components/events/anna-isabella/AnnaIsabellaInvitation";
import { annaIsabella } from "@/config/events/anna-isabella";
export const metadata={title:"Anna Isabella | Mi celebración",description:"24 de octubre de 2026 · Misa 7:00 a. m. · Fiesta 2:00 p. m.",openGraph:{title:"Anna Isabella | Mi celebración",images:["/images/events/anna-isabella/envelope-closed.png"]}};
export default function Page(){return <AnnaIsabellaInvitation wedding={annaIsabella}/>;}
