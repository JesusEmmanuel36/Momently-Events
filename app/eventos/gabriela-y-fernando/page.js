import {GabrielaFernandoInvitation} from '@/components/events/gabriela-fernando/GabrielaFernandoInvitation';
import {gabrielaFernando} from '@/config/events/gabriela-fernando';
export const metadata={title:'Gabriela Abigail y Fernando Arturo | Nuestra boda',description:'4 de diciembre de 2026 · Culiacán, Sinaloa.',openGraph:{images:[gabrielaFernando.hero.image]}};
export default function Page(){return <GabrielaFernandoInvitation wedding={gabrielaFernando}/>;}
