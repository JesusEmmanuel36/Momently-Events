import {CarlosSandraInvitation} from '@/components/events/carlos-sandra/CarlosSandraInvitation';
import {carlosSandra} from '@/config/events/carlos-sandra';
export const metadata={title:'Carlos y Sandra | Nuestra boda',description:'26 de diciembre de 2026 · CSN Centro de Convenciones · Ceremonia religiosa 6:00 p. m. · Recepción 7:30 p. m.',openGraph:{images:[carlosSandra.hero.image]}};
export default function Page(){return <CarlosSandraInvitation wedding={carlosSandra}/>;}
