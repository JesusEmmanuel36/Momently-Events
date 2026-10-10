import { Rosalba55Invitation } from "@/components/events/rosalba-55/Rosalba55Invitation";
import { rosalba55 } from "@/config/events/rosalba-55";
export const metadata = {
  title: "Rosalba | Mis 55 años",
  description: "21 de noviembre de 2026 · 3:30 p. m. · Palapa Real del Bosque",
  openGraph: { title: "Rosalba | Mis 55 años", images: ["/images/events/rosalba-55/image copy 16.png"] },
};
export default function Page() { return <Rosalba55Invitation wedding={rosalba55} />; }
