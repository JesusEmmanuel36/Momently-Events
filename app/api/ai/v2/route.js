import {z} from 'zod';
import {workerInputSchema} from '@/lib/ai/worker/schema';
import {workerActor,privateHeaders} from '@/lib/ai/worker/http';
import {apiError} from '@/lib/errors';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(request){try{await workerActor(request);return Response.json({version:'2',capabilities:['create','edit-ai-invitations','generate-themed-cover-envelopes-floral','generate-gallery-images','upload-images-audio-video','native-rsvp-passes-guest-photos','private-preview','explicit-publish'],create:{method:'POST',path:'/api/ai/v2/jobs',requiredHeaders:['Authorization: Bearer YOUR_WORKER_KEY','Idempotency-Key: UNIQUE_STABLE_REQUEST_ID'],schema:z.toJSONSchema(workerInputSchema)},execute:{method:'POST',path:'/api/ai/v2/jobs/{jobId}/run',body:{}},status:{method:'GET',path:'/api/ai/v2/jobs/{jobId}'},upload:{method:'POST',path:'/api/ai/v2/uploads',body:{kind:'images|audio|video'}},note:'Persistente por etapas. Ejecuta run hasta status completed. Fallos requieren retry explícito; publicar requiere publish:true.'},{headers:privateHeaders})}catch(error){return apiError(error)}}
