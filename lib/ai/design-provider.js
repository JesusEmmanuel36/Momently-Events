import {getAdminDb} from '../firebase/admin.js';
import {visualReference} from './v2-plan.js';
import {preserveWhatsappConfirmation} from './whatsapp-confirmation.js';
import {resolveRsvpTitle} from './rsvp-title.js';
import {resolveEnvelopeLetter} from './envelope-letter.js';
import {textUsageCost} from './usage-cost.js';
import {resolveMusicControl} from './music-control.js';
import {pendingTextAllowed} from './invitation-instructions.js';
import {AppError} from '../errors.js';
import {COVER_INSTRUCTIONS,coverInputSchema,coverOutputJsonSchema,coverOutputSchema,parseCoverResponse} from './cover-code.js';
export async function generateInvitationDesign(input,{env=process.env,fetcher=fetch,db}={}){
 if(!env.OPENAI_API_KEY)throw new AppError('Falta OPENAI_API_KEY en este servidor.',503);
 const data=coverInputSchema.parse(input);
const model=env.OPENAI_TEXT_MODEL||'gpt-6.1-sol';let styleReference; if(data.referenceEventId&&!data.previous){const ref=await (db||getAdminDb()).collection('events').doc(data.referenceEventId).get();if(ref.exists&&ref.data().templateKey==='ai-designed')styleReference=visualReference(ref.data().publicData?.aiDesign?.cover)}const content=[{type:'input_text',text:JSON.stringify({...data,...(styleReference?{styleReference}: {})})}];if(data.imageUrl)content.push({type:'input_image',image_url:data.imageUrl,detail:'high'});for(const image of data.referenceImageUrls||[])if(image!==data.imageUrl)content.push({type:'input_image',image_url:image,detail:'high'});
 let response;try{response=await fetcher('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(240000),body:JSON.stringify({model,store:false,reasoning:{effort:'medium'},max_output_tokens:24000,instructions:COVER_INSTRUCTIONS+' Si se recibe styleReference, úsala únicamente como referencia visual y estructural. No copies datos, fotos, teléfonos ni enlaces del evento de referencia. El encargo actual tiene prioridad.',input:[{role:'user',content}],text:{format:{type:'json_schema',name:'cover_code',strict:true,schema:coverOutputJsonSchema}}})})}catch{throw new AppError('La generación tardó demasiado. Intenta otra vez.',504)}
 if(!response.ok)throw new AppError(response.status===429?'Revisa el saldo o los límites de OpenAI.':'OpenAI no pudo generar la invitación. Revisa la clave y el modelo.',502);const result=await response.json();let cover;try{cover=parseCoverResponse(result);cover={...cover,rsvpTitle:resolveRsvpTitle(cover.rsvpTitle,data.managedFeatures?.rsvpTitle??data.previous?.rsvpTitle,data.prompt),envelopeLetter:resolveEnvelopeLetter(cover.envelopeLetter,data.previous?.envelopeLetter,data.prompt),musicControl:resolveMusicControl(cover.musicControl,data.previous?.musicControl,data.prompt)};cover=coverOutputSchema.parse(preserveWhatsappConfirmation(cover,data.previous,data.prompt));if(!pendingTextAllowed(data.prompt)&&/\b(por confirmar|pendiente|por definir|próximamente)\b/i.test(cover.html))throw Error('pending')}catch{throw new AppError('El código no pasó la validación. Intenta precisar el diseño.',502)}return {cover,model,cost:textUsageCost(model,result.usage,env.AI_USD_TO_MXN),usage:{inputTokens:result.usage?.input_tokens||0,outputTokens:result.usage?.output_tokens||0}};
}
