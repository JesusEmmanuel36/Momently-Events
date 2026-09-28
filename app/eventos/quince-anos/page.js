import { QuinceInvitation } from "@/components/events/QuinceInvitation";

export const metadata = {
  title: "Los XV de Isabella",
  description: "Acompáñame a celebrar una noche llena de sueños, alegría y momentos inolvidables.",
  openGraph: { title: "Los XV de Isabella", description: "12 de junio de 2027", images: ["/images/events/quince-anos/hero.png"] },
};

export default function QuincePage() { return <QuinceInvitation />; }
