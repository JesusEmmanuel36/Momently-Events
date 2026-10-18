import {YoatzinAldoInvitation} from '@/components/events/yoatzin-aldo/YoatzinAldoInvitation';
import {yoatzinAldo} from '@/config/events/yoatzin-aldo';
export const metadata={title:'Yoatzin y Aldo | Nuestra boda',description:'19 de diciembre de 2026 · Misa 13:00, Tlaltizapán · Comida 15:30, Jardín Magnolia, Yautepec.',openGraph:{images:[yoatzinAldo.hero.image]}};
export default function Page(){return <YoatzinAldoInvitation wedding={yoatzinAldo}/>;}
