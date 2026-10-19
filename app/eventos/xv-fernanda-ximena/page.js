import {FernandaXimenaXvInvitation} from '@/components/events/fernanda-ximena-xv/FernandaXimenaXvInvitation';
import {fernandaXimenaXv} from '@/config/events/fernanda-ximena-xv';
export const metadata={title:'Fernanda Ximena | Mis XV años',description:'21 de noviembre de 2026 · Misa 2:00 p. m. · Quinta San Francisco 6:00 p. m.',openGraph:{images:[fernandaXimenaXv.hero.image]}};
export default function Page(){return <FernandaXimenaXvInvitation wedding={fernandaXimenaXv}/>;}
