export const defaultEnvelopeColors={paper:"#F2ECDF",ribbon:"#D8A596",seal:"#C18A63",flowers:"#F0E6CB",accentFlowers:"#DEA899",leaves:"#7D927E"};
function normalize(value,fallback){if(typeof value!=="string")return fallback;const v=value.trim();if(/^#[0-9a-f]{6}$/i.test(v))return v.toUpperCase();if(/^#[0-9a-f]{3}$/i.test(v))return "#"+v.slice(1).split("").map(c=>c+c).join("").toUpperCase();return fallback;}
function mix(base,target,amount){const b=base.slice(1),t=target.slice(1);return "#"+[0,2,4].map(i=>Math.round(parseInt(b.slice(i,i+2),16)*(1-amount)+parseInt(t.slice(i,i+2),16)*amount).toString(16).padStart(2,"0")).join("");}
export function createEnvelopeTheme({color,colors={}}={}){
  const palette={...defaultEnvelopeColors,...colors};
  if(color){if(!colors.ribbon)palette.ribbon=color;if(!colors.accentFlowers)palette.accentFlowers=color;}
  const names={paper:"paper",ribbon:"ribbon",seal:"seal",flowers:"flower",accentFlowers:"accent-flower",leaves:"leaf"};
  const variables={};
  for(const [key,name] of Object.entries(names)){
    const base=normalize(palette[key],defaultEnvelopeColors[key]);
    variables[`--${name}-base`]=base;
    variables[`--${name}-light`]=mix(base,"#FFFFFF",.32);
    variables[`--${name}-highlight`]=mix(base,"#FFFFFF",.64);
    variables[`--${name}-shadow`]=mix(base,"#302018",.24);
    variables[`--${name}-deep`]=mix(base,"#302018",.42);
  }
  variables["--paper"]= "repeating-radial-gradient(ellipse at 23% 31%,#bda98c10 0 .6px,#ffffff00 .8px 3px),repeating-linear-gradient(32deg,#fff8 .2px,#dac8aa12 .7px,#fffa 1.1px,transparent 2.2px),linear-gradient(130deg,var(--paper-highlight),var(--paper-base) 48%,var(--paper-light) 80%,var(--paper-base))";
  variables["--copper"]= "linear-gradient(125deg,var(--seal-deep),var(--seal-highlight) 12%,var(--seal-shadow) 24%,var(--seal-light) 39%,var(--seal-deep) 49%,var(--seal-highlight) 58%,var(--seal-base) 78%,var(--seal-light))";
  return variables;
}
