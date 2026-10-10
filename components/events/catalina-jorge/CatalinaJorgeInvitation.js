"use client";
import { CatalinaJorgeTemplate } from "./CatalinaJorgeTemplate";
const theme = {
  "--coral": "#66704b", "--peach": "#d1bfa6", "--olive": "#66704b",
  "--dark": "#343d2d", "--gold": "#ad8a4e", "--gold-soft": "#d0bb8d",
  "--paper": "#fffdf7", "--ivory": "#f4eddf", "--charcoal": "#343d2d",
  "--muted": "#7c7866", "--accent-light": "#d8dcc6",
};
export function CatalinaJorgeInvitation({ wedding }) {
  return <CatalinaJorgeTemplate wedding={wedding} customTheme={theme} />;
}
