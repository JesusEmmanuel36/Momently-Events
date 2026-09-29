import { Roxana50Invitation } from "@/components/events/roxana-50/Roxana50Invitation";
import { roxana50 } from "@/config/events/roxana-50";

export const metadata = {
  title: "Roxana | Mis 50 años",
  description: roxana50.hero.quote,
  openGraph: {
    title: "Roxana | Mis 50 años",
    description: "14 de noviembre de 2026 · Monterrey, Nuevo León",
    images: [roxana50.hero.image],
  },
};

export default function Roxana50Page() {
  return <Roxana50Invitation event={roxana50} />;
}
