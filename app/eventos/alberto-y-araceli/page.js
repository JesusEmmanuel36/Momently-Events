import {AlbertoAraceliInvitation} from '@/components/events/alberto-araceli/AlbertoAraceliInvitation';
import {albertoAraceli} from '@/config/events/alberto-araceli';
export const metadata={title:'Alberto y Araceli | Nuestra boda',description:'21 de noviembre de 2026 · Ceremonia 19:00 · Salón de Eventos Monarca 21:00.',openGraph:{images:[albertoAraceli.hero.image]}};
export default function Page(){return <AlbertoAraceliInvitation wedding={albertoAraceli}/>;}
