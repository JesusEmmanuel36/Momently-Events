import {requireAdmin} from '@/lib/auth/session';
import {assertSameOrigin} from '@/lib/security/same-origin';
import {enforceRsvpRateLimit} from '@/lib/security/rate-limit';
import {ValidationError,apiError} from '@/lib/errors';
import {coverInputSchema} from '@/lib/ai/cover-code';
import {generateInvitationDesign} from '@/lib/ai/design-provider';
export const runtime='nodejs';export const maxDuration=300;
export async function POST(request){try{
 assertSameOrigin(request);const admin=await requireAdmin();const raw=await request.text();if(raw.length>450000)throw new ValidationError('La petición es demasiado larga.');
 let input;try{input=coverInputSchema.parse(JSON.parse(raw))}catch{throw new ValidationError('Revisa el prompt y los datos de la invitación.')}
 await enforceRsvpRateLimit(request,'ai-cover:'+admin.uid);
 return Response.json(await generateInvitationDesign(input),{headers:{'Cache-Control':'no-store'}});
}catch(error){return apiError(error)}}
