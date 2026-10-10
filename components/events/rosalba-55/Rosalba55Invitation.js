"use client";
import { Rosalba55Template } from "./Rosalba55Template";
const theme = { "--coral":"#bd276b", "--peach":"#eaa7c0", "--olive":"#8c7d8b", "--dark":"#58263e", "--gold":"#88818c", "--gold-soft":"#d4cdd6", "--paper":"#fff6fa", "--ivory":"#f5e0eb", "--charcoal":"#58263e", "--muted":"#836573", "--accent-light":"#edbfd3" };
export function Rosalba55Invitation({ wedding }) { return <Rosalba55Template wedding={wedding} customTheme={theme} />; }
