"use client";
import { LuisIrmaTemplate } from "./LuisIrmaTemplate";
const assets={floral:"/images/events/luis-y-irma/floral.png",envelopeClosed:"/images/events/luis-y-irma/envelope-closed.png",envelopeOpen:"/images/events/luis-y-irma/envelope-open.png"};
const theme={"--coral":"#aa8951","--peach":"#e6d8bc","--olive":"#aa8951","--dark":"#55412b","--gold":"#b49354","--gold-soft":"#e6d4af","--paper":"#fffdf9","--ivory":"#f8f1e5","--charcoal":"#55412b","--muted":"#89765e","--accent-light":"#efe3c9"};
export function LuisIrmaInvitation({wedding}){return <LuisIrmaTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
