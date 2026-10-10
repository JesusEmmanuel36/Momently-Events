import { Selfida60Invitation } from "@/components/events/selfida-60/Selfida60Invitation";
import { selfida60 } from "@/config/events/selfida-60";

export const metadata = {
  title: "Selfida Pérez Córdova | Mis 60 años",
  description: "22 de noviembre de 2026 · 3:00 p. m. · Ejido Cuauhtémoc",
  openGraph: { title: "Selfida Pérez Córdova | Mis 60 años", images: ["/images/events/selfidaperez/envelope-closed.png"] },
};

export default function Page() { return <Selfida60Invitation wedding={selfida60} />; }
