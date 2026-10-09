import { MayraHugoInvitation } from "@/components/events/mayra-hugo/MayraHugoInvitation";
import { mayraHugo } from "@/config/events/mayra-hugo";
export const metadata={title:"Mayra y Hugo | Nuestra boda",description:"13 de marzo de 2027 · Templo Expiatorio y Jardín Magnolia",openGraph:{images:["/images/events/mayra-y-hugo/portada.png"]}};
export default function Page(){return <MayraHugoInvitation wedding={mayraHugo}/>;}
