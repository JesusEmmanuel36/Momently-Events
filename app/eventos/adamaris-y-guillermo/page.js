import { AdamarisGuillermoInvitation } from "@/components/events/adamaris-guillermo/AdamarisGuillermoInvitation";
import { adamarisGuillermo } from "@/config/events/adamaris-guillermo";
export const metadata={title:"Adamaris y Guillermo | Nuestra boda",description:"5 de diciembre de 2026 · Atotonilco el Grande, Hidalgo",openGraph:{title:"Adamaris y Guillermo | Nuestra boda",images:["/images/events/adamaris-y-guillermo/envelope-closed.png"]}};
export default function Page(){return <AdamarisGuillermoInvitation wedding={adamarisGuillermo}/>;}
