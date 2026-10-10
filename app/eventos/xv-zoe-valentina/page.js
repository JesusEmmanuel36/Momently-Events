import { ZoeValentinaInvitation } from "@/components/events/zoe-valentina/ZoeValentinaInvitation";
import { zoeValentinaXv } from "@/config/events/zoe-valentina";

export const metadata = {
  title: "Zoé Valentina | Mis XV años",
  description: "21 de noviembre de 2026 · La Haciendita, León, Guanajuato",
  openGraph: { title: "Zoé Valentina | Mis XV años", images: ["/images/events/xv-zoe-valentina/envelope-closed.png"] },
};

export default function Page() { return <ZoeValentinaInvitation wedding={zoeValentinaXv} />; }
