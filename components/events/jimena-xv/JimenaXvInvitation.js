"use client";
import { JimenaXvTemplate } from "./JimenaXvTemplate";
const assets={floral:"/images/events/xv-jimena-jimenez/floral.png",envelopeClosed:"/images/events/xv-jimena-jimenez/envelope-closed.png",envelopeOpen:"/images/events/xv-jimena-jimenez/envelope-open.png"};
const theme={"--coral":"#b08c4e","--peach":"#e9d9b8","--olive":"#a18043","--dark":"#57442e","--gold":"#b69a70","--gold-soft":"#e5d5bb","--paper":"#fffdf9","--ivory":"#f2e9d9","--charcoal":"#57442e","--muted":"#8c7961","--accent-light":"#ecddb9"};
export function JimenaXvInvitation({wedding}){return <JimenaXvTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
