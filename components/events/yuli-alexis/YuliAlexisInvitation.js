"use client";
import { YuliAlexisTemplate } from "./YuliAlexisTemplate";
const assets={floral:"/images/events/yuli-y-alexis/floral.png",envelopeClosed:"/images/events/yuli-y-alexis/envelope-closed.png",envelopeOpen:"/images/events/yuli-y-alexis/envelope-open.png"};
const theme={"--coral":"#456b86","--peach":"#a5b7c7","--olive":"#456b86","--dark":"#263e51","--gold":"#71899f","--gold-soft":"#c4d1dc","--paper":"#ffffff","--ivory":"#eef3f7","--charcoal":"#263e51","--muted":"#637889","--accent-light":"#dae5ed"};
export function YuliAlexisInvitation({wedding}){return <YuliAlexisTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
