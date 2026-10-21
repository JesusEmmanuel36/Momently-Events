import {MariaYareliXvInvitation} from "@/components/events/maria-yareli-xv/MariaYareliXvInvitation";
import {mariaYareliXv} from "@/config/events/maria-yareli-xv";
export const metadata={title:"María Yareli | Mis XV años",description:"14 de noviembre de 2026 · Celebra conmigo mis XV años.",openGraph:{images:[mariaYareliXv.hero.image]}};
export default function Page(){return <MariaYareliXvInvitation wedding={mariaYareliXv}/>;}
