import { AlmaDelia40Invitation } from "@/components/events/alma-delia-40/AlmaDelia40Invitation";
import { almaDelia40 } from "@/config/events/alma-delia-40";
export const metadata={title:"Alma Delia | Mis 40 años",description:"14 de noviembre de 2026 · Rancho El Rincón · Celebración vaquera",openGraph:{title:"Alma Delia | Mis 40 años",images:["/images/events/alma-delia-40/envelope-closed.png"]}};
export default function Page(){return <AlmaDelia40Invitation wedding={almaDelia40}/>;}
