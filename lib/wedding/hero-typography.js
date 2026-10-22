export const HERO_TEXT_FIELDS = [["subtitle","Texto superior",14,10,40],["names","Nombres o título",48,24,120],["date","Fecha",18,10,48],["quote","Frase",18,10,48]];
export function heroTextStyle(hero = {}) {
 const style=Object.fromEntries(Object.entries(hero.colors || {}).map(([key,value])=>[`--cover-${key}`,value]));
 for(const [key] of HERO_TEXT_FIELDS) if(hero.fontSizes?.[key]) style[`--cover-size-${key}`]=`${hero.fontSizes[key]}px`;
 if(hero.textShadow){const {enabled,color="#000000",intensity=.5}=hero.textShadow;style["--cover-text-shadow"]=enabled?`0 2px 12px ${color}${Math.round(intensity*255).toString(16).padStart(2,"0")}`:"none";}
 return style;
}
