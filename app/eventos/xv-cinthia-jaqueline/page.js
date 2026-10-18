import {CinthiaJaquelineXvInvitation} from '@/components/events/cinthia-jaqueline-xv/CinthiaJaquelineXvInvitation';
import {cinthiaJaquelineXv} from '@/config/events/cinthia-jaqueline-xv';
export const metadata={title:'Cinthia Jaqueline | Mis XV años',description:'7 de noviembre de 2026 · Misa 18:00 · Quinta Mardel 19:00.',openGraph:{images:[cinthiaJaquelineXv.hero.image]}};
export default function Page(){return <CinthiaJaquelineXvInvitation wedding={cinthiaJaquelineXv}/>;}
