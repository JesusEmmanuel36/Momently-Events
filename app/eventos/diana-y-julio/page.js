import { DianaJulioInvitation } from "@/components/events/diana-julio/DianaJulioInvitation";
import { dianaJulio } from "@/config/events/diana-julio";
export const metadata={title:"Diana y Julio | Nuestra boda",description:"17 de julio de 2027 · Reserva la fecha. Lugar y mesa de regalos próximamente.",openGraph:{images:[dianaJulio.hero.image]}};
export default function Page(){return <DianaJulioInvitation wedding={dianaJulio}/>;}
