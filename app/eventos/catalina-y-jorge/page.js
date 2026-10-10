import { CatalinaJorgeInvitation } from "@/components/events/catalina-jorge/CatalinaJorgeInvitation";
import { catalinaJorge } from "@/config/events/catalina-jorge";
export const metadata = {
  title: "Catalina y Jorge | Nuestra boda",
  description: "23 de enero de 2027 · 8:00 p. m. · Mazatlán, Sinaloa",
  openGraph: { title: "Catalina y Jorge | Nuestra boda", images: ["/images/events/catalina-y-jorge/image copy 2.png"] },
};
export default function Page() { return <CatalinaJorgeInvitation wedding={catalinaJorge} />; }
