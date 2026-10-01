import { MarianaInvitation } from "@/components/events/mariana-xv/MarianaInvitation";
import { marianaXv } from "@/config/events/mariana-xv";
export const metadata = { title: "Mariana Joseline | Mis XV años", description: marianaXv.hero.quote, openGraph: { title: "Mariana Joseline | Mis XV años", description: "21 de noviembre · Irapuato, Guanajuato", images: ["/images/events/marianajoseline-xv/envelope-closed.png"] } };
export default function MarianaPage() { return <MarianaInvitation event={marianaXv} />; }
