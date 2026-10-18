import {KarlaNoemiXvInvitation} from '@/components/events/karla-noemi-xv/KarlaNoemiXvInvitation';
import {karlaNoemiXv} from '@/config/events/karla-noemi-xv';
export const metadata={title:'Karla Noemi | Mis XV años',description:'21 de noviembre de 2026 · Salón Jhon Dany · Recepción 19:30.',openGraph:{images:[karlaNoemiXv.hero.image]}};
export default function Page(){return <KarlaNoemiXvInvitation wedding={karlaNoemiXv}/>;}
