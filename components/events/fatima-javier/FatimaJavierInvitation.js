"use client";
import { FatimaJavierTemplate } from "./FatimaJavierTemplate";
const assets={floral:"/images/events/fatima-y-javier/floral.png",envelopeClosed:"/images/events/fatima-y-javier/envelope-closed.png",envelopeOpen:"/images/events/fatima-y-javier/envelope-open.png"};
const theme={"--coral":"#b5144e","--peach":"#f28e2b","--olive":"#b5144e","--dark":"#472b23","--gold":"#b77515","--gold-soft":"#f3d58d","--paper":"#fffdf7","--ivory":"#fff3e9","--charcoal":"#472b23","--muted":"#806258","--accent-light":"#ffe9bb"};
export function FatimaJavierInvitation({wedding}){return <FatimaJavierTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
