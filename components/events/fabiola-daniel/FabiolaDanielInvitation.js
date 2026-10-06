"use client";
import { FabiolaDanielTemplate } from "./FabiolaDanielTemplate";
const assets={floral:"/images/events/fabiola-y-daniel/floral.png",envelopeClosed:"/images/events/fabiola-y-daniel/envelope-closed.png",envelopeOpen:"/images/events/fabiola-y-daniel/envelope-open.png"};
const theme={"--coral":"#977943","--peach":"#e6d3b5","--olive":"#806b47","--dark":"#4a3828","--gold":"#b28b42","--gold-soft":"#deca9e","--paper":"#fbf5e9","--ivory":"#eee1ca","--charcoal":"#4a3828","--muted":"#79664f","--accent-light":"#eadabd"};
export function FabiolaDanielInvitation({wedding}){return <FabiolaDanielTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
