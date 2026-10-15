import { TereMorenoInvitation } from "@/components/events/tere-moreno/TereMorenoInvitation";
import { tereMoreno } from "@/config/events/tere-moreno";
export const metadata={title:"Tere Moreno | Cumpleaños y jubilación",description:"5 de diciembre de 2026 · Jardín Familia Arcos, Santa María Huehuetoca, Estado de México.",openGraph:{images:[tereMoreno.hero.image]}};
export default function Page(){return <TereMorenoInvitation wedding={tereMoreno}/>;}
