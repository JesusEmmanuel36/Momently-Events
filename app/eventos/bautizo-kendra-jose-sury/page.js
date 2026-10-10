import { KendraJoseSuryInvitation } from "@/components/events/kendra-jose-sury/KendraJoseSuryInvitation";
import { kendraJoseSury } from "@/config/events/kendra-jose-sury";
export const metadata = {title:"Kendra, José y Sury | Nuestro bautizo",description:"28 de noviembre de 2026 · Villa de Etla",openGraph:{images:[kendraJoseSury.hero.image]}};
export default function Page(){return <KendraJoseSuryInvitation wedding={kendraJoseSury}/>;}
