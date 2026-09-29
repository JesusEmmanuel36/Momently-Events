import { AndreaAnahisInvitation } from "@/components/events/andrea-anahis/AndreaAnahisInvitation";
import { andreaAnahis } from "@/config/events/andrea-anahis";

export const metadata = {
  title: "Andrea Anahis | Mis XV años",
  description: andreaAnahis.hero.quote,
  openGraph: {
    title: "Andrea Anahis | Mis XV años",
    description: "14 de noviembre de 2026 · Culiacán, Sinaloa",
    images: [andreaAnahis.hero.image],
  },
};

export default function AndreaAnahisPage() { return <AndreaAnahisInvitation event={andreaAnahis} />; }
