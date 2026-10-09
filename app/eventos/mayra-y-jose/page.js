import { MayraJoseInvitation } from "@/components/events/mayra-jose/MayraJoseInvitation";
import { mayraJose } from "@/config/events/mayra-jose";
export const metadata={title:"Mayra y José | Nuestra boda",description:"13 de marzo de 2027 · Templo Expiatorio y Jardín Magnolia",openGraph:{images:["/images/events/mayra-y-jose/portada.png"]}};
export default function Page(){return <MayraJoseInvitation wedding={mayraJose}/>;}
