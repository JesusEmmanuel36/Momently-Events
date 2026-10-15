import { SaraiRubenInvitation } from "@/components/events/sarai-ruben/SaraiRubenInvitation";
import { saraiRuben } from "@/config/events/sarai-ruben";
export const metadata={title:"Sarai y Rubén | Nuestra boda civil",description:"16 de enero de 2027 · 2:00 p. m. · Cortijo Sevilla, Aguascalientes",openGraph:{title:"Sarai y Rubén | Nuestra boda civil",images:["/images/events/sarai-y-ruben/portada.png"]}};
export default function Page(){return <SaraiRubenInvitation wedding={saraiRuben}/>;}
