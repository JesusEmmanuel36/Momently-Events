import {FernandaXvInvitation} from '@/components/events/fernanda-xv/FernandaXvInvitation';
import {fernandaXv} from '@/config/events/fernanda-xv';
export const metadata={title:'Fernanda | Mis XV años',description:'12 de diciembre de 2026 · Aida Palace Recepciones · Misa 19:00, fiesta 20:00.',openGraph:{images:[fernandaXv.hero.image]}};
export default function Page(){return <FernandaXvInvitation wedding={fernandaXv}/>;}
