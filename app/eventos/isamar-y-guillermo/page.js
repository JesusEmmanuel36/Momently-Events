import {IsamarGuillermoInvitation} from '@/components/events/isamar-guillermo/IsamarGuillermoInvitation';
import {isamarGuillermo} from '@/config/events/isamar-guillermo';
export const metadata={title:'Isamar y Guillermo | Nuestra boda',description:'14 de noviembre de 2026 · Templo de Santiago Apóstol 18:00 · Terraza Forum 20:00.',openGraph:{images:[isamarGuillermo.hero.image]}};
export default function Page(){return <IsamarGuillermoInvitation wedding={isamarGuillermo}/>;}
