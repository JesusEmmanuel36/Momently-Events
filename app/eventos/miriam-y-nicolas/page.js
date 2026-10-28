import {MiriamNicolasInvitation} from '@/components/events/miriam-nicolas/MiriamNicolasInvitation';
import {miriamNicolas} from '@/config/events/miriam-nicolas';
export const metadata={title:miriamNicolas.eventTitle,description:'15 de enero de 2027 · Las Guacamayas, Michoacán · Acompáñanos a celebrar.',openGraph:{title:miriamNicolas.eventTitle,images:[miriamNicolas.images.hero]}};
export default function Page(){return <MiriamNicolasInvitation wedding={miriamNicolas}/>}
