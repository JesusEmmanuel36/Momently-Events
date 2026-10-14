import {LizBirthdayInvitation} from '@/components/events/liz-birthday/LizBirthdayInvitation';
import {lizBirthday} from '@/config/events/liz-birthday';
export const metadata={title:'Liz | Fiesta sorpresa · 28 años',description:'Una sorpresa llena de alegría · Palapa de doña Rosy, Cañales 2',openGraph:{images:[lizBirthday.hero.image]}};
export default function Page(){return <LizBirthdayInvitation wedding={lizBirthday}/>;}
