import { AlejandraDavidInvitation } from "@/components/events/alejandra-david/AlejandraDavidInvitation";
import { alejandraDavid } from "@/config/events/alejandra-david";
export const metadata = {title:"Alejandra y David | Nuestra boda",description:"27 de diciembre de 2026 · Casa Ambar, Monterrey",openGraph:{title:"Alejandra y David | Nuestra boda",images:["/images/events/alejandra-y-david/envelope-closed.png"]}};
export default function Page(){return <AlejandraDavidInvitation wedding={alejandraDavid}/>;}
