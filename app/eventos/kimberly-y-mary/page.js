import { KimberlyMaryInvitation } from "@/components/events/kimberly-mary/KimberlyMaryInvitation";
import { kimberlyMary } from "@/config/events/kimberly-mary";
export const metadata = { title: "Kimberly y Mary | Graduación y cumpleaños", description: "31 de octubre de 2026 · 3:00 p. m. · San Juan Zitlaltepec", openGraph: { title: "Kimberly y Mary | Graduación y cumpleaños", images: [kimberlyMary.hero.image] } };
export default function Page() { return <KimberlyMaryInvitation wedding={kimberlyMary}/>; }
