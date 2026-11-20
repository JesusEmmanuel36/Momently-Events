import {createHash} from 'node:crypto';
import {workerActor,workerJson,privateHeaders} from '@/lib/ai/worker/http';
import {enforceRsvpRateLimit} from '@/lib/security/rate-limit';
import {apiError,ValidationError,AppError} from '@/lib/errors';
export const runtime='nodejs';
export async function POST(request){try{
 const actor=await workerActor(request,{write:true}),body=await workerJson(request,1000);
 if(!body||typeof body!=='object'||Array.isArray(body))throw new ValidationError();
 if(!['images','audio','video'].includes(body.kind)||Object.keys(body).some(k=>k!=='kind'))throw new ValidationError('kind debe ser images, audio o video.');
 await enforceRsvpRateLimit(request,'ai-worker-upload:'+actor.uid);
 const {CLOUDINARY_CLOUD_NAME:cloud,CLOUDINARY_API_KEY:key,CLOUDINARY_API_SECRET:secret}=process.env;if(!cloud||!key||!secret)throw new AppError('Cloudinary no está configurado.',503);
 const folder=`momently-events/worker-drafts/${actor.uid}/${body.kind}`,timestamp=Math.floor(Date.now()/1000),signature=createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest('hex');
 return Response.json({uploadUrl:`https://api.cloudinary.com/v1_1/${cloud}/${body.kind==='images'?'image':'video'}/upload`,apiKey:key,folder,timestamp,signature,maxBytes:body.kind==='images'?15000000:body.kind==='audio'?25000000:150000000,instructions:'Envía file, api_key, folder, timestamp y signature como multipart/form-data. Usa secure_url como recurso en changes.'},{headers:privateHeaders});
}catch(error){return apiError(error)}}
