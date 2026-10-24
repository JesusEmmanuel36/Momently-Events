import {DarielBabyshowerInvitation} from "@/components/events/dariel-babyshower/DarielBabyshowerInvitation";
import {darielBabyshower} from "@/config/events/dariel-babyshower";
export const metadata={title:"Dariel Benjamin | Baby shower",description:"28 de noviembre de 2026 · 3:00 p. m. · Iglesia de San Miguel · Con cariño, Gisel y Edgar",openGraph:{title:"Dariel Benjamin | Baby shower",images:[darielBabyshower.hero.image]}};
export default function Page(){return <DarielBabyshowerInvitation event={darielBabyshower}/>}
