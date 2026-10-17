import {Carmen50Invitation} from '@/components/events/carmen-50/Carmen50Invitation';
import {carmen50} from '@/config/events/carmen-50';
export const metadata={title:'Carmen | Mis 50 años',description:'19 de diciembre de 2026 · El Rinconcito · 16:00 hrs · Cuautitlán Izcalli',openGraph:{images:[carmen50.hero.image]}};
export default function Page(){return <Carmen50Invitation wedding={carmen50}/>;}
