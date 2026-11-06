import {DianaLuisNuevoInvitation} from '@/components/events/diana-luis-nuevo/DianaLuisNuevoInvitation';
import {dianaLuisNuevo} from '@/config/events/diana-luis-nuevo';
export const viewport={colorScheme:'only light',themeColor:'#641D32'};
export const metadata={title:dianaLuisNuevo.eventTitle,description:'26 de diciembre de 2026 · Acompáñanos a celebrar nuestra boda.',openGraph:{title:dianaLuisNuevo.eventTitle,images:[dianaLuisNuevo.images.hero]}};
export default function Page(){return <DianaLuisNuevoInvitation wedding={dianaLuisNuevo}/>}
