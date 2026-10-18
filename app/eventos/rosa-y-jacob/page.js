import {RosaJacobInvitation} from '@/components/events/rosa-jacob/RosaJacobInvitation';
import {rosaJacob} from '@/config/events/rosa-jacob';
export const metadata={title:'Rosa Sarahi y Jacob Israel | Nuestra boda',description:'19 de diciembre de 2026 · Ceremonia 18:00 · Salón de Eventos La Terraza 20:00.',openGraph:{images:[rosaJacob.hero.image]}};
export default function Page(){return <RosaJacobInvitation wedding={rosaJacob}/>;}
