export const DEFAULT_RSVP_TITLE='¿Nos acompañas?';
export function resolveRsvpTitle(proposal,previous,prompt){
 const current=typeof previous==='string'&&previous.trim()?previous.trim():DEFAULT_RSVP_TITLE;
 const clauses=String(prompt||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/[\n;]+/);
 const requested=clauses.some(clause=> !/\b(no cambies|no modifiques|conserva|manten)\b/.test(clause)&&(/\b(rsvp|confirmacion|formulario)\b/.test(clause)&&/\b(titulo|encabezado|texto|diga|dice)\b/.test(clause)||/nos acompanas/.test(clause)&&/\b(cambia|cambiar|pon|poner|reemplaza|modifica|en lugar)\b/.test(clause)));
 return requested&&typeof proposal==='string'&&proposal.trim()&&proposal.trim().length<=160?proposal.trim():current;
}
export function escapeRsvpTitle(value){return String(value||DEFAULT_RSVP_TITLE).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
