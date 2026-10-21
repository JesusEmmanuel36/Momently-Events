import {GraduacionMedicinaInvitation} from '@/components/events/graduacion-medicina/GraduacionMedicinaInvitation';
import {graduacionMedicina} from '@/config/events/graduacion-medicina';
export const metadata={title:'Medicina GEN XVIII | Fiesta de gala',description:'11 de diciembre de 2026 · 6:00 p. m. · Salón Las Flores, Comitán de Domínguez, Chiapas · Etiqueta.',openGraph:{images:[graduacionMedicina.hero.image]}};
export default function Page(){return <GraduacionMedicinaInvitation event={graduacionMedicina}/>;}
