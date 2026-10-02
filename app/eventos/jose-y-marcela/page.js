import { JoseMarcelaInvitation } from "@/components/events/jose-marcela/JoseMarcelaInvitation";
import { joseMarcela } from "@/config/events/jose-marcela";
export const metadata = { title: "José Bruno y Marcela | Nuestra boda", description: joseMarcela.hero.quote, openGraph: { title: "José Bruno y Marcela | Nuestra boda", description: "23 de enero de 2027 · Zapopan, Jalisco", images: ["/images/events/jose-marcela/envelope-closed.png"] } };
export default function JoseMarcelaPage() { return <JoseMarcelaInvitation wedding={joseMarcela} />; }
