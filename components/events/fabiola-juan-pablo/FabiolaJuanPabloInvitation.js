"use client";
import { FabiolaJuanPabloTemplate } from "./FabiolaJuanPabloTemplate";
const assets={floral:"/images/events/fabiola-y-juan-pablo/floral.png",envelopeClosed:"/images/events/fabiola-y-juan-pablo/envelope-closed.png",envelopeOpen:"/images/events/fabiola-y-juan-pablo/envelope-open.png"};
const theme={"--coral": "#52735b", "--peach": "#dce6da", "--olive": "#52735b", "--dark": "#273c30", "--gold": "#ad945c", "--gold-soft": "#d5c9aa", "--paper": "#ffffff", "--ivory": "#f2f5ef", "--charcoal": "#273c30", "--muted": "#5d7160", "--accent-light": "#e2eadf"};
export function FabiolaJuanPabloInvitation({wedding}){return <FabiolaJuanPabloTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
