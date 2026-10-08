"use client";
import { LolisCesarTemplate } from "./LolisCesarTemplate";
const assets={floral:"/images/events/lolis-y-cesar/floral.png",envelopeClosed:"/images/events/lolis-y-cesar/envelope-closed.png",envelopeOpen:"/images/events/lolis-y-cesar/envelope-open.png"};
const theme={"--coral":"#203756","--peach":"#d8c5aa","--olive":"#203756","--dark":"#14243c","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#eee4d5","--charcoal":"#14243c","--muted":"#6d7480","--accent-light":"#dbe2ec"};
export function LolisCesarInvitation({wedding}){return <LolisCesarTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
