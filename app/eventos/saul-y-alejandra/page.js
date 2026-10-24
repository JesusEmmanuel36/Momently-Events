import {SaulAlejandraInvitation} from "@/components/events/saul-alejandra/SaulAlejandraInvitation";
import {saulAlejandra} from "@/config/events/saul-alejandra";
export const metadata={title:"Saúl y Alejandra | Nuestra boda",description:"7 de noviembre de 2026 · Acompáñanos a celebrar nuestra boda.",openGraph:{title:"Saúl y Alejandra | Nuestra boda",images:[saulAlejandra.hero.image]}};
export default function Page(){return <SaulAlejandraInvitation event={saulAlejandra}/>}
