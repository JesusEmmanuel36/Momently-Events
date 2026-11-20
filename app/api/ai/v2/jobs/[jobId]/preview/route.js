import {workerActor,privateHeaders} from '@/lib/ai/worker/http';
import {ownedWorkerJob} from '@/lib/ai/worker/jobs';
import {coverDocument} from '@/lib/ai/cover-code';
import {apiError,ConflictError} from '@/lib/errors';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(request,{params}){try{const actor=await workerActor(request),{jobId}=await params,{job}=await ownedWorkerJob(jobId,actor),c=job.candidate;if(!c?.cover)throw new ConflictError('La vista previa aún no está lista.');return new Response(coverDocument(c.cover,c.imageUrl,new URL(request.url).origin,{fullInvitation:true,floral:c.showFloral?c.artwork.floral:'',gallery:c.gallery,videos:c.videos,featurePreview:c.features}),{headers:{...privateHeaders,'Content-Type':'text/html; charset=utf-8','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'no-referrer'}})}catch(error){return apiError(error)}}
