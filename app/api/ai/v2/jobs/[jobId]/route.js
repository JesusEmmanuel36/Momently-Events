import {workerActor,privateHeaders} from '@/lib/ai/worker/http';
import {ownedWorkerJob,workerResult} from '@/lib/ai/worker/jobs';
import {apiError} from '@/lib/errors';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(request,{params}){try{const actor=await workerActor(request),{jobId}=await params,{job}=await ownedWorkerJob(jobId,actor);return Response.json(workerResult(job,new URL(request.url).origin),{headers:privateHeaders})}catch(error){return apiError(error)}}
