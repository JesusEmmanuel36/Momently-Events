import { DanishaInvitation } from "@/components/events/danisha-xv/DanishaInvitation";
import { danishaXv } from "@/config/events/danisha-xv";
export const metadata = { title: "Danisha Jatziri | Mis XV años", description: danishaXv.hero.quote, openGraph: { title: "Danisha Jatziri | Mis XV años", description: "27 de enero de 2027 · Ecatepec de Morelos", images: ["/images/events/danisha-xv/envelope-closed.png"] } };
export default function DanishaPage() { return <DanishaInvitation event={danishaXv} />; }
