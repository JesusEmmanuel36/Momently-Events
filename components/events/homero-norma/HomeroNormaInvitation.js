"use client";
import { HomeroNormaTemplate } from "./HomeroNormaTemplate";
const assets = { floral:"/images/events/homero-y-norma/floral.png", envelopeClosed:"/images/events/homero-y-norma/envelope-closed.png", envelopeOpen:"/images/events/homero-y-norma/envelope-open.png" };
const theme = { "--coral":"#8d243d", "--peach":"#e5cba7", "--olive":"#8d243d", "--dark":"#491926", "--gold":"#b8965d", "--gold-soft":"#ead7b7", "--paper":"#fff9f0", "--ivory":"#f4e6dc", "--charcoal":"#491926", "--muted":"#916d70", "--accent-light":"#eed9d2" };
export function HomeroNormaInvitation({ wedding }) { return <HomeroNormaTemplate wedding={wedding} assets={assets} customTheme={theme}/>; }
