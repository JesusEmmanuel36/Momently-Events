import { DianaJoseInvitation } from "@/components/events/diana-jose/DianaJoseInvitation";
import { dianaJose } from "@/config/events/diana-jose";
export const metadata={title:"Diana y José | Nuestra boda",description:"28 de noviembre de 2026 · Salón Jardín Los Cuates, Ixtapaluca",openGraph:{title:"Diana y José | Nuestra boda",images:["/images/events/diana-y-jose/envelope-closed.png"]}};
export default function Page(){return <DianaJoseInvitation wedding={dianaJose}/>;}
