"use client";
import { ZoeEmilianoTemplate } from "./ZoeEmilianoTemplate";
const assets={floral:"/images/events/zoe-y-emiliano/floral.png",envelopeClosed:"/images/events/zoe-y-emiliano/envelope-closed.png",envelopeOpen:"/images/events/zoe-y-emiliano/envelope-open.png"};
const theme={"--coral": "#b48a4e", "--peach": "#ead8bf", "--olive": "#a68149", "--dark": "#40362b", "--gold": "#b48a4e", "--gold-soft": "#dec9a7", "--paper": "#fffaf2", "--ivory": "#f2e5d2", "--charcoal": "#40362b", "--muted": "#7a6b58", "--accent-light": "#f0dfc6"};
export function ZoeEmilianoInvitation({wedding}){return <ZoeEmilianoTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
