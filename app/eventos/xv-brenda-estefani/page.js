import {BrendaXvInvitation} from '@/components/events/brenda-xv/BrendaXvInvitation';
import {brendaXv} from '@/config/events/brenda-xv';
export const metadata={title:'Brenda Stephanie | Mis XV años',description:'26 de diciembre de 2026 · Misa 1:00 p. m. · Salón Paz 2:30 p. m.',openGraph:{images:[brendaXv.hero.image]}};
export default function Page(){return <BrendaXvInvitation wedding={brendaXv}/>;}
