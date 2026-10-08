"use client";
import { Liliana53Template } from "./Liliana53Template";
const assets={floral:"/images/events/liliana-53/floral.png",envelopeClosed:"/images/events/liliana-53/envelope-closed.png",envelopeOpen:"/images/events/liliana-53/envelope-open.png"};
const theme={"--coral":"#b08c4e","--peach":"#e9d9b8","--olive":"#a18043","--dark":"#57442e","--gold":"#b69a70","--gold-soft":"#e5d5bb","--paper":"#fffdf9","--ivory":"#f2e9d9","--charcoal":"#57442e","--muted":"#8c7961","--accent-light":"#ecddb9"};
export function Liliana53Invitation({wedding}){return <Liliana53Template wedding={wedding} assets={assets} customTheme={theme}/>;}
