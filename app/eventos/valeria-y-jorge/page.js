import { ValeriaJorgeInvitation } from "@/components/events/valeria-jorge/ValeriaJorgeInvitation";
import { valeriaJorge } from "@/config/events/valeria-jorge";
export const metadata = { title: "Valeria y Jorge | Boda y revelación de género", description: "31 de octubre de 2026 · Salón de Eventos Mayo 23", openGraph: { title: "Valeria y Jorge | Boda y revelación de género", images: [valeriaJorge.hero.image] } };
export default function Page() { return <ValeriaJorgeInvitation wedding={valeriaJorge}/>; }
