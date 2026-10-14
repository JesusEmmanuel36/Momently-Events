import {AngelFernandaInvitation} from '@/components/events/angel-fernanda/AngelFernandaInvitation';
import {angelFernanda} from '@/config/events/angel-fernanda';
export const metadata={title:'Angel y Fernanda | Boda y bautizo de Emma Samadhi',description:'28 de noviembre de 2026 · Cuernavaca, Morelos · Celebra con nuestras familias.',openGraph:{images:[angelFernanda.hero.image]}};
export default function Page(){return <AngelFernandaInvitation wedding={angelFernanda}/>;}
