import { notFound } from "next/navigation";
import { CarolinaPavelInvitation } from "@/components/events/carolina-pavel/CarolinaPavelInvitation";
import { carolinaPavel } from "@/config/events/carolina-pavel";
export const metadata={title:"Carolina y Pavel | Nuestra boda",description:"27 de febrero de 2027 · Boda western formal · La Carreta Eventos",openGraph:{title:"Carolina y Pavel | Nuestra boda",images:["/images/events/carolina-y-pavel/envelope-closed.png"]}};
export default function Page(){if(carolinaPavel.publicEnabled === false) notFound(); return <CarolinaPavelInvitation wedding={carolinaPavel}/>;}
