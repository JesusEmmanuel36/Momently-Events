import {createHash,timingSafeEqual} from 'node:crypto';
import {UnauthorizedError,AppError} from '../../errors.js';
export function authenticateWorkerBearer(header,env=process.env){
 const expected=env.MOMENTLY_WORKER_API_KEY;
 if(!expected||expected.length<32)throw new AppError('La API del trabajador no está configurada.',503);
 const match=/^Bearer ([^\s]{32,512})$/.exec(header||'');
 const digest=value=>createHash('sha256').update(value).digest();
 if(!match||!timingSafeEqual(digest(match[1]),digest(expected)))throw new UnauthorizedError('Credencial del trabajador inválida.');
 return {uid:'ai-worker-'+digest(expected).toString('hex').slice(0,16),worker:true};
}
