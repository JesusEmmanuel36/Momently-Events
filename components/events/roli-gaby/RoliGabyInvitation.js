"use client";
import { RoliGabyTemplate } from "./RoliGabyTemplate";
const assets={floral:"/images/events/roli-y-gaby/floral.png",envelopeClosed:"/images/events/roli-y-gaby/envelope-closed.png",envelopeOpen:"/images/events/roli-y-gaby/envelope-open.png"};
const theme={"--coral":"#594238","--peach":"#a58f82","--olive":"#594238","--dark":"#3a2a24","--gold":"#b59a6a","--gold-soft":"#d8c3a5","--paper":"#fbf8f3","--ivory":"#f5eee6","--charcoal":"#332824","--muted":"#74645c","--accent-light":"#e8dac8"};
export function RoliGabyInvitation({wedding}){return <RoliGabyTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
