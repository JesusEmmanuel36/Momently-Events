"use client";
import { AnnaIsabellaTemplate } from "./AnnaIsabellaTemplate";
const assets={floral:"/images/events/anna-isabella/floral.png",envelopeClosed:"/images/events/anna-isabella/envelope-closed.png",envelopeOpen:"/images/events/anna-isabella/envelope-open.png"};
const theme={"--coral":"#b58190","--peach":"#ead0d5","--olive":"#a77485","--dark":"#694b56","--gold":"#b69a70","--gold-soft":"#e5d5bb","--paper":"#fffdf9","--ivory":"#f5e9e5","--charcoal":"#694b56","--muted":"#917780","--accent-light":"#f4dfe4"};
export function AnnaIsabellaInvitation({wedding}){return <AnnaIsabellaTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
