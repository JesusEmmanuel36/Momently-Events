import {LizEduardoInvitation} from '@/components/events/liz-eduardo/LizEduardoInvitation';
import {lizEduardo} from '@/config/events/liz-eduardo';
export const metadata={title:'Liz y Eduardo | Nuestra boda',description:'12 de diciembre de 2026 · Jardín de fiestas Los Rosales · 5:30 p. m.',openGraph:{title:'Liz y Eduardo | Nuestra boda',images:[lizEduardo.images.hero]}};
export default function Page(){return <LizEduardoInvitation wedding={lizEduardo}/>}
