import {SalvadorAngelicaInvitation} from "@/components/events/salvador-angelica/SalvadorAngelicaInvitation";
import {salvadorAngelica} from "@/config/events/salvador-angelica";
export const metadata={title:"Salvador y Angélica | Nuestra boda",description:"14 de noviembre de 2026 · Puerto Vallarta · Parroquia de Nuestra Señora del Refugio y Quinta Los Olivos",openGraph:{images:[salvadorAngelica.hero.image]}};
export default function Page(){return <SalvadorAngelicaInvitation event={salvadorAngelica}/>}
