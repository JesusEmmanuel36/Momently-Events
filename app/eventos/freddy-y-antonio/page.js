import { FreddyAntonioInvitation } from "@/components/events/freddy-antonio/FreddyAntonioInvitation";
import { freddyAntonio } from "@/config/events/freddy-antonio";
export const metadata={title:"Freddy y Antonio | Nuestra boda",description:"5 de diciembre de 2026 · Recepción 4:00 p. m. · Candelaria, Coyoacán. Una boda con el color de México.",openGraph:{images:[freddyAntonio.hero.image]}};
export default function Page(){return <FreddyAntonioInvitation wedding={freddyAntonio}/>;}
