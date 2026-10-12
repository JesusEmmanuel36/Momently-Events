import { LizbethXvInvitation } from "@/components/events/lizbeth-xv/LizbethXvInvitation";
import { lizbethXv } from "@/config/events/lizbeth-xv";
export const metadata={title:"Lizbeth Astrid | Mis XV años",description:"13 de marzo de 2027 · Una noche en el País de las Maravillas",openGraph:{images:[lizbethXv.hero.image]}};
export default function Page(){return <LizbethXvInvitation wedding={lizbethXv}/>;}
