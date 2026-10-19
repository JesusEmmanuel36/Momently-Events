import {JuanViridianaInvitation} from '@/components/events/juan-viridiana/JuanViridianaInvitation';
import {juanViridiana} from '@/config/events/juan-viridiana';
export const metadata={title:'Juan Emilio y Viridiana | Nuestra boda',description:'3 de abril de 2027 · Salón Martell · Llegada 12:30 p. m. · Ceremonia 1:00 p. m.',openGraph:{images:[juanViridiana.hero.image]}};
export default function Page(){return <JuanViridianaInvitation wedding={juanViridiana}/>;}
