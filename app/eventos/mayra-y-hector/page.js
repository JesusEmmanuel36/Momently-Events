import { MayraHectorInvitation } from "@/components/events/mayra-hector/MayraHectorInvitation";
import { mayraHector } from "@/config/events/mayra-hector";
export const metadata={title:"Mayra y Héctor | Nuestra boda",description:"13 de marzo de 2027 · Templo Expiatorio y Jardín Magnolia",openGraph:{images:["/images/events/mayra-y-hector/portada.png"]}};
export default function Page(){return <MayraHectorInvitation wedding={mayraHector}/>;}
