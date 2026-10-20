import {RoxanaGerardoInvitation} from '@/components/events/roxana-gerardo/RoxanaGerardoInvitation';
import {roxanaGerardo} from '@/config/events/roxana-gerardo';
export const metadata={title:'Roxana y Gerardo | Nuestra boda',description:'5 de diciembre de 2026 · Parroquia de Nuestra Señora de Lourdes · Quinta San Juana.',openGraph:{images:[roxanaGerardo.hero.image]}};
export default function Page(){return <RoxanaGerardoInvitation wedding={roxanaGerardo}/>;}
