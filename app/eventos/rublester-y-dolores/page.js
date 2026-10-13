import { RublesterDoloresInvitation } from "@/components/events/rublester-dolores/RublesterDoloresInvitation";
import { rublesterDolores } from "@/config/events/rublester-dolores";
export const metadata={title:"Rublester y Lolita | Bodas de plata",description:"5 de diciembre de 2026 · Ciudad de México",openGraph:{images:[rublesterDolores.hero.image]}};
export default function Page(){return <RublesterDoloresInvitation wedding={rublesterDolores}/>;}
