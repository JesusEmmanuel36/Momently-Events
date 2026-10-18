import {NathaliaXvInvitation} from '@/components/events/nathalia-xv/NathaliaXvInvitation';
import {nathaliaXv} from '@/config/events/nathalia-xv';
export const metadata={title:'Nathalia Isabella | Mis XV años',description:'5 de diciembre de 2026 · Salón Los Tres Caballos, Macuspana · 7:00 p. m.',openGraph:{images:[nathaliaXv.hero.image]}};
export default function Page(){return <NathaliaXvInvitation wedding={nathaliaXv}/>;}
