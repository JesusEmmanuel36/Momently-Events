"use client";
import { AlejandroKatyaTemplate } from "./AlejandroKatyaTemplate";
const assets = { floral:"/images/events/alejandro-y-katya/floral.png", envelopeClosed:"/images/events/alejandro-y-katya/envelope-closed.png", envelopeOpen:"/images/events/alejandro-y-katya/envelope-open.png" };
const theme = { "--coral":"#626b42", "--peach":"#c6cbb4", "--olive":"#626b42", "--dark":"#303720", "--gold":"#938060", "--gold-soft":"#d9cbb3", "--paper":"#f8f1e6", "--ivory":"#ede2ce", "--charcoal":"#303720", "--muted":"#69644f", "--accent-light":"#ded5bd" };
export function AlejandroKatyaInvitation({ wedding }) { return <AlejandroKatyaTemplate wedding={wedding} assets={assets} customTheme={theme}/>; }
