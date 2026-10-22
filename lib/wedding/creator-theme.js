const hex = /^#[0-9a-f]{6}$/i;
export function mixColors(first, second, amount) {
  const a = hex.test(first || "") ? first : "#594238";
  const b = hex.test(second || "") ? second : "#ffffff";
  return "#" + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - amount) + parseInt(b.slice(i, i + 2), 16) * amount).toString(16).padStart(2, "0")).join("");
}
export const coverShade = theme => mixColors(theme?.primary, "#101018", .75);
