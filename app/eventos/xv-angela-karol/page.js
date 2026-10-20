import {AngelaKarolXvInvitation} from '@/components/events/angela-karol-xv/AngelaKarolXvInvitation';
import {angelaKarolXv} from '@/config/events/angela-karol-xv';
export const metadata={title:'Ángela Karol | Mis XV años',description:'26 de diciembre de 2026 · Parroquia de la Asunción, Jalostotitlán · Terraza El Mirador.',openGraph:{images:[angelaKarolXv.hero.image]}};
export default function Page(){return <AngelaKarolXvInvitation wedding={angelaKarolXv}/>;}
