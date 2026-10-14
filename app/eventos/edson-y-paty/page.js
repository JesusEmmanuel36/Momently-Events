import { EdsonPatyInvitation } from "@/components/events/edson-paty/EdsonPatyInvitation";
import { edsonPaty } from "@/config/events/edson-paty";
export const metadata={title:"Edson y Paty | Nuestra boda",description:"13 de diciembre de 2026 · Cuernavaca, Morelos",openGraph:{images:[edsonPaty.hero.image]}};
export default function Page(){return <EdsonPatyInvitation wedding={edsonPaty}/>;}
