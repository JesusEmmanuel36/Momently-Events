"use client";
import { XochitlRubenTemplate } from "./XochitlRubenTemplate";
const assets={floral:"/images/events/xochitl-y-ruben/floral.png",envelopeClosed:"/images/events/xochitl-y-ruben/envelope-closed.png",envelopeOpen:"/images/events/xochitl-y-ruben/envelope-open.png"};
const theme={"--coral":"#8b6244","--peach":"#c5a57a","--olive":"#6b4a32","--dark":"#2b1c14","--gold":"#b58a45","--gold-soft":"#d8bd8b","--paper":"#fffaf1","--ivory":"#f1e3cd","--charcoal":"#2f241e","--muted":"#786353","--accent-light":"#dfc8a6"};
export function XochitlRubenInvitation({wedding}){return <XochitlRubenTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
