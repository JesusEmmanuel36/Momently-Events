"use client";
import { Great_Vibes, Lora } from "next/font/google";
import { LuJuanTemplate } from "./LuJuanTemplate";
const namesFont=Great_Vibes({subsets:["latin"],weight:"400"});
const headingsFont=Lora({subsets:["latin"],weight:["400","500","600"]});
const assets={floral:"/images/events/lu-y-juan/floral.png",envelopeClosed:"/images/events/lu-y-juan/envelope-closed.png",envelopeOpen:"/images/events/lu-y-juan/envelope-open.png"};
const theme={"--coral":"#b9144d","--peach":"#f28b35","--olive":"#b9144d","--dark":"#442e23","--gold":"#b9144d","--gold-soft":"#e7b8a5","--paper":"#fbe8d5","--ivory":"#f8dfc9","--charcoal":"#442e23","--muted":"#805d52","--accent-light":"#f7cfb2"};
export function LuJuanInvitation({wedding}){return <LuJuanTemplate wedding={wedding} assets={assets} customTheme={{...theme,"--font-script":namesFont.style.fontFamily,"--font-serif":headingsFont.style.fontFamily}}/>;}
