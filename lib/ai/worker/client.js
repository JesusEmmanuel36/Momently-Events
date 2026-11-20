// Server-side client. Never ship the worker token in a browser bundle.
import {mpegPlaybackUrl} from '../../cloudinary/media-upload.js';
export function createInvitationWorker({baseUrl,token,fetcher=fetch,onProgress=()=>{},wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))}){
 const base=new URL(baseUrl);if(base.protocol!=='https:'&&!(base.protocol==='http:'&&['localhost','127.0.0.1'].includes(base.hostname)))throw Error('Usa HTTPS o localhost.');
 if(base.username||base.password||base.search||base.hash)throw Error('URL base inválida.');
 const root=base.origin;
 async function call(path,{method='GET',body,key}={}){
  const response=await fetcher(root+path,{method,headers:{Authorization:'Bearer '+token,...(body!==undefined?{'Content-Type':'application/json'}:{}),...(key?{'Idempotency-Key':key}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{}),redirect:'error',signal:AbortSignal.timeout(330000)});
  const data=await response.json();if(!response.ok){const error=Error(data.error||'La API rechazó la solicitud.');error.status=response.status;throw error;}return data;
 }
 async function resume(jobId,{retry=false}={}){
  let job=await call('/api/ai/v2/jobs/'+encodeURIComponent(jobId));let retried=false;
  for(let iterations=0;iterations<100;iterations++){
   onProgress(job);
   if(job.status==='completed')return job;
   if(job.status==='cancelled'||(job.status==='failed'&&(!retry||retried))){const error=Error(job.error||'La tarea se detuvo.');error.job=job;throw error;}
   try{const runRetry=job.status==='failed'&&retry&&!retried;job=await call('/api/ai/v2/jobs/'+jobId+'/run',{method:'POST',body:{retry:runRetry}});if(runRetry)retried=true;}
   catch(error){if(error.status!==409)throw error;await wait(10000);job=await call('/api/ai/v2/jobs/'+jobId);}
  }
  throw Error('La tarea sigue pendiente. Consulta su estado y continúa con el mismo jobId.');
 }
 return {
  create:async(input,{idempotencyKey})=>{const job=await call('/api/ai/v2/jobs',{method:'POST',body:input,key:idempotencyKey});return resume(job.jobId)},
  resume,
  publish:jobId=>call('/api/ai/v2/jobs/'+encodeURIComponent(jobId)+'/publish',{method:'POST'}),
  status:jobId=>call('/api/ai/v2/jobs/'+encodeURIComponent(jobId)),
  cancel:jobId=>call('/api/ai/v2/jobs/'+encodeURIComponent(jobId)+'/cancel',{method:'POST'}),
  invitation:eventId=>call('/api/ai/v2/invitations/'+encodeURIComponent(eventId)),
  upload:async({bytes,fileName,kind})=>{
   const settings=await call('/api/ai/v2/uploads',{method:'POST',body:{kind}});
   if(bytes.byteLength>settings.maxBytes)throw Error('El archivo supera el límite de carga.');
   const target=new URL(settings.uploadUrl);if(target.protocol!=='https:'||target.hostname!=='api.cloudinary.com')throw Error('Destino de carga inválido.');
   const form=new FormData();form.set('file',new Blob([bytes]),fileName);for(const [key,value]of Object.entries({api_key:settings.apiKey,folder:settings.folder,timestamp:settings.timestamp,signature:settings.signature}))form.set(key,String(value));
   const response=await fetcher(target,{method:'POST',body:form,redirect:'error',signal:AbortSignal.timeout(120000)}),result=await response.json();if(!response.ok||!/^https:\/\/res\.cloudinary\.com\/[\w-]+\/(image|video)\/upload\//.test(result.secure_url||''))throw Error('No se pudo subir el archivo.');
   return {url:mpegPlaybackUrl(result.secure_url,{name:fileName},kind),fileName,source:'uploaded'};
  },
 };
}
