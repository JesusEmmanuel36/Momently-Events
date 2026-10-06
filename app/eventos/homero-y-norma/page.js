import { HomeroNormaInvitation } from "@/components/events/homero-norma/HomeroNormaInvitation";
import { homeroNorma } from "@/config/events/homero-norma";
export const metadata={title:"Homero y Norma | Bodas de rubí",description:"40 años de amor · 31 de octubre de 2026",openGraph:{title:"Homero y Norma | Bodas de rubí",images:["/images/events/homero-y-norma/envelope-closed.png"]}};
export default function Page(){return <HomeroNormaInvitation wedding={homeroNorma}/>;}
