"use client";
import { FernandoCristalTemplate } from "./FernandoCristalTemplate";
const assets={floral:"/images/events/fernando-y-cristal/floral.png",envelopeClosed:"/images/events/fernando-y-cristal/envelope-closed.png",envelopeOpen:"/images/events/fernando-y-cristal/envelope-open.png"};
const theme={"--coral":"#a32a3a","--peach":"#e9c2c7","--olive":"#9b2636","--dark":"#491b24","--gold":"#b39156","--gold-soft":"#e4d2ac","--paper":"#fffdf9","--ivory":"#f8e8e9","--charcoal":"#491b24","--muted":"#7b5c61","--accent-light":"#f3d6dc"};
export function FernandoCristalInvitation({wedding}){return <FernandoCristalTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
