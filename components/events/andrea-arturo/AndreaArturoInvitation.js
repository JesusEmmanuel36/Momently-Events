"use client";
import { AndreaArturoTemplate } from "./AndreaArturoTemplate";
const assets={floral:"/images/events/andrea-y-arturo/floral.png",envelopeClosed:"/images/events/andrea-y-arturo/envelope-closed.png",envelopeOpen:"/images/events/andrea-y-arturo/envelope-open.png"};
const theme={"--coral":"#657044","--peach":"#cbd0b9","--olive":"#657044","--dark":"#303822","--gold":"#aa905d","--gold-soft":"#dac9a5","--paper":"#fbf6eb","--ivory":"#eee4d0","--charcoal":"#303822","--muted":"#6c6c50","--accent-light":"#dfe2ce"};
export function AndreaArturoInvitation({wedding}){return <AndreaArturoTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
