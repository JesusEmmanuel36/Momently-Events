"use client";
import { AlmaDelia40Template } from "./AlmaDelia40Template";
const assets={floral:"/images/events/carolina-y-pavel/western.png",envelopeClosed:"/images/events/alma-delia-40/envelope-closed.png",envelopeOpen:"/images/events/alma-delia-40/envelope-open.png"};
const theme={"--coral":"#855b3d","--peach":"#d8b895","--olive":"#855b3d","--dark":"#34251e","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#eee4d5","--charcoal":"#34251e","--muted":"#806b5e","--accent-light":"#e7c9a3"};
export function AlmaDelia40Invitation({wedding}){return <AlmaDelia40Template wedding={wedding} assets={assets} customTheme={theme}/>;}
