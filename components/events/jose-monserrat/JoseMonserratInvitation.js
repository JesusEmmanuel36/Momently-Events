"use client";
import { JoseMonserratTemplate } from "./JoseMonserratTemplate";
const assets={floral:"/images/events/joseymontserrat/floral.png",envelopeClosed:"/images/events/joseymontserrat/envelope-closed.png",envelopeOpen:"/images/events/joseymontserrat/envelope-open.png"};
const theme={"--coral":"#a8864a","--peach":"#d8c5aa","--olive":"#a8864a","--dark":"#55402e","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#eee4d5","--charcoal":"#55402e","--muted":"#88745f","--accent-light":"#f2e5ca"};
export function JoseMonserratInvitation({wedding}){return <JoseMonserratTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
