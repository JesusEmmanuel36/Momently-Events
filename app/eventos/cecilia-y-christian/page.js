import {CeciliaChristianInvitation} from '@/components/events/cecilia-christian/CeciliaChristianInvitation';
import {ceciliaChristian} from '@/config/events/cecilia-christian';
export const metadata={title:'Cecilia Arelly y Christian Marin | Nuestra boda',description:'30 de enero de 2027 · Ceremonia 1:10 p. m. · Recepción 3:00 p. m.',openGraph:{images:[ceciliaChristian.hero.image]}};
export default function Page(){return <CeciliaChristianInvitation wedding={ceciliaChristian}/>;}
