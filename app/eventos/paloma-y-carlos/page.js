import {PalomaCarlosInvitation} from '@/components/events/paloma-carlos/PalomaCarlosInvitation';
import {palomaCarlos} from '@/config/events/paloma-carlos';
export const metadata={title:palomaCarlos.eventTitle,description:'18 de diciembre de 2026 · Misa 5:00 p. m. · Recepción y boda civil 7:00 p. m. · San Andrés Tuxtla, Veracruz.',openGraph:{images:[palomaCarlos.hero.image]}};
export default function Page(){return <PalomaCarlosInvitation wedding={palomaCarlos}/>;}
