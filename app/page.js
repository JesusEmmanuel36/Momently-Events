import { WeddingInvitation } from "@/components/WeddingInvitation";
import { wedding } from "@/config/wedding";

export const metadata = { title: "Valeria & Mateo | Nuestra boda", description: "Acompáñanos a celebrar el comienzo de nuestra nueva historia." };

export default function Home() { return <WeddingInvitation wedding={wedding} />; }
