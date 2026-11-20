// Repair only unambiguous invitation phrases in model output, never attributes,
// URLs, SVG artwork, names or arbitrary word fragments. No published-data migration.
const pairs = [
 ['reserva','este'], ['guarda','esta'], ['este','día'], ['esta','fecha'],
 ['con','todo'], ['todo','nuestro'], ['nuestro','amor'],
 ['confirmar','asistencia'], ['confirma','tu'], ['tu','asistencia'],
 ['agregar','a'], ['a','mi'], ['mi','calendario'],
 ['nos','acompañas'], ['te','esperamos'], ['nuestra','boda'],
 ['código','de'], ['de','vestimenta'], ['mesa','de'], ['de','regalos']
];
const inline = /^<\/?(?:span|em|strong|b|i|small|a|u|mark)\b[^>]*>$/i;
export function repairInvitationTextSpacing(html){
 const tokens=String(html).match(/<!--[\s\S]*?-->|<(?:"[^"]*"|'[^']*'|[^'">])*>|[^<]+|</g)||[];
 let protectedTag='';
 for(let i=0;i<tokens.length;i++){
  const token=tokens[i];
  if(protectedTag){if(new RegExp(`^<\\/${protectedTag}\\s*>$`,'i').test(token))protectedTag='';continue}
  const protectedStart=token.match(/^<(svg|script|style|code|pre)\b/i);
  if(protectedStart){if(!/\/\s*>$/.test(token))protectedTag=protectedStart[1];continue}
  if(token.startsWith('<'))continue;
  let text=token;
  for(const [left,right] of pairs)text=text.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${left})(${right})(?![\\p{L}\\p{N}])`,'giu'),'$1 $2');
  let prev=i-1;while(prev>=0&&inline.test(tokens[prev]))prev--;
  if(prev>=0&&prev<i-1&&!tokens[prev].startsWith('<')){
   for(const [left,right] of pairs){
    if(new RegExp(`(?<!\\p{L})${left}$`,'iu').test(tokens[prev])&&new RegExp(`^${right}(?!\\p{L})`,'iu').test(text)){if(/^<(?!\/)/.test(tokens[i-1]))tokens[i-1]=' '+tokens[i-1];else text=' '+text;break}
   }
  }
  tokens[i]=text;
 }
 return tokens.join('');
}
