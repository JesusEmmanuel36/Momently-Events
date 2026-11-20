import {readFile} from 'node:fs/promises';
import {createInvitationWorker} from '../lib/ai/worker/client.js';
const token=process.env.MOMENTLY_WORKER_API_KEY,baseUrl=process.env.MOMENTLY_WORKER_BASE_URL;
if(!token||!baseUrl)throw Error('Configura MOMENTLY_WORKER_API_KEY y MOMENTLY_WORKER_BASE_URL en el entorno del trabajador.');
const worker=createInvitationWorker({baseUrl,token,onProgress:job=>console.error(JSON.stringify({jobId:job.jobId,status:job.status,step:job.step,progress:job.progress}))});
try{
 const [operation,arg]=process.argv.slice(2);let result;
 if(operation==='resume')result=await worker.resume(arg,{retry:process.argv.includes('--retry')});
 else if(operation==='status')result=await worker.status(arg);
 else if(operation==='cancel')result=await worker.cancel(arg);
 else if(operation==='create'){
  if(!arg||!process.env.MOMENTLY_WORKER_REQUEST_ID)throw Error('Uso: create solicitud.json; configura un MOMENTLY_WORKER_REQUEST_ID único y estable.');
  result=await worker.create(JSON.parse(await readFile(arg,'utf8')),{idempotencyKey:process.env.MOMENTLY_WORKER_REQUEST_ID});
 }else throw Error('Uso: create solicitud.json | resume JOB_ID [--retry] | status JOB_ID | cancel JOB_ID');
 console.log(JSON.stringify(result,null,2));
}catch(error){console.error(error.message);if(error.job)console.error(JSON.stringify(error.job,null,2));process.exitCode=1;}
