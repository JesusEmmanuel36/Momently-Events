import {EmiFestInvitation} from "@/components/events/emi-fest/EmiFestInvitation";
import {emiFest} from "@/config/events/emi-fest";
export const metadata={title:"Emi Fest | Te invito a mi party",description:"Domingo 8 de noviembre de 2026 · 6:00 p. m. · Salón Jardín Regina, Capulhuac de Mirafuentes",openGraph:{images:[emiFest.hero.image]}};
export default function Page(){return <EmiFestInvitation event={emiFest}/>;}
