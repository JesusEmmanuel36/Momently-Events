import {EvaJuanitoInvitation} from '@/components/events/eva-juanito/EvaJuanitoInvitation';
import {evaJuanito} from '@/config/events/eva-juanito';
export const metadata={title:'Eva y Juanito | Nuestra boda',description:'2 de enero de 2027 · En este día tan especial celebraremos el amor rodeados de nuestros seres más queridos.',openGraph:{images:[evaJuanito.hero.image]}};
export default function Page(){return <EvaJuanitoInvitation wedding={evaJuanito}/>;}
