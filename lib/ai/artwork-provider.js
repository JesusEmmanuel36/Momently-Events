import {imageUsageCost} from './usage-cost.js';
import {createHash,randomUUID} from 'node:crypto';
import sharp from 'sharp';
import {AppError} from '../errors.js';
import {artworkInputSchema,artworkPrompt} from './artwork-prompts.js';
export async function generateArtwork(input,uid,{env=process.env,fetcher=fetch}={}){
 const{prompt,kind,referenceUrl}=artworkInputSchema.parse(input);const cloud=env.CLOUDINARY_CLOUD_NAME,key=env.CLOUDINARY_API_KEY,secret=env.CLOUDINARY_API_SECRET;
 if(!env.OPENAI_API_KEY)throw new AppError('Falta OPENAI_API_KEY en este servidor.',503);
 if(!cloud||!key||!secret)throw new AppError('Configura Cloudinary para guardar los recursos generados.',503);
 const promptUsed=artworkPrompt(kind,prompt,Boolean(referenceUrl));const settings={model:env.OPENAI_IMAGE_MODEL||'gpt-image-2.5-sunburst',prompt:promptUsed,size:kind==='gallery'?'1024x1024':kind==='cover'?'1024x1536':'1536x1024',quality:'medium',background:['cover','gallery'].includes(kind)?'opaque':'transparent',output_format:'webp',n:1};
 let response;
 try{
 if(referenceUrl){const reference=await fetcher(referenceUrl,{redirect:'error',signal:AbortSignal.timeout(20000)});if(!reference.ok||!/^image\/(png|webp|jpeg)/.test(reference.headers.get('content-type')||'')||Number(reference.headers.get('content-length'))>15000000)throw new AppError('No se pudo leer la imagen de referencia.',400);const bytes=await reference.arrayBuffer();if(bytes.byteLength>15000000)throw new AppError('La referencia es demasiado grande.',400);const body=new FormData();for(const[k,v]of Object.entries(settings))body.set(k,String(v));body.set('image[]',new Blob([bytes],{type:reference.headers.get('content-type')}),'referencia.webp');response=await fetcher('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:'Bearer '+env.OPENAI_API_KEY},body,signal:AbortSignal.timeout(230000)})}
 else response=await fetcher('https://api.openai.com/v1/images/generations',{method:'POST',headers:{Authorization:'Bearer '+env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify(settings),signal:AbortSignal.timeout(230000)});
 }catch(e){if(e instanceof AppError)throw e;throw new AppError('La generación tardó demasiado. Revisa el uso en OpenAI antes de reintentar.',504)}
 if(!response.ok)throw new AppError(response.status===429?'Revisa el saldo y límites de OpenAI.':'No se pudo generar el recurso. Revisa el acceso al modelo de imágenes.',502);
 const result=await response.json();if(!result.data?.[0]?.b64_json)throw new AppError('OpenAI no devolvió una imagen.',502);
 const original=Buffer.from(result.data[0].b64_json,'base64');const metadata=await sharp(original).metadata();if(!['cover','gallery'].includes(kind)&&!metadata.hasAlpha)throw new AppError('El recurso no llegó con transparencia. Revisa la generación en OpenAI antes de repetirla.',502);
 const buffer=await sharp(original).rotate().resize({width:1536,height:1536,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toBuffer();const params={folder:'momently-events/ai-cover-drafts/'+uid,public_id:kind+'-'+randomUUID(),timestamp:String(Math.floor(Date.now()/1000))};const signature=createHash('sha1').update(Object.keys(params).sort().map(k=>k+'='+params[k]).join('&')+secret).digest('hex');const form=new FormData();form.set('file',new Blob([buffer],{type:'image/webp'}),kind+'.webp');for(const[k,v]of Object.entries(params))form.set(k,v);form.set('api_key',key);form.set('signature',signature);
 let upload;try{upload=await fetcher('https://api.cloudinary.com/v1_1/'+cloud+'/image/upload',{method:'POST',body:form,signal:AbortSignal.timeout(25000)})}catch{throw new AppError('El recurso se generó pero no pudo guardarse. Revisa Cloudinary antes de generar otro.',502)}const asset=await upload.json();if(!upload.ok||!asset.secure_url?.startsWith('https://res.cloudinary.com/'+cloud+'/image/upload/'))throw new AppError('El recurso se generó pero no pudo guardarse. Revisa Cloudinary antes de generar otro.',502);
 return{url:asset.secure_url,kind,promptUsed,model:settings.model,usage:result.usage||null,cost:imageUsageCost(settings.model,result.usage,env.AI_USD_TO_MXN)};
}
