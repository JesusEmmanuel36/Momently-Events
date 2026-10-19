import {EloisaJesus40Invitation} from '@/components/events/eloisa-jesus-40/EloisaJesus40Invitation';
import {eloisaJesus40} from '@/config/events/eloisa-jesus-40';
export const metadata={title:'Eloísa y Jesús | 40 aniversario · Bodas de rubí',description:'20 de noviembre de 2026 · Adia Eventos · 8:00 p. m. a medianoche.',openGraph:{images:[eloisaJesus40.hero.image]}};
export default function Page(){return <EloisaJesus40Invitation wedding={eloisaJesus40}/>;}
