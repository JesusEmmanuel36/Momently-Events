import {MariaFernandaXvInvitation} from '@/components/events/maria-fernanda-xv/MariaFernandaXvInvitation';
import {mariaFernandaXv} from '@/config/events/maria-fernanda-xv';
export const metadata={title:'María Fernanda | Mis XV años',description:'28 de noviembre de 2026 · Misa 6:00 p. m. · Quinta Don Luis 8:00 p. m. · Sinaloa.',openGraph:{images:[mariaFernandaXv.hero.image]}};
export default function Page(){return <MariaFernandaXvInvitation wedding={mariaFernandaXv}/>;}
