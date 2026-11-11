// Preserve existing WhatsApp contacts when an unrelated edit drops generated HTML.
const links=html=>[...String(html||'').matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(https:\/\/(?:wa\.me\/|api\.whatsapp\.com\/send\b)[^"']*)\1[^>]*>[\s\S]*?<\/a\s*>/gi)].map(match=>({html:match[0],url:match[2]}));
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function whatsappChangeRequested(prompt){
 return normalize(prompt).split(/[\n;.!?]+/).some(clause=>{
  if(/\b(no cambies|no modifiques|no quites|conserva|manten)\b/.test(clause))return false;
  return /\b(whatsapp|whats|wa\.me|confirmacion|confirmar|asistencia|contacto|telefono|numero)\b/.test(clause)&&/\b(quita|quitar|elimina|eliminar|borra|borrar|cambia|cambiar|reemplaza|sustituye|solo|unicamente|sin|desactiva|modifica|actualiza)\b/.test(clause);
 });
}
export function preserveWhatsappConfirmation(proposal,previous,prompt){
 if(!previous||whatsappChangeRequested(prompt))return proposal;
 const old=links(previous.html),current=links(proposal.html);
 const missing=old.filter((link,index)=>old.findIndex(item=>item.url===link.url)===index&&!current.some(item=>item.url===link.url));
 if(!missing.length)return proposal;
 // Reuse only previously validated links, never model-invented contact information.
 const section=`<section data-preserved-whatsapp data-reveal style="padding:3rem 1.25rem;text-align:center"><h2>Confirmar asistencia</h2><p>Confirma tu asistencia por WhatsApp.</p><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem">${missing.map(link=>link.html).join('')}</div></section>`;
 const html=/<\/main\s*>/i.test(proposal.html)?proposal.html.replace(/<\/main\s*>/i,section+'</main>'):proposal.html+section;
 return {...proposal,html};
}
