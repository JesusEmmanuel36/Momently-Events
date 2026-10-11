import { HeatherXvInvitation } from "@/components/events/heather-xv/HeatherXvInvitation";
import { heatherXv } from "@/config/events/heather-xv";
export const metadata = { title: "Heather Andreani | Mis XV años", description: "5 de diciembre de 2026 · Ceremonia 4:00 p. m. · Recepción 5:00 p. m.", openGraph: { images: [heatherXv.hero.image] } };
export default function Page() { return <HeatherXvInvitation wedding={heatherXv}/>; }
