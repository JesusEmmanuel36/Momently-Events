"use client";
import { SaraiRubenTemplate } from "./SaraiRubenTemplate";
const assets={floral:"/images/events/sarai-y-ruben/floral.png",envelopeClosed:"/images/events/sarai-y-ruben/envelope-closed.png",envelopeOpen:"/images/events/sarai-y-ruben/envelope-open.png"};
const theme={"--coral":"#aa8750","--peach":"#d8c5a5","--olive":"#aa8750","--dark":"#4b3e2e","--gold":"#b59a6a","--gold-soft":"#e4d3b4","--paper":"#fffaf6","--ivory":"#f3eadc","--charcoal":"#4b3e2e","--muted":"#827565","--accent-light":"#eee0ca"};
export function SaraiRubenInvitation({wedding}){return <SaraiRubenTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
