"use client";
import { JessicaJoanTemplate } from "./JessicaJoanTemplate";
const assets={floral:"/images/events/jessica-y-joan/floral.png",envelopeClosed:"/images/events/jessica-y-joan/envelope-closed.png",envelopeOpen:"/images/events/jessica-y-joan/envelope-open.png"};
const theme={"--coral":"#2f66ba","--peach":"#91b4e8","--olive":"#174ea6","--dark":"#082b68","--gold":"#c3a35b","--gold-soft":"#d5c28b","--paper":"#ffffff","--ivory":"#eaf1fc","--charcoal":"#102c55","--muted":"#617394","--accent-light":"#c9dcf7"};
export function JessicaJoanInvitation({wedding}){return <JessicaJoanTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
