import {PosadaDespachoJuridicoInvitation} from '@/components/events/posada-despacho-juridico/PosadaDespachoJuridicoInvitation';
import {posadaDespachoJuridico} from '@/config/events/posada-despacho-juridico';
export const metadata={title:posadaDespachoJuridico.eventTitle,description:'Invitado de honor a nuestra tradicional posada · 5 de diciembre de 2026 · 6:40 p. m. · Terraza Solangel, Puerto Vallarta, Jalisco.',openGraph:{images:[posadaDespachoJuridico.hero.image]}};
export default function Page(){return <PosadaDespachoJuridicoInvitation wedding={posadaDespachoJuridico}/>;}
