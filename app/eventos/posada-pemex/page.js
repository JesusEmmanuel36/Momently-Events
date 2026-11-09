import {PosadaPemexInvitation} from '@/components/events/posada-pemex/PosadaPemexInvitation';
import {posadaPemex} from '@/config/events/posada-pemex';
export const metadata={title:posadaPemex.eventTitle,description:'17 de diciembre de 2026 · 18:00 h · Salón Madeiras del Hotel Posada Casa Blanca, Ciudad Madero, Tamaulipas.',openGraph:{images:[posadaPemex.hero.image]}};
export default function Page(){return <PosadaPemexInvitation wedding={posadaPemex}/>;}
