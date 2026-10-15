import { NayeliXvInvitation } from "@/components/events/nayeli-xv/NayeliXvInvitation";
import { nayeliXv } from "@/config/events/nayeli-xv";
export const metadata={title:"Nayeli | Mis XV años",description:"Alexandra Nayeli Vazquez Castro · 1 de mayo de 2027 · Rancho Oxalis, 8:00 p. m.",openGraph:{images:[nayeliXv.hero.image]}};
export default function Page(){return <NayeliXvInvitation wedding={nayeliXv}/>;}
