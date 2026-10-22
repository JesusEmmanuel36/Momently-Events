import {OpenHouseInvitation} from "@/components/events/open-house/OpenHouseInvitation";
import {openHouse} from "@/config/events/open-house";
export const metadata={title:"Open House | Un nuevo hogar, una nueva historia",description:"5 de diciembre de 2026 · 4:00 p. m. · Cda. Valle Paraíso, Hda. Santo Tomás, Nicolás Romero",openGraph:{images:[openHouse.hero.image]}};
export default function Page(){return <OpenHouseInvitation event={openHouse}/>;}
