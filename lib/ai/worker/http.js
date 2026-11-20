import 'server-only';
import {requireAdmin} from '../../auth/session.js';
import {assertSameOrigin} from '../../security/same-origin.js';
import {ValidationError} from '../../errors.js';
import {authenticateWorkerBearer} from './auth.js';
export async function workerActor(request,{write=false}={}){
 if(request.headers.has('authorization'))return authenticateWorkerBearer(request.headers.get('authorization'));
 if(write)assertSameOrigin(request);
 return requireAdmin();
}
export async function workerJson(request,max=100000){const raw=await request.text();if(Buffer.byteLength(raw)>max)throw new ValidationError('La solicitud es demasiado grande.');try{return JSON.parse(raw)}catch{throw new ValidationError('JSON inválido.')}}
export const privateHeaders={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'};
