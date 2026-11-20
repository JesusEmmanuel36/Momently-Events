import {workerActor,privateHeaders} from '@/lib/ai/worker/http';
import {approveWorkerJob,workerResult} from '@/lib/ai/worker/jobs';
import {apiError} from '@/lib/errors';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request,{params}){try{const actor=await workerActor(request,{write:true}),{jobId}=await params;return Response.json(workerResult(await approveWorkerJob(jobId,actor,{request}),new URL(request.url).origin),{headers:privateHeaders})}catch(error){return apiError(error)}}
