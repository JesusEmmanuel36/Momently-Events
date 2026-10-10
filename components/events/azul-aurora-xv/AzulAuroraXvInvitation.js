"use client";
import { AzulAuroraXvTemplate } from "./AzulAuroraXvTemplate";
const theme = {
  "--coral": "#b55078", "--peach": "#eab5c7", "--olive": "#986c48",
  "--dark": "#623b4d", "--gold": "#ad8442", "--gold-soft": "#d8ba7c",
  "--paper": "#fff9f5", "--ivory": "#fbe9ef", "--charcoal": "#623b4d",
  "--muted": "#967080", "--accent-light": "#f2ceda",
};
export function AzulAuroraXvInvitation({ wedding }) {
  return <AzulAuroraXvTemplate wedding={wedding} customTheme={theme} />;
}
