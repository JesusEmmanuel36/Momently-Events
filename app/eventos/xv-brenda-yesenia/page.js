import { BrendaYeseniaInvitation } from "@/components/events/brenda-yesenia/BrendaYeseniaInvitation";
import { brendaYesenia } from "@/config/events/brenda-yesenia";
export const metadata={title:"Brenda Yesenia | Mis XV años",description:"6 de noviembre de 2026 · Hermosillo · Misa 7:00 p. m. · Recepción 9:00 p. m.",openGraph:{images:[brendaYesenia.hero.image]}};
export default function Page(){return <BrendaYeseniaInvitation wedding={brendaYesenia}/>;}
