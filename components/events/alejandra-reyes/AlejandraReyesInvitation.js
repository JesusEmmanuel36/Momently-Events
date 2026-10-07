"use client";
import { AlejandraReyesTemplate } from "./AlejandraReyesTemplate";
const assets={floral:"/images/events/xv-alejandra-reyes/streetwear-blue-white.png",envelopeClosed:"/images/events/xv-alejandra-reyes/envelope-closed-blue-white.png",envelopeOpen:"/images/events/xv-alejandra-reyes/envelope-open-blue-white.png"};
const theme={"--coral": "#85aaff", "--peach": "#85aaff", "--olive": "#2864ed", "--dark": "#070b13", "--gold": "#85aaff", "--gold-soft": "#345490", "--paper": "#152139", "--ivory": "#0d1422", "--charcoal": "#f2f5ff", "--muted": "#c6d2e8", "--accent-light": "#a9c2ff", "--font-serif": "Arial, Helvetica, sans-serif", "--font-script": "Arial, Helvetica, sans-serif"};
export function AlejandraReyesInvitation({wedding}){return <AlejandraReyesTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
