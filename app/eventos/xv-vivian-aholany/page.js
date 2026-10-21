import {notFound} from "next/navigation";
import {VivianAholanyXvInvitation} from '@/components/events/vivian-aholany-xv/VivianAholanyXvInvitation';
import {vivianAholanyXv} from '@/config/events/vivian-aholany-xv';
export const metadata={title:'Vivian Aholany | Mis XV años',description:'20 de noviembre de 2026 · Misa 5:00 p. m. · Salón Verana 6:00 p. m.',openGraph:{images:[vivianAholanyXv.hero.image]}};
export default function Page(){if(vivianAholanyXv.publicEnabled === false) notFound(); return <VivianAholanyXvInvitation wedding={vivianAholanyXv}/>;}
