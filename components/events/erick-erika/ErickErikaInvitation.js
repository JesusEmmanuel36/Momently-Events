"use client";

import { SaraBlaseInvitation } from "@/components/events/sara-blase/SaraBlaseInvitation";

const assets = {
  floral: "/images/events/erick-erika/floral.png",
  envelopeClosed: "/images/events/erick-erika/envelope-closed.png",
  envelopeOpen: "/images/events/erick-erika/envelope-open.png",
};

const theme = {
  "--coral": "#ad853d",
  "--peach": "#ddcdb7",
  "--olive": "#7f9478",
  "--dark": "#435344",
  "--gold": "#b58a3c",
  "--gold-soft": "#d7bd82",
  "--paper": "#fffaf1",
  "--ivory": "#eee6d9",
  "--charcoal": "#3f493e",
  "--muted": "#73786d",
  "--accent-light": "#e3d3b8",
};

export function ErickErikaInvitation({ wedding }) {
  return <SaraBlaseInvitation wedding={wedding} assets={assets} customTheme={theme} heroFramed />;
}
