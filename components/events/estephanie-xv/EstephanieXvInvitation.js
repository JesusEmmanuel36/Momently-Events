"use client";
import { EstephanieXvTemplate } from "./EstephanieXvTemplate";
const theme={"--coral":"#183c9b","--peach":"#aec0e1","--olive":"#a17b37","--dark":"#07152d","--gold":"#c8a25a","--gold-soft":"#dfc791","--paper":"#fffaf0","--ivory":"#eef1f9","--charcoal":"#112444","--muted":"#596880","--accent-light":"#dde5f5"};
export function EstephanieXvInvitation({wedding}){return <EstephanieXvTemplate wedding={wedding} customTheme={theme}/>;}
