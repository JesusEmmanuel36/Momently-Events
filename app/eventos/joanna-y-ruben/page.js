import { JoannaRubenInvitation } from "@/components/events/joanna-ruben/JoannaRubenInvitation";
import { joannaRuben } from "@/config/events/joanna-ruben";
export const metadata={title:"Joanna y Rubén | Nuestra boda civil",description:"16 de enero de 2027 · Recepción 5:30 p. m. · Ceremonia civil 6:00 p. m. · Salón Las Orquídeas",openGraph:{title:"Joanna y Rubén | Nuestra boda civil",images:["/images/events/joanna-y-ruben/envelope-closed.png"]}};
export default function Page(){return <JoannaRubenInvitation wedding={joannaRuben}/>;}
