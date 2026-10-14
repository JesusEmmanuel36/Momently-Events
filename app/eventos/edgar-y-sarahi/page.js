import {EdgarSarahiInvitation} from '@/components/events/edgar-sarahi/EdgarSarahiInvitation';
import {edgarSarahi} from '@/config/events/edgar-sarahi';
export const metadata={title:'Edgar Iván y Sarahi | Nuestra boda',description:'2 de enero de 2027 · 4:30 p. m. · En casa de la novia, Ciruelar II, Gpe. Victoria.',openGraph:{images:[edgarSarahi.hero.image]}};
export default function Page(){return <EdgarSarahiInvitation wedding={edgarSarahi}/>;}
