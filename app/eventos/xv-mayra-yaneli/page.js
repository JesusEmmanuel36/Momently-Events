import { MayraYaneliInvitation } from "@/components/events/mayra-yaneli/MayraYaneliInvitation";
import { mayraYaneli } from "@/config/events/mayra-yaneli";
export const metadata={title:"Mayra Yaneli | Mis XV años",description:"30 de enero de 2027 · San Pedro de la Laguna, Zumpango, Estado de México",openGraph:{title:"Mayra Yaneli | Mis XV años",images:["/images/events/mayra-yaneli-xv/envelope-closed.png"]}};
export default function Page(){return <MayraYaneliInvitation event={mayraYaneli}/>;}
