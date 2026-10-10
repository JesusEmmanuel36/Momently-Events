"use client";
import { RogelioBlancaBautizoTemplate } from "./RogelioBlancaBautizoTemplate";

const theme = {
  "--coral": "#8c704b", "--peach": "#d4c3ac", "--olive": "#786448",
  "--dark": "#514337", "--gold": "#ad884a", "--gold-soft": "#c8aa72",
  "--paper": "#fffdf8", "--ivory": "#f5eee1", "--charcoal": "#514337",
  "--muted": "#847766", "--accent-light": "#e8dbc5",
};
export function RogelioBlancaBautizoInvitation({ wedding }) {
  return <RogelioBlancaBautizoTemplate wedding={wedding} customTheme={theme} />;
}
