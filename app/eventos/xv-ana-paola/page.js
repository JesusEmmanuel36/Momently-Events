import {AnaPaolaXvInvitation} from '@/components/events/ana-paola-xv/AnaPaolaXvInvitation';
import {anaPaolaXv} from '@/config/events/ana-paola-xv';
export const metadata={title:'Ana Paola | Mis XV años',description:'Parroquia Cristo Rey, Tacubaya · Misa 18:00 hrs · Recepción Salón Cristo Rey.',openGraph:{images:[anaPaolaXv.hero.image]}};
export default function Page(){return <AnaPaolaXvInvitation wedding={anaPaolaXv}/>;}
