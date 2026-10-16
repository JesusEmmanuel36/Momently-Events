import {JoelZurisadaiInvitation} from '@/components/events/joel-zurisadai/JoelZurisadaiInvitation';
import {joelZurisadai} from '@/config/events/joel-zurisadai';
export const metadata={title:'Joel y Zurisadai | Nuestra boda',description:'20 de diciembre de 2026 · Ceremonia 10:00 a. m. · Recepción 1:00 p. m.',openGraph:{images:[joelZurisadai.hero.image]}};
export default function Page(){return <JoelZurisadaiInvitation wedding={joelZurisadai}/>;}
