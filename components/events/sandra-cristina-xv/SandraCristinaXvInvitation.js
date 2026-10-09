"use client";
import { SandraCristinaXvTemplate } from "./SandraCristinaXvTemplate";
const assets={floral:"/images/events/xv-sandra-cristina/floral.png",envelopeClosed:"/images/events/xv-sandra-cristina/envelope-closed.png",envelopeOpen:"/images/events/xv-sandra-cristina/envelope-open.png"};
const theme={"--coral":"#3c6493","--peach":"#a7c3df","--olive":"#3c6493","--dark":"#263e60","--gold":"#8d9eb2","--gold-soft":"#ccd5e0","--paper":"#fbfdff","--ivory":"#eef4fa","--charcoal":"#263e60","--muted":"#697f99","--accent-light":"#dce9f5"};
export function SandraCristinaXvInvitation({wedding}){return <SandraCristinaXvTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
