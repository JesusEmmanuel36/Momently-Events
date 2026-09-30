"use client";

import { SaraBlaseInvitation } from "@/components/events/sara-blase/SaraBlaseInvitation";

const assets = {
  floral: "/images/events/erick-erika/floral.png",
  envelopeClosed: "/images/events/erick-erika/envelope-closed.png",
  envelopeOpen: "/images/events/erick-erika/envelope-open.png",
};

const theme = {
  "--coral": "#967258",
  "--peach": "#cfb594",
  "--olive": "#705849",
  "--dark": "#3d2a22",
  "--gold": "#b58a4d",
  "--gold-soft": "#dcc39c",
  "--paper": "#fffaf2",
  "--ivory": "#efe2d2",
  "--charcoal": "#44332b",
  "--muted": "#806d61",
  "--accent-light": "#ead6b8",
};

export function ErickErikaInvitation({ wedding }) {
  return <SaraBlaseInvitation wedding={wedding} assets={assets} customTheme={theme} />;
}
