import { XochitlRubenInvitation } from "@/components/events/xochitl-ruben/XochitlRubenInvitation";
import { xochitlRuben } from "@/config/events/xochitl-ruben";

export const metadata = {
  title: "Xóchitl y Rubén | Nuestra boda",
  description: "5 de diciembre de 2026 · Apodaca, Nuevo León",
  openGraph: { title: "Xóchitl y Rubén | Nuestra boda", images: ["/images/events/xochitl-y-ruben/portada.png"] },
};

export default function Page() {
  return <XochitlRubenInvitation wedding={xochitlRuben} />;
}
