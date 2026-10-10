"use client";
import { LupitaRubenValeriaTemplate } from "./LupitaRubenValeriaTemplate";
const theme={"--coral":"#a82336","--peach":"#dec6cd","--olive":"#a82336","--dark":"#492832","--gold":"#89929f","--gold-soft":"#cbd0d8","--paper":"#ffffff","--ivory":"#f3f4f7","--charcoal":"#492832","--muted":"#7a6870","--accent-light":"#f3e1e5"};
export function LupitaRubenValeriaInvitation({wedding}){return <LupitaRubenValeriaTemplate wedding={wedding} customTheme={theme}/>;}
