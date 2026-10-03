import localFont from "next/font/local";
import { JoseMarcelaInvitation } from "@/components/events/jose-marcela/JoseMarcelaInvitation";
import { joseMarcela } from "@/config/events/jose-marcela";
const namesFont = localFont({src:"../../../public/fonts/jose-marcela/great-vibes.ttf",weight:"400",variable:"--font-jm-script",display:"swap"});
export const metadata = { title: "José Bruno y Marcela | Nuestra boda", description: joseMarcela.hero.quote, openGraph: { title: "José Bruno y Marcela | Nuestra boda", description: "23 de enero de 2027 · Zapopan, Jalisco", images: ["/images/events/jose-marcela/envelope-closed-cream.png"] } };
export default function JoseMarcelaPage() { return <div className={namesFont.variable}><JoseMarcelaInvitation wedding={joseMarcela} /></div>; }
