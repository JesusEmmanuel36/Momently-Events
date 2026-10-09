"use client";
import { Parisienne } from "next/font/google";
import { JoannaRubenTemplate } from "./JoannaRubenTemplate";
const elegantScript = Parisienne({subsets:["latin"],weight:"400"});
const assets={floral:"/images/events/joanna-y-ruben/floral.png",envelopeClosed:"/images/events/joanna-y-ruben/envelope-closed.png",envelopeOpen:"/images/events/joanna-y-ruben/envelope-open.png"};
const theme={"--coral":"#792b40","--peach":"#cf9caa","--olive":"#792b40","--dark":"#462330","--gold":"#b59a6a","--gold-soft":"#e4d3b4","--paper":"#fffaf6","--ivory":"#f3e6e3","--charcoal":"#462330","--muted":"#906e79","--accent-light":"#efd0d8"};
export function JoannaRubenInvitation({wedding}){return <JoannaRubenTemplate wedding={wedding} assets={assets} customTheme={{...theme,"--font-script":elegantScript.style.fontFamily}}/>;}
