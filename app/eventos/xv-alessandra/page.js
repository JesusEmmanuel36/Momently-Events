import { AlessandraXvInvitation } from "@/components/events/alessandra-xv/AlessandraXvInvitation";
import { alessandraXv } from "@/config/events/alessandra-xv";
export const metadata={title:"Alessandra | Mis XV años",description:"24 de octubre de 2026 · Misa 6:00 p. m. · Jeriba Eventos 7:00 p. m.",openGraph:{images:[alessandraXv.hero.image]}};
export default function Page(){return <AlessandraXvInvitation wedding={alessandraXv}/>;}
