"use client";
import { MayraJoseTemplate } from "./MayraJoseTemplate";
const assets={floral:"/images/events/mayra-y-jose/floral.png",envelopeClosed:"/images/events/mayra-y-jose/envelope-closed.png",envelopeOpen:"/images/events/mayra-y-jose/envelope-open-v2.png"};
const theme={"--coral":"#71836b","--peach":"#b6c3ae","--olive":"#71836b","--dark":"#273c30","--gold":"#b29968","--gold-soft":"#d8c8a5","--paper":"#fcfbf6","--ivory":"#f0f3eb","--charcoal":"#2e3d32","--muted":"#6c7969","--accent-light":"#e0e8d8"};
export function MayraJoseInvitation({wedding}){return <MayraJoseTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
