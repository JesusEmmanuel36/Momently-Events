"use client";
import { DianaJoseTemplate } from "./DianaJoseTemplate";
const assets={floral:"/images/events/diana-y-jose/floral.png",envelopeClosed:"/images/events/diana-y-jose/envelope-closed.png",envelopeOpen:"/images/events/diana-y-jose/envelope-open.png"};
const theme={"--coral":"#173b61","--peach":"#cad9e8","--olive":"#173b61","--dark":"#102a48","--gold":"#6484a4","--gold-soft":"#c4d2df","--paper":"#ffffff","--ivory":"#f1f5fa","--charcoal":"#102a48","--muted":"#5c7086","--accent-light":"#dce6f0"};
export function DianaJoseInvitation({wedding}){return <DianaJoseTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
