import {DannaEmmanuelInvitation} from '@/components/events/danna-emmanuel/DannaEmmanuelInvitation';
import {dannaEmmanuel} from '@/config/events/danna-emmanuel';
export const metadata={title:'Danna Grisley y Emmanuel Alfonso | Nuestra boda',description:'7 de noviembre de 2026 · Ceremonia 6:00 p. m. · Salón CTM, Durango · Recepción 9:00 p. m.',openGraph:{images:[dannaEmmanuel.hero.image]}};
export default function Page(){return <DannaEmmanuelInvitation wedding={dannaEmmanuel}/>;}
