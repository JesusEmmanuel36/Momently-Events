import {z} from 'zod';
const color=z.string().regex(/^#[0-9a-fA-F]{6}$/);
export const musicControlSchema=z.object({background:color,text:color,border:color,variant:z.enum(['text','icons','icons-text']),size:z.number().min(32).max(64),radius:z.number().min(0).max(40),fontSize:z.number().min(10).max(18),shadow:z.boolean(),position:z.enum(['left','right'])}).strict();
export const defaultMusicControl={background:'#FFFCF5',text:'#493A2D',border:'#D6C6AE',variant:'text',size:36,radius:24,fontSize:12,shadow:true,position:'left'};
export const musicControlJsonSchema={type:'object',additionalProperties:false,required:Object.keys(defaultMusicControl),properties:{background:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},text:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},border:{type:'string',pattern:'^#[0-9a-fA-F]{6}$'},variant:{type:'string',enum:['text','icons','icons-text']},size:{type:'number',minimum:32,maximum:64},radius:{type:'number',minimum:0,maximum:40},fontSize:{type:'number',minimum:10,maximum:18},shadow:{type:'boolean'},position:{type:'string',enum:['left','right']}}};
export function musicDesignChangeRequested(prompt){
 const clauses=String(prompt||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/[.!?;\n]+/);
 return clauses.some(clause=>{
  if(/\b(no|nunca|sin)\b.{0,45}\b(camb|modif|alter|toc|redisen|ajust|hag|hacer)/.test(clause))return false;
  if(/(?:solo|unicamente).{0,20}(?:colores?|paleta)/.test(clause)||/\b(conserva|conservar|manten|mantener)\b.{0,50}\b(forma|tamano|diseno|boton|reproductor)\b/.test(clause))return false;
  const target=/\b(boton|control|reproductor)\b/.test(clause)&&/\b(musica|musical|audio|play|pausa|pausar|reproducir|reproduccion|despausar)\b/.test(clause);
  if(!target)return false;
  // Requests about colors alone never authorize changing the geometry.
  return /\b(iconos?|pequen[oa]|chic[oa]|compact[oa]|grande|circular|redond[oa]|cuadrad[oa]|forma|tamano|diseno|posicion|derecha|izquierda|sombra|texto|letra|tipografia|minimalista|sencill[oa])\b/.test(clause)||/\b(redisen|modifica|modificar|transforma|transformar)\b/.test(clause)&&!/(?:solo|unicamente).{0,20}colores?/.test(clause)&&!/\bcolores?\b/.test(clause);
 });
}
export function resolveMusicControl(proposal,previous,prompt){
 const next=musicControlSchema.safeParse(proposal),old=musicControlSchema.safeParse(previous);const base=old.success?old.data:defaultMusicControl;
 if(!next.success)return base;
 return musicDesignChangeRequested(prompt)?next.data:{...base,background:next.data.background,text:next.data.text,border:next.data.border};
}
export function musicControlStyle(control){const parsed=musicControlSchema.safeParse(control),s=parsed.success?parsed.data:defaultMusicControl;return {control:s,style:{'--music-bg':s.background,'--music-text':s.text,'--music-border':s.border,'--music-size':s.size+'px','--music-radius':s.radius+'px','--music-font-size':s.fontSize+'px','--music-shadow':s.shadow?'0 3px 12px #0002':'none'}};}
