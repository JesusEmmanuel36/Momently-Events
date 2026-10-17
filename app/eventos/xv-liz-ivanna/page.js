import {LizIvannaXvInvitation} from '@/components/events/liz-ivanna-xv/LizIvannaXvInvitation';
import {lizIvannaXv} from '@/config/events/liz-ivanna-xv';
export const metadata={title:'Liz Ivanna | Mis XV años',description:'13 de febrero de 2027 · Misa 13:00 hrs · Salón Finca Los Pinos 14:00 hrs.',openGraph:{images:[lizIvannaXv.hero.image]}};
export default function Page(){return <LizIvannaXvInvitation wedding={lizIvannaXv}/>;}
