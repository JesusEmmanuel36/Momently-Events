"use client";
import { Rosalba55Template } from "./Rosalba55Template";
const theme = { "--coral":"#EBC5D1", "--peach":"#EBC5D1", "--olive":"#25251F", "--dark":"#101010", "--gold":"#D2AD61", "--gold-soft":"#E3C88F", "--paper":"#111111", "--ivory":"#1B1B1B", "--charcoal":"#F4E6CB", "--muted":"#CBBEA8", "--accent-light":"#EBC5D1" };
export function Rosalba55Invitation({ wedding }) { return <Rosalba55Template wedding={wedding} customTheme={theme} />; }
