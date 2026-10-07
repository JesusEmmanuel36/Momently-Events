"use client";
import { AlejandraDavidTemplate } from "./AlejandraDavidTemplate";
const assets={floral:"/images/events/alejandra-y-david/floral.png",envelopeClosed:"/images/events/alejandra-y-david/envelope-closed.png",envelopeOpen:"/images/events/alejandra-y-david/envelope-open.png"};
const theme={"--coral":"#aa8951","--peach":"#e6d8bc","--olive":"#aa8951","--dark":"#55412b","--gold":"#b49354","--gold-soft":"#e6d4af","--paper":"#fffdf9","--ivory":"#f8f1e5","--charcoal":"#55412b","--muted":"#89765e","--accent-light":"#efe3c9"};
export function AlejandraDavidInvitation({wedding, pass, passToken}){return <AlejandraDavidTemplate wedding={wedding} pass={pass} passToken={passToken} assets={assets} customTheme={theme}/>;}
