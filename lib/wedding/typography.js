export const FONT_OPTIONS = [["serif","Cormorant Garamond · elegante"],["script","Allura · cursiva"],["sans","Manrope · moderna"],["georgia","Georgia · clásica"],["times","Times New Roman"],["arial","Arial"]];
export const FONT_KEYS = FONT_OPTIONS.map(([key])=>key);
const families={serif:"var(--font-serif), Georgia, serif",script:"var(--font-script), cursive",sans:"var(--font-sans), Arial, sans-serif",georgia:"Georgia, serif",times:'"Times New Roman", serif',arial:"Arial, sans-serif"};
export function typographyStyle(typography={}) {return Object.fromEntries(["cover","headings","body"].filter(key=>families[typography[key]]).map(key=>[`--invitation-${key}-font`,families[typography[key]]]));}
