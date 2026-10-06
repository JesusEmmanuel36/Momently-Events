import { ZukyAdaliInvitation } from "@/components/events/zuky-adali/ZukyAdaliInvitation";
import { zukyAdali } from "@/config/events/zuky-adali";
export const metadata = {title:"Zuky Adali | Mis XV años",description:"21 de noviembre de 2026 · Chimalhuacán, Estado de México",openGraph:{title:"Zuky Adali | Mis XV años",images:["/images/events/zuky-adali-xv/envelope-closed.png"]}};
export default function Page(){return <ZukyAdaliInvitation event={zukyAdali}/>;}
