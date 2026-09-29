"use client";

import { SaraBlaseInvitation } from "@/components/events/sara-blase/SaraBlaseInvitation";
import styles from "./MargaritaMateoInvitation.module.css";

const assets = {
  floral: "/images/events/margarita-mateo/floral.png",
  envelopeClosed: "/images/events/margarita-mateo/envelope-closed.png",
  envelopeOpen: "/images/events/margarita-mateo/envelope-open.png",
};

const theme = {
  "--coral": "#416cc0",
  "--peach": "#9ab4e4",
  "--olive": "#294b87",
  "--dark": "#091a3b",
  "--gold": "#aeb8c7",
  "--gold-soft": "#d5dbe4",
  "--paper": "#fffdfa",
  "--ivory": "#e9eef6",
  "--charcoal": "#172542",
  "--muted": "#62708a",
  "--accent-light": "#c8d8f5",
};

export function MargaritaMateoInvitation({ wedding }) {
  return <SaraBlaseInvitation wedding={wedding} assets={assets} customTheme={theme} nameClassName={styles.compactNames} />;
}
