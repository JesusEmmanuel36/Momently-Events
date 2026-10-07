import { LuisIrmaInvitation } from "@/components/events/luis-irma/LuisIrmaInvitation";
import { luisIrma } from "@/config/events/luis-irma";
export const metadata = {title:"Luis Enrique e Irma | Nuestra boda",description:"19 de diciembre de 2026 · Cárdenas, Tabasco",openGraph:{title:"Luis Enrique e Irma | Nuestra boda",images:["/images/events/luis-y-irma/envelope-closed.png"]}};
export default function Page(){return <LuisIrmaInvitation wedding={luisIrma}/>;}
