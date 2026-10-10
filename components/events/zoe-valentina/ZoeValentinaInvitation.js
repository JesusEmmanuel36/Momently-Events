"use client";
import { ZoeValentinaTemplate } from "./ZoeValentinaTemplate";
const assets={floral:"/images/events/xv-zoe-valentina/floral.png",envelopeClosed:"/images/events/xv-zoe-valentina/envelope-closed.png",envelopeOpen:"/images/events/xv-zoe-valentina/envelope-open.png"};
const theme={"--coral":"#a66c73","--peach":"#c8a0a5","--olive":"#3e4b34","--dark":"#35402e","--gold":"#b79345","--gold-soft":"#efd17a","--paper":"#fffaf3","--ivory":"#f6efe3","--charcoal":"#3e4b34","--muted":"#746a61","--accent-light":"#adb999"};
export function ZoeValentinaInvitation({wedding}){return <ZoeValentinaTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
