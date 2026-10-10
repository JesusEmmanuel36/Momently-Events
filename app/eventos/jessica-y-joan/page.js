import { JessicaJoanInvitation } from "@/components/events/jessica-joan/JessicaJoanInvitation";
import { jessicaJoan } from "@/config/events/jessica-joan";

export const metadata = {
  title: "Jessica y Joan | Nuestra boda",
  description: "14 de noviembre de 2026 · San Juan del Río, Querétaro",
  openGraph: { title: "Jessica y Joan | Nuestra boda", images: ["/images/events/jessica-y-joan/image copy 3.png"] },
};

export default function Page() {
  return <JessicaJoanInvitation wedding={jessicaJoan} />;
}
