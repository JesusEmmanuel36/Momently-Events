import { GalileaInvitation } from "@/components/events/galilea-xv/GalileaInvitation";
import { galileaXv } from "@/config/events/galilea-xv";
export const metadata = { title: "Galilea Pérez Díaz | Mis XV años", description: "Domingo 28 de marzo de 2027 · Chiapas", openGraph: { title: "Galilea Pérez Díaz | Mis XV años", description: galileaXv.hero.quote, images: ["/images/events/xv-galilea-perez/envelope-closed.png"] } };
export default function Page() { return <GalileaInvitation event={galileaXv} />; }
