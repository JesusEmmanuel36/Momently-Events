"use client";

import { EmilyFernandaXvTemplate } from "@/components/events/emily-fernanda-xv/EmilyFernandaXvTemplate";
import styles from "./RubiXimenaXv.module.css";

const images = "/images/events/xv-rubi-ximena";
const assets = {
  floral: `${images}/floral.png`,
  envelopeClosed: `${images}/envelope-closed.png`,
  envelopeOpen: `${images}/envelope-open.png`,
};
const theme = {
  "--coral": "#b96f82", "--peach": "#e8b7c2", "--olive": "#8b7665",
  "--dark": "#563b43", "--gold": "#b58b62", "--gold-soft": "#dfc4a5",
  "--paper": "#fffaf8", "--ivory": "#f8e8ec", "--charcoal": "#563b43",
  "--muted": "#856c73", "--accent-light": "#f1cfd7",
};

export function RubiXimenaXvInvitation({ wedding }) {
  return <EmilyFernandaXvTemplate wedding={wedding} assets={assets} customTheme={theme} themeClassName={styles.rubi} />;
}
