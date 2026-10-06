"use client";
import { ArmandoYamiletTemplate } from "./ArmandoYamiletTemplate";
const assets = { floral:"/images/events/armando-y-yamilet/floral.png", envelopeClosed:"/images/events/armando-y-yamilet/envelope-closed.png", envelopeOpen:"/images/events/armando-y-yamilet/envelope-open.png" };
const theme = { "--coral":"#789bb8", "--peach":"#cadce9", "--olive":"#789bb8", "--dark":"#29465e", "--gold":"#ac9165", "--gold-soft":"#dce4eb", "--paper":"#f8fbfd", "--ivory":"#eaf1f7", "--charcoal":"#29465e", "--muted":"#657b8c", "--accent-light":"#d7e7f2" };
export function ArmandoYamiletInvitation({ wedding }) { return <ArmandoYamiletTemplate wedding={wedding} assets={assets} customTheme={theme}/>; }
