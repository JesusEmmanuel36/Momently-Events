import {requireAdmin} from '@/lib/auth/session';
import {assertSameOrigin} from '@/lib/security/same-origin';
import {apiError,ValidationError} from '@/lib/errors';
import {saveAiInvitation} from '@/lib/ai/publishing-server';
export const runtime='nodejs';
export async function POST(request){try{
 assertSameOrigin(request);const admin=await requireAdmin();const raw=await request.text();if(Buffer.byteLength(raw)>650000)throw new ValidationError('El diseño es demasiado grande.');
 let input;try{input=JSON.parse(raw)}catch{throw new ValidationError('Solicitud inválida.')}
 return Response.json(await saveAiInvitation(input,admin.uid),{headers:{'Cache-Control':'no-store'}});
}catch(error){return apiError(error)}}
