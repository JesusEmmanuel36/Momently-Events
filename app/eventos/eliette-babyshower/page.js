import { ElietteBabyshowerInvitation } from "@/components/events/eliette-babyshower/ElietteBabyshowerInvitation";
import { elietteBabyshower } from "@/config/events/eliette-babyshower";
export const metadata={title:"Eliette Amalia | Baby shower",description:"28 de noviembre de 2026 · 4:00 p. m. · San Hipólito Xochiltenango",openGraph:{images:[elietteBabyshower.hero.image]}};
export default function Page(){return <ElietteBabyshowerInvitation wedding={elietteBabyshower}/>;}
