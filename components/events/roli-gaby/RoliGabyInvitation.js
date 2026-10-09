"use client";
import { RoliGabyTemplate } from "./RoliGabyTemplate";
const assets={floral:"/images/events/roli-y-gaby/floral-v2.png",envelopeClosed:"/images/events/roli-y-gaby/envelope-closed-v2.png",envelopeOpen:"/images/events/roli-y-gaby/envelope-open-v2.png"};
const theme={"--coral":"#9c7f84","--peach":"#c19da5","--olive":"#75535a","--dark":"#5d4148","--gold":"#b78d82","--gold-soft":"#d9bdc2","--paper":"#fff8f9","--ivory":"#f5e9eb","--charcoal":"#4d353b","--muted":"#826b70","--accent-light":"#e8d0d5"};
export function RoliGabyInvitation({wedding}){return <RoliGabyTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
