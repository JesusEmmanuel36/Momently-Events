"use client";
import { LuisManuelNancyTemplate } from "./LuisManuelNancyTemplate";
const assets={floral:"/images/events/luis-manuel-y-nancy/floral.png",envelopeClosed:"/images/events/luis-manuel-y-nancy/envelope-closed.png",envelopeOpen:"/images/events/luis-manuel-y-nancy/envelope-open.png"};
const theme={"--coral":"#78243f","--peach":"#e0ccd3","--olive":"#78243f","--dark":"#351724","--gold":"#9b6578","--gold-soft":"#d8c7ce","--paper":"#fbf8f5","--ivory":"#f2eeed","--charcoal":"#351724","--muted":"#876b75","--accent-light":"#e5d9dd"};
export function LuisManuelNancyInvitation({wedding}){return <LuisManuelNancyTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
