import {AurelioYulizaInvitation} from '@/components/events/aurelio-yuliza/AurelioYulizaInvitation';
import {aurelioYuliza} from '@/config/events/aurelio-yuliza';
export const metadata={title:'Aurelio Sebastián y Yuliza | Nuestra boda',description:'28 de noviembre de 2026 · Misa 5:00 p. m. · Llegada al Salón Frizon 6:30 a 7:00 p. m.',openGraph:{images:[aurelioYuliza.hero.image]}};
export default function Page(){return <AurelioYulizaInvitation wedding={aurelioYuliza}/>;}
