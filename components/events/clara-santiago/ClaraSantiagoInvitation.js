"use client";
import { ClaraSantiagoTemplate } from "./ClaraSantiagoTemplate";
const theme = { "--coral":"#102642", "--peach":"#b5c4d6", "--olive":"#102642", "--dark":"#08182e", "--gold":"#b88c37", "--gold-soft":"#d6b56b", "--paper":"#ffffff", "--ivory":"#f4f1e9", "--charcoal":"#102642", "--muted":"#637085", "--accent-light":"#d8e0eb" };
export function ClaraSantiagoInvitation({ wedding }) { return <ClaraSantiagoTemplate wedding={wedding} customTheme={theme} />; }
