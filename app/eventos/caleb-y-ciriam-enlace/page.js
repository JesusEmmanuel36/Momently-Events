import {CalebCiriamEnlaceInvitation} from '@/components/events/caleb-ciriam-enlace/CalebCiriamEnlaceInvitation';
import {calebCiriamEnlace} from '@/config/events/caleb-ciriam-enlace';
export const metadata={title:'Caleb y Ciriam | Ceremonia de enlace matrimonial',description:'Domingo 15 de noviembre de 2026 · 6:00 p. m. · Casa de Paz, Zapopan, Jalisco.',openGraph:{images:['/images/events/caleb-y-ciriam/envelope-closed.png']}};
export default function Page(){return <CalebCiriamEnlaceInvitation wedding={calebCiriamEnlace}/>;}
