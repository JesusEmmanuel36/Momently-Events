import { NahomiXvInvitation } from "@/components/events/nahomi-xv/NahomiXvInvitation";
import { nahomiXv } from "@/config/events/nahomi-xv";
export const metadata={title:"Nahomi | Mis XV años",description:"28 de noviembre de 2026 · Ciudad de México",openGraph:{images:[nahomiXv.hero.image]}};
export default function Page(){return <NahomiXvInvitation wedding={nahomiXv}/>;}
