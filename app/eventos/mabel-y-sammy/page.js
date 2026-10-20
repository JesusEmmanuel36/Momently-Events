import {MabelSammyInvitation} from '@/components/events/mabel-sammy/MabelSammyInvitation';
import {mabelSammy} from '@/config/events/mabel-sammy';
export const metadata={title:'Mabel y Sammy | Nuestra boda',description:'27 de noviembre de 2026 · Ceremonia 1:00 p. m. · Recepción 2:00 p. m. · Estilo vaquero.',openGraph:{images:[mabelSammy.hero.image]}};
export default function Page(){return <MabelSammyInvitation wedding={mabelSammy}/>;}
