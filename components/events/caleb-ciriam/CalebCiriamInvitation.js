"use client";
import { CalebCiriamTemplate } from "./CalebCiriamTemplate";
const assets={floral:"/images/events/caleb-y-ciriam/floral.png",envelopeClosed:"/images/events/caleb-y-ciriam/envelope-closed.png",envelopeOpen:"/images/events/caleb-y-ciriam/envelope-open.png"};
const theme={"--coral":"#657044","--peach":"#cbd0b9","--olive":"#657044","--dark":"#303822","--gold":"#aa905d","--gold-soft":"#dac9a5","--paper":"#fbf6eb","--ivory":"#eee4d0","--charcoal":"#303822","--muted":"#6c6c50","--accent-light":"#dfe2ce"};
export function CalebCiriamInvitation({wedding}){return <CalebCiriamTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
