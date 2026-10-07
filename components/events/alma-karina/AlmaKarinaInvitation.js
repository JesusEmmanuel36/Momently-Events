"use client";
import { AlmaKarinaTemplate } from "./AlmaKarinaTemplate";
const assets={floral:"/images/events/alma-karina-50/floral.png",envelopeClosed:"/images/events/alma-karina-50/envelope-closed.png",envelopeOpen:"/images/events/alma-karina-50/envelope-open.png"};
const theme={"--coral": "#ad8547", "--peach": "#ead8bf", "--olive": "#9e7942", "--dark": "#42352a", "--gold": "#ad8547", "--gold-soft": "#decaab", "--paper": "#fffaf3", "--ivory": "#f3e6d3", "--charcoal": "#42352a", "--muted": "#7c6a56", "--accent-light": "#edd9b9"};
export function AlmaKarinaInvitation({wedding}){return <AlmaKarinaTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
