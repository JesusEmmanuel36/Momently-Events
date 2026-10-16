import { JoseMiriamInvitation } from "@/components/events/jose-miriam/JoseMiriamInvitation";
import { joseMiriam } from "@/config/events/jose-miriam";
export const metadata={title:"José y Miriam | Primera llamada · 10° aniversario",description:"Reserva el 5 de diciembre de 2026 · 6:00 p. m. · Quinta Romeo y Julieta. Muy pronto recibirás la invitación formal.",openGraph:{images:[joseMiriam.hero.image]}};
export default function Page(){return <JoseMiriamInvitation wedding={joseMiriam}/>;}
