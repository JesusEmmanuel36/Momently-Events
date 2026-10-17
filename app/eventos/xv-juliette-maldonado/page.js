import {JulietteXvInvitation} from '@/components/events/juliette-xv/JulietteXvInvitation';
import {julietteXv} from '@/config/events/juliette-xv';
export const metadata={title:'Juliette Maldonado Romero | Mis XV años',description:'19 de diciembre de 2026 · Mi mamá y yo te invitamos a celebrar mis XV años en una pool party. Recepción a las 6:00 p. m.',openGraph:{images:[julietteXv.hero.image]}};
export default function Page(){return <JulietteXvInvitation wedding={julietteXv}/>;}
