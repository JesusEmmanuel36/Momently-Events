import {JavierMarycruzInvitation} from '@/components/events/javier-marycruz/JavierMarycruzInvitation';
import {javierMarycruz} from '@/config/events/javier-marycruz';
export const metadata={title:'Javier y Marycruz | Nuestra boda',description:'20 de diciembre de 2026 · La Blanca, Oaxaca · Ceremonia 12:00 p. m. · Baile y brindis 2:00 p. m.',openGraph:{images:[javierMarycruz.hero.image]}};
export default function Page(){return <JavierMarycruzInvitation wedding={javierMarycruz}/>;}
