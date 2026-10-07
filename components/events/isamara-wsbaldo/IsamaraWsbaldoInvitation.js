"use client";
import { IsamaraWsbaldoTemplate } from "./IsamaraWsbaldoTemplate";
const assets={floral:"/images/events/isamara-y-wsbaldo/floral.png",envelopeClosed:"/images/events/isamara-y-wsbaldo/envelope-closed.png",envelopeOpen:"/images/events/isamara-y-wsbaldo/envelope-open.png"};
const theme={"--coral":"#9d7d4c","--peach":"#e6d8bc","--olive":"#9d7d4c","--dark":"#4c392b","--gold":"#b49354","--gold-soft":"#e6d4af","--paper":"#fbf5ec","--ivory":"#efe2d0","--charcoal":"#4c392b","--muted":"#89765e","--accent-light":"#efe3c9"};
export function IsamaraWsbaldoInvitation({wedding}){return <IsamaraWsbaldoTemplate wedding={wedding} assets={assets} customTheme={theme}/>;}
