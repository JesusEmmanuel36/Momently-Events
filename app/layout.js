import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({ src: "../public/fonts/cormorant-garamond.ttf", variable: "--font-serif", weight: "400 600", display: "swap", fallback: ["Georgia"] });
const manrope = localFont({ src: "../public/fonts/manrope.ttf", variable: "--font-sans", weight: "200 800", display: "swap", fallback: ["Arial"] });
const allura = localFont({ src: "../public/fonts/allura.ttf", variable: "--font-script", weight: "400", display: "swap", fallback: ["cursive"] });

export const metadata = {
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  title: { default: "Momently Events", template: "%s | Momently Events" },
  description: "Crea y administra invitaciones digitales para momentos inolvidables.",
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#3A2A24" };

export default function RootLayout({ children }) {
  return <html lang="es"><body className={`${cormorant.variable} ${manrope.variable} ${allura.variable}`}>{children}</body></html>;
}
