"use client";
import { DavidReynaTemplate } from "./DavidReynaTemplate";
const assets={floral:"/images/events/david-y-reyna/western.png",envelopeClosed:"/images/events/david-y-reyna/envelope-closed.png",envelopeOpen:"/images/events/david-y-reyna/envelope-open-v2.png"};
const theme={"--coral":"#855b3d","--peach":"#d8b895","--olive":"#855b3d","--dark":"#34251e","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#eee4d5","--charcoal":"#34251e","--muted":"#806b5e","--accent-light":"#e7c9a3"};
export function DavidReynaInvitation({wedding}){return <DavidReynaTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
