import { IsamaraWsbaldoInvitation } from "@/components/events/isamara-wsbaldo/IsamaraWsbaldoInvitation";
import { isamaraWsbaldo } from "@/config/events/isamara-wsbaldo";
export const metadata={title:"Isamara y Wsbaldo | Nuestra boda",description:"5 de diciembre de 2026 · Múzquiz, Coahuila",openGraph:{title:"Isamara y Wsbaldo | Nuestra boda",images:["/images/events/isamara-y-wsbaldo/envelope-closed.png"]}};
export default function Page(){return <IsamaraWsbaldoInvitation wedding={isamaraWsbaldo}/>;}
