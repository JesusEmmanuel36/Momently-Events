import {KatiaXvInvitation} from '@/components/events/katia-xv/KatiaXvInvitation';
import {katiaXv} from '@/config/events/katia-xv';
export const metadata={title:'Katia Dayanna | Mis XV años',description:'14 de noviembre de 2026 · Misa 7:00 p. m. · Brindis 8:30 p. m. · Puerto Vallarta.',openGraph:{images:[katiaXv.hero.image]}};
export default function Page(){return <KatiaXvInvitation wedding={katiaXv}/>;}
