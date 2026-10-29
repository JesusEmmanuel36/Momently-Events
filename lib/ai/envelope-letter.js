import {z} from 'zod';
const color=z.string().regex(/^#[0-9a-fA-F]{6}$/);
export const defaultEnvelopeLetter={background:'#FFFCF5',text:'#4B3E31',accent:'#4B3E31',border:'#E0D4BE',titleFont:'serif',bodyFont:'sans',titleScale:1,bodyScale:1,radius:0,borderWidth:1,shadow:true,align:'center',ornament:'none',footerText:'Con mucho cariño'};
export const envelopeLetterSchema=z.object({background:color,text:color,accent:color,border:color,titleFont:z.enum(['serif','script','sans']),bodyFont:z.enum(['serif','sans']),titleScale:z.number().min(.7).max(1.4),bodyScale:z.number().min(.8).max(1.3),radius:z.number().min(0).max(24),borderWidth:z.number().min(0).max(3),shadow:z.boolean(),align:z.enum(['left','center','right']),ornament:z.enum(['none','heart','star']),footerText:z.string().max(80)}).strict();
export const envelopeLetterJsonSchema={type:'object',additionalProperties:false,required:Object.keys(defaultEnvelopeLetter),properties:{background:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},text:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},accent:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},border:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},titleFont:{type:'string',enum:['serif','script','sans']},bodyFont:{type:'string',enum:['serif','sans']},titleScale:{type:'number',minimum:.7,maximum:1.4},bodyScale:{type:'number',minimum:.8,maximum:1.3},radius:{type:'number',minimum:0,maximum:24},borderWidth:{type:'number',minimum:0,maximum:3},shadow:{type:'boolean'},align:{type:'string',enum:['left','center','right']},ornament:{type:'string',enum:['none','heart','star']},footerText:{type:'string'}}};
export function envelopeLetterChangeRequested(prompt){
 const clauses=String(prompt||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/[.!?;\n]+/);
 return clauses.some(clause=>{
 if(/\b(no|nunca|sin)\b.{0,65}\b(cambi|modifi|alter|toqu|toc|redisen|ajust)/.test(clause)||/\b(conserva|manten|respeta|deja igual)\b/.test(clause))return false;
 const target=/\b(hoja|carta|tarjeta|papel)\b.{0,70}\b(sobre|sale|salga|interior)\b/.test(clause)||/\b(sobre)\b.{0,50}\b(hoja|carta|tarjeta|papel)\b/.test(clause);
 return target&&/\b(cambia|cambiar|modifica|modificar|redisen|diseno|color|fondo|letra|tipografia|borde|sombra|adorno|estilo|pon|poner|quiero|haz|hacer|quita|quitar|agrega|agregar|texto)\w*/.test(clause);
 });
}
export function resolveEnvelopeLetter(proposal,previous,prompt){
 const old=envelopeLetterSchema.safeParse(previous),next=envelopeLetterSchema.safeParse(proposal);
 return envelopeLetterChangeRequested(prompt)&&next.success?next.data:old.success?old.data:undefined;
}
const fonts={serif:'Cormorant,var(--font-serif),Georgia,serif',script:'Allura,cursive',sans:'Manrope,Arial,sans-serif'};
export function envelopeLetterStyle(value){const result=envelopeLetterSchema.safeParse(value);if(!result.success)return {};const s=result.data;return {'--letter-bg':s.background,'--letter-text':s.text,'--letter-accent':s.accent,'--letter-border':s.border,'--letter-title-font':fonts[s.titleFont],'--letter-body-font':fonts[s.bodyFont],'--letter-title-scale':s.titleScale,'--letter-body-scale':s.bodyScale,'--letter-radius':s.radius+'px','--letter-border-width':s.borderWidth+'px','--letter-shadow':s.shadow?'0 3px 12px #0002':'none','--letter-align':s.align,'--letter-items':s.align==='left'?'flex-start':s.align==='right'?'flex-end':'center'};}
