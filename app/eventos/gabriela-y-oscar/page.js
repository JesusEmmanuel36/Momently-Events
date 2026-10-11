import { GabrielaOscarInvitation } from "@/components/events/gabriela-oscar/GabrielaOscarInvitation";
import { gabrielaOscar } from "@/config/events/gabriela-oscar";
export const metadata = {title:"Gabriela & Oscar | Nuestra boda",description:"13 de marzo de 2027 · Cabañas El Tata",openGraph:{images:[gabrielaOscar.hero.image]}};
export default function Page(){return <GabrielaOscarInvitation wedding={gabrielaOscar}/>;}
