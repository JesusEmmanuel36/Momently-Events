"use client";
import { EmilyFernandaXvTemplate } from "./EmilyFernandaXvTemplate";
const assets={floral:"/images/events/xv-emily-fernanda/floral.png",envelopeClosed:"/images/events/xv-emily-fernanda/envelope-closed.png",envelopeOpen:"/images/events/xv-emily-fernanda/envelope-open.png"};
const theme={"--coral":"#b96f82","--peach":"#e8b7c2","--olive":"#8b7665","--dark":"#563b43","--gold":"#b58b62","--gold-soft":"#dfc4a5","--paper":"#fffaf8","--ivory":"#f8e8ec","--charcoal":"#563b43","--muted":"#856c73","--accent-light":"#f1cfd7"};
export function EmilyFernandaXvInvitation({wedding}){return <EmilyFernandaXvTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
