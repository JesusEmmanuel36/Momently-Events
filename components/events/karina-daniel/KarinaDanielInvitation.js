"use client";
import { KarinaDanielTemplate } from "./KarinaDanielTemplate";
const assets = { floral: "/images/events/karina-daniel/floral.png", envelopeClosed: "/images/events/karina-daniel/envelope-closed.png", envelopeOpen: "/images/events/karina-daniel/envelope-open.png" };
const theme = { "--coral": "#69704a", "--peach": "#d2d5c4", "--olive": "#68724b", "--dark": "#333c29", "--gold": "#aeb4b9", "--gold-soft": "#dce0e3", "--paper": "#ffffff", "--ivory": "#f0f2eb", "--charcoal": "#343b2e", "--muted": "#747b6b", "--accent-light": "#dfe3d5" };
export function KarinaDanielInvitation({ wedding }) { return <KarinaDanielTemplate wedding={wedding} assets={assets} customTheme={theme} />; }
