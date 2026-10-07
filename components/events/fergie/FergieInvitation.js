"use client";
import { FergieTemplate } from "./FergieTemplate";
const assets={floral:"/images/events/xv-fergie/floral.png",envelopeClosed:"/images/events/xv-fergie/envelope-closed.png",envelopeOpen:"/images/events/xv-fergie/envelope-open.png"};
const theme={"--coral":"#46594b","--peach":"#bccabd","--olive":"#566b5b","--dark":"#202723","--gold":"#b59658","--gold-soft":"#d6c292","--paper":"#f9faf5","--ivory":"#e5ece3","--charcoal":"#202723","--muted":"#58665b","--accent-light":"#92a995"};
export function FergieInvitation({wedding}){return <FergieTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
