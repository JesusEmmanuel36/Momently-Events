import { NovalyXvInvitation } from "@/components/events/novaly-xv/NovalyXvInvitation";
import { novalyXv } from "@/config/events/novaly-xv";
export const metadata={title:"Novaly Kristell | Mis XV años",description:"7 de noviembre de 2026 · Negro y dorado · Una noche para brillar",openGraph:{images:[novalyXv.hero.image]}};
export default function Page(){return <NovalyXvInvitation wedding={novalyXv}/>;}
