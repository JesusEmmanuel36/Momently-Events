import {LuisTereInvitation} from '@/components/events/luis-tere/LuisTereInvitation';
import {luisTere} from '@/config/events/luis-tere';
export const metadata={title:'Luis y Tere | Nuestra boda civil',description:'10 de enero de 2027 · 6:00 p. m. · Ámbar Salón Jardín.',openGraph:{images:[luisTere.hero.image]}};
export default function Page(){return <LuisTereInvitation wedding={luisTere}/>;}
