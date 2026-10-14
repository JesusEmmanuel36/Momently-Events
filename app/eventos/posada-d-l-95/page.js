import {PosadaDl95Invitation} from '@/components/events/posada-dl95/PosadaDl95Invitation';
import {posadaDl95} from '@/config/events/posada-dl95';
export const metadata={title:'Posada navideña | Delegación D-l-95',description:'10 de diciembre de 2026 · 2:30 p. m. · Finca El Galope, Cocotitlán, Estado de México.',openGraph:{images:[posadaDl95.hero.image]}};
export default function Page(){return <PosadaDl95Invitation wedding={posadaDl95}/>;}
