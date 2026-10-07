import { AlejandraReyesInvitation } from "@/components/events/alejandra-reyes/AlejandraReyesInvitation";
import { alejandraReyes } from "@/config/events/alejandra-reyes";
export const metadata={title:"Alejandra | Mis XV · Pool party urbana",description:"28 de noviembre de 2026 · Misa 10:00 a. m. · Finca Imperial 6:00 p. m.",openGraph:{title:"Alejandra | Mis XV",images:["/images/events/xv-alejandra-reyes/envelope-closed.png"]}};
export default function Page(){return <AlejandraReyesInvitation wedding={alejandraReyes}/>;}
