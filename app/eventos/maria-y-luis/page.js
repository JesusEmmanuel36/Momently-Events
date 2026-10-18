import {MariaLuisInvitation} from '@/components/events/maria-luis/MariaLuisInvitation';
import {mariaLuis} from '@/config/events/maria-luis';
export const metadata={title:'María Luisa y Luis Enrique | Nuestra boda',description:'28 de noviembre de 2026 · Ceremonia 5:30 p. m. · Recepción 7:00 p. m. · Berriozábal, Chiapas.',openGraph:{images:[mariaLuis.hero.image]}};
export default function Page(){return <MariaLuisInvitation wedding={mariaLuis}/>;}
