"use client";
import { Selfida60Template } from "./Selfida60Template";
const assets={floral:"/images/events/selfidaperez/floral.png",envelopeClosed:"/images/events/selfidaperez/envelope-closed.png",envelopeOpen:"/images/events/selfidaperez/envelope-open.png"};
const theme={"--coral":"#9f1824","--peach":"#c94047","--olive":"#8f6a28","--dark":"#4d1118","--gold":"#bd923e","--gold-soft":"#e0c174","--paper":"#fffaf0","--ivory":"#f5e7d0","--charcoal":"#4d1118","--muted":"#80645f","--accent-light":"#e8c6bd"};
export function Selfida60Invitation({wedding}){return <Selfida60Template wedding={wedding} assets={assets} customTheme={theme}/>;}
