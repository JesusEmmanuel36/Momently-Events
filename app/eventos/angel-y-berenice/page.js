import {AngelBereniceInvitation} from '@/components/events/angel-berenice/AngelBereniceInvitation';
import {angelBerenice} from '@/config/events/angel-berenice';
export const metadata={title:'Ángel Miguel y Berenice | Boda civil',description:'28 de noviembre de 2026 · Rancho Vaquería Santo Domingo · Ceremonia 12:00 · Comida 13:00.',openGraph:{images:[angelBerenice.hero.image]}};
export default function Page(){return <AngelBereniceInvitation wedding={angelBerenice}/>;}
