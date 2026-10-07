import { AlmaKarinaInvitation } from "@/components/events/alma-karina/AlmaKarinaInvitation";
import { almaKarina } from "@/config/events/alma-karina";
export const metadata={title:"Alma Karina | Mis 50 años",description:"27 de diciembre de 2026 · Huatabampo, Sonora",openGraph:{title:"Alma Karina | Mis 50 años",images:["/images/events/alma-karina-50/envelope-closed.png"]}};
export default function Page(){return <AlmaKarinaInvitation wedding={almaKarina}/>;}
