"use client";
import { CarolinaPavelTemplate } from "./CarolinaPavelTemplate";
const assets={floral:"/images/events/carolina-y-pavel/floral.png",envelopeClosed:"/images/events/carolina-y-pavel/envelope-closed.png",envelopeOpen:"/images/events/carolina-y-pavel/envelope-open.png"};
const theme={"--coral":"#855b3d","--peach":"#d8b895","--olive":"#855b3d","--dark":"#34251e","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#eee4d5","--charcoal":"#34251e","--muted":"#806b5e","--accent-light":"#e7c9a3"};
export function CarolinaPavelInvitation({wedding}){return <CarolinaPavelTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
