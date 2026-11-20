import {workerActor,workerJson,privateHeaders} from '@/lib/ai/worker/http';
import {createWorkerJob,workerResult} from '@/lib/ai/worker/jobs';
import {enforceRsvpRateLimit} from '@/lib/security/rate-limit';
import {apiError} from '@/lib/errors';
export const runtime='nodejs';
export async function POST(request){try{
 const actor=await workerActor(request,{write:true});await enforceRsvpRateLimit(request,'ai-worker-create:'+actor.uid);
 const job=await createWorkerJob(await workerJson(request),actor,request.headers.get('idempotency-key'));
 return Response.json(workerResult(job,new URL(request.url).origin),{status:job.status==='completed'?200:202,headers:privateHeaders});
}catch(error){return apiError(error)}}
