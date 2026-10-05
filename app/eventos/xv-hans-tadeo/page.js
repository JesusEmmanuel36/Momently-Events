import { HansTadeoInvitation } from "@/components/events/hans-tadeo/HansTadeoInvitation";
import { hansTadeo } from "@/config/events/hans-tadeo";
export const metadata={title:"Hans Tadeo Pozas Rubio | Mis XV años",description:"Viernes 23 de octubre de 2026 · 3:00 p. m. · Rincón Purépecha",openGraph:{title:"Hans Tadeo | Mis XV años",images:["/images/events/xv-hans-tadeo/envelope-closed.png"]}};
export default function Page(){return <HansTadeoInvitation event={hansTadeo}/>;}
