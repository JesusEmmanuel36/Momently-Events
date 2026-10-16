import { JoseMariaInvitation } from "@/components/events/jose-maria/JoseMariaInvitation";
import { joseMaria } from "@/config/events/jose-maria";
export const metadata={title:"José Antonio y María del Carmen | Nuestra boda civil",description:"26 de diciembre de 2026 · Prisma salón de eventos · Civil 7:00 p. m. · Recepción 8:00 p. m.",openGraph:{images:[joseMaria.hero.image]}};
export default function Page(){return <JoseMariaInvitation wedding={joseMaria}/>;}
