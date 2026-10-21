import {AlissonXvInvitation} from "@/components/events/alisson-xv/AlissonXvInvitation";
import {alissonXv} from "@/config/events/alisson-xv";
export const metadata={title:"Alisson | Mis XV años",description:"La familia Cebreros Fraijo te invita · 13 de noviembre de 2026",openGraph:{images:[alissonXv.hero.image]}};
export default function Page(){return <AlissonXvInvitation wedding={alissonXv}/>;}
