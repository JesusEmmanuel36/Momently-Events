import { Cormorant_Garamond, Manrope, Allura } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const allura = Allura({ subsets: ["latin"], variable: "--font-script", weight: "400" });

export const metadata = {
  title: { default: "Momently Events", template: "%s | Momently Events" },
  description: "Crea y administra invitaciones digitales para momentos inolvidables.",
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#3A2A24" };

export default function RootLayout({ children }) {
  return <html lang="es"><body className={`${cormorant.variable} ${manrope.variable} ${allura.variable}`}>{children}</body></html>;
}
