import {Maribel40Invitation} from '@/components/events/maribel-40/Maribel40Invitation';
import {maribel40} from '@/config/events/maribel-40';
export const metadata={title:'Maribel Cortes | Mis 40 años',description:'28 de noviembre de 2026 · El Potrero de Cortes · 3:00 p. m.',openGraph:{images:[maribel40.hero.image]}};
export default function Page(){return <Maribel40Invitation wedding={maribel40}/>;}
