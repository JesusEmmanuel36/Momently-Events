import {workerActor,privateHeaders} from '@/lib/ai/worker/http';
import {advanceWorkerJob,workerResult} from '@/lib/ai/worker/jobs';
import {apiError,ValidationError} from '@/lib/errors';
export const runtime='nodejs';export const maxDuration=300;
export async function POST(request,{params}){try{
 const actor=await workerActor(request,{write:true}),{jobId}=await params;
 const raw=await request.text();let options={};if(raw){if(raw.length>1000)throw new ValidationError();try{options=JSON.parse(raw)}catch{throw new ValidationError('JSON inválido.')}}
 if(!options||Array.isArray(options)||typeof options!=='object')throw new ValidationError('Envía un objeto JSON.');
 if(Object.keys(options).some(k=>k!=='retry')||(options.retry!==undefined&&typeof options.retry!=='boolean'))throw new ValidationError('Solo se admite retry booleano.');
 const job=await advanceWorkerJob(jobId,actor,{retry:options.retry===true,request});
 return Response.json(workerResult(job,new URL(request.url).origin),{headers:privateHeaders});
}catch(error){return apiError(error)}}
