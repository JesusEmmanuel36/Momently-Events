import { AndreyLeiraInvitation } from "@/components/events/andrey-leira/AndreyLeiraInvitation";
import { andreyLeira } from "@/config/events/andrey-leira";
export const metadata = { title: "Andrey & Leira | Nuestra boda", description: "19 de diciembre de 2026 · Querétaro · Elegancia mexicana", openGraph: { images: [andreyLeira.hero.image] } };
export default function Page() { return <AndreyLeiraInvitation wedding={andreyLeira}/>; }
