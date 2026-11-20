import 'server-only';
import {randomUUID} from 'node:crypto';
import {FieldValue,Timestamp} from 'firebase-admin/firestore';
import {getAdminDb} from '../../firebase/admin.js';
import {AppError,ConflictError,ForbiddenError,NotFoundError,ValidationError} from '../../errors.js';
import {parseWorkerInput} from './schema.js';
import {jobIdentity,inputFingerprint,assertSameJob,prepareWorkerCandidate,workerResult} from './policy.js';
import {planWorkerInvitation} from './plan.js';
import {generateArtwork} from '../artwork-provider.js';
import {generateInvitationDesign} from '../design-provider.js';
import {availableV2Slug} from '../v2-slug-server.js';
import {saveAiInvitation} from '../publishing-server.js';
import {aiPublishSchema,buildAiEvent} from '../publishing.js';
import {galleryModelReferences,generatedGalleryImage} from '../gallery.js';
import {workerEnvelopeLayout} from './envelope.js';
const defaultLimit=async(...args)=>(await import('../../security/rate-limit.js')).enforceRsvpRateLimit(...args);
const collection='aiInvitationJobs';
export async function ownedWorkerJob(id,actor,{db=getAdminDb()}={}){
 if(!/^[a-f0-9]{64}$/.test(id||''))throw new NotFoundError();
 const ref=db.collection(collection).doc(id),snap=await ref.get();if(!snap.exists)throw new NotFoundError();
 const job={id:snap.id,...snap.data()};if(job.actorUid!==actor.uid&&actor.admin!==true)throw new ForbiddenError();return {ref,job};
}
export async function createWorkerJob(raw,actor,key,{db=getAdminDb()}={}){
 let input;try{input=parseWorkerInput(raw)}catch(e){throw new ValidationError(e.issues?.[0]?.message||'Revisa la solicitud.');}
 const id=jobIdentity(actor.uid,key),fingerprint=inputFingerprint(input),ref=db.collection(collection).doc(id);
 const cached=await ref.get();if(cached.exists){assertSameJob(cached.data(),fingerprint);return {id,...cached.data()};}
 let current=null,revision=null,targetStatus=null;
 const targetEventId=input.eventId||db.collection('events').doc().id;
 if(input.eventId){const snap=await db.collection('events').doc(input.eventId).get();if(!snap.exists)throw new NotFoundError();const event=snap.data();if(event.templateKey!=='ai-designed')throw new ValidationError('La API edita invitaciones creadas con IA V1/V2; no modifica plantillas estáticas.');if(event.status==='archived')throw new ValidationError('Reactiva la invitación antes de editarla.');current={...event.publicData.aiDesign,prompt:event.aiEditor?.prompt||'',imagePrompt:event.aiEditor?.imagePrompt||''};revision=snap.updateTime.toMillis();targetStatus=event.status;}
 const job={actorUid:actor.uid,input,fingerprint,targetEventId,current,revision,targetStatus,status:'queued',steps:['plan'],stepIndex:0,consumption:[],warnings:[],createdAt:Timestamp.now(),updatedAt:Timestamp.now()};
 await db.runTransaction(async tx=>{const existing=await tx.get(ref);if(existing.exists){assertSameJob(existing.data(),fingerprint);return;}tx.create(ref,job);});
 const saved=await ref.get();return {id,...saved.data()};
}
function consumption(kind,result){return {kind,model:result.model||null,cost:result.cost||null,usage:result.usage||null};}
async function publishJobEvent(job,guard,db){
 const ref=db.collection('events').doc(job.targetEventId),audit=db.collection('auditLogs').doc();
 await db.runTransaction(async tx=>{
  const [snap,jobSnap]=await Promise.all([tx.get(ref),tx.get(guard.ref)]);
  if(jobSnap.data()?.status!=='running'||jobSnap.data()?.lease!==guard.lease)throw new ConflictError('La tarea se canceló.');
  if(!snap.exists||snap.data().aiEditor?.lastWorkerJobId!==job.id||inputFingerprint(snap.data().publicData.aiDesign)!==inputFingerprint(buildAiEvent(aiPublishSchema.parse(job.candidate),job.actorUid).publicData.aiDesign))throw new ConflictError('La invitación cambió antes de publicar.');
  if(snap.data().status==='archived')throw new ConflictError('La invitación está archivada.');
  if(snap.data().status==='published')return;
  const now=FieldValue.serverTimestamp();tx.update(ref,{status:'published',publishedAt:now,updatedAt:now});tx.create(audit,{actorUid:job.actorUid,eventId:ref.id,action:'ai-worker.published',createdAt:now,metadata:{jobId:job.id}});
 });
}
export async function advanceWorkerJob(id,actor,{retry=false,request,db=getAdminDb(),plan=planWorkerInvitation,artwork=generateArtwork,design=generateInvitationDesign,availableSlug=availableV2Slug,layout=workerEnvelopeLayout,save=saveAiInvitation,limit=defaultLimit}={}){
 const owned=await ownedWorkerJob(id,actor,{db});const ref=owned.ref,lease=randomUUID();
 const job=await db.runTransaction(async tx=>{
  const snap=await tx.get(ref),value=snap.data();
  if(value.status==='completed'||value.status==='cancelled')return null;
  if(value.status==='running'){
   if(value.leaseUntil?.toMillis()>Date.now())throw new ConflictError('La etapa sigue ejecutándose; consulta el estado antes de reintentar.');
   if(!retry){tx.update(ref,{status:'failed',error:'La ejecución anterior terminó sin confirmar. Revisa el consumo antes de reintentar.',updatedAt:Timestamp.now()});return null;}
  }
  if(value.status==='failed'&&!retry)return null;
  tx.update(ref,{status:'running',lease,leaseUntil:Timestamp.fromMillis(Date.now()+360000),error:null,updatedAt:Timestamp.now()});return {id,...value};
 });
 if(!job)return (await ownedWorkerJob(id,actor,{db})).job;
 const step=job.steps[job.stepIndex];let patch={};
 try{
  if(['plan','design'].includes(step))await limit(request,'ai-cover:'+job.actorUid);
  else if(step.startsWith('image:')||step.startsWith('gallery:'))await limit(request,'ai-cover-image:'+job.actorUid);
  if(step==='plan'){
   const output=await plan(job.input,job.current);
   const slug=job.current?.slug||await availableSlug(job.input.changes.slug||output.plan.slug);
   const prepared=prepareWorkerCandidate(job.input,job.current,output,slug);if(!job.current)prepared.candidate.slug=slug;
   patch={...prepared,steps:['plan',...prepared.steps],consumption:[...job.consumption,consumption('plan',output)]};
  }else if(step.startsWith('image:')){
   const kind=step.slice(6),candidate={...job.candidate,artwork:{...job.candidate.artwork}};
   const referenceUrl=kind==='envelope-open'?candidate.artwork['envelope-closed']:kind==='envelope-closed'?candidate.imageUrl:kind==='floral'?(candidate.artwork['envelope-closed']||candidate.imageUrl):'';
   const result=await artwork({kind,prompt:candidate.imagePrompt,referenceUrl:referenceUrl||''},job.actorUid);
   if(kind==='cover'){candidate.imageUrl=result.url;candidate.coverImageSource='generated'}else{candidate.artwork[kind]=result.url;if(kind==='floral')candidate.showFloral=true;}
   patch={candidate,consumption:[...job.consumption,consumption(kind,result)]};
  }else if(step.startsWith('gallery:')){
   const image=job.galleryImages[Number(step.slice(8))],result=await artwork({kind:'gallery',prompt:image.prompt},job.actorUid);
   patch={candidate:{...job.candidate,gallery:[...job.candidate.gallery,generatedGalleryImage(result.url,image.name,image.prompt,job.candidate.gallery)]},consumption:[...job.consumption,consumption('gallery',result)]};
  }else if(step==='layout'){
   let measured=null;try{measured=await layout(job.candidate.artwork['envelope-closed'],job.candidate.artwork['envelope-open'])}catch{/* Keep the editor's bounded default layout. */}
   patch={candidate:{...job.candidate,envelopeLayout:measured||job.candidate.envelopeLayout},warnings:[...job.warnings,...(!measured?['Revisa la alineación del sobre en la vista previa; no se pudo calibrar automáticamente.']:[])]};
  }else if(step==='design'){
   const c=job.candidate;
   const confirmed=Object.fromEntries(Object.entries(job.input.changes).filter(([key])=>['name1','name2','occasion','dateLabel','eventDate','features'].includes(key)));
   const designPrompt=job.input.prompt+(Object.keys(confirmed).length?'\nAJUSTES EXPLÍCITOS CONFIRMADOS (tienen prioridad sobre datos anteriores): '+JSON.stringify(confirmed):'');
   const result=await design({prompt:designPrompt,name1:c.name1,name2:c.name2,occasion:c.occasion,dateLabel:c.dateLabel,imageUrl:c.imageUrl,coverImageSource:c.coverImageSource,gallery:galleryModelReferences(c.gallery),videos:c.videos.map(({id,fileName,title})=>({id,fileName,title})),hasFloral:Boolean(c.showFloral&&c.artwork.floral),eventDate:c.eventDate,managedFeatures:c.features,referenceImageUrls:job.input.referenceImageUrls,...(job.input.referenceEventId?{referenceEventId:job.input.referenceEventId}:{}),previous:job.current?.cover||null});
   const next={...c,cover:result.cover,features:{...c.features,rsvpTitle:result.cover.rsvpTitle||c.features.rsvpTitle}};
   if(result.cover.event){for(const k of ['name1','name2','occasion','dateLabel'])if(!Object.hasOwn(job.input.changes,k)&&result.cover.event[k])next[k]=result.cover.event[k];}
   aiPublishSchema.parse(next);
   patch={candidate:next,warnings:[...job.warnings,...result.cover.warnings],consumption:[...job.consumption,consumption('design',result)]};
  }else if(step==='save'){
   if(job.input.eventId&&job.targetStatus==='published'&&!job.input.publish){patch={applied:false,event:{id:job.targetEventId,slug:job.candidate.slug,status:'draft'},warnings:[...job.warnings,'Cambios preparados como vista previa privada. La invitación publicada no fue modificada. Envía publish:true en una nueva solicitud para aplicar cambios.']};}
   else{
    const guard={ref,lease};let candidate=job.candidate,event;
    const recovered=await db.collection('events').doc(job.targetEventId).get();if(recovered.exists&&recovered.data().aiEditor?.lastWorkerJobId===job.id)candidate={...candidate,slug:recovered.data().slug};
    for(let attempt=0;attempt<3;attempt++){
     try{event=await save({...candidate,...(job.input.eventId?{eventId:job.targetEventId}:{})},job.actorUid,{db,newEventId:job.targetEventId,expectedRevision:job.input.eventId?job.revision:undefined,operationId:job.id,guard});break}
     catch(e){if(e.status!==409||job.input.eventId||attempt===2)throw e;const target=await db.collection('events').doc(job.targetEventId).get();if(target.exists)throw e;candidate={...candidate,slug:await availableSlug(candidate.slug)};}
    }
    if(job.input.publish){await publishJobEvent({...job,candidate},guard,db);event={...event,status:'published'};}
    patch={candidate,event,applied:true};
   }
  }else throw new ValidationError('Etapa desconocida.');
  await db.runTransaction(async tx=>{const snap=await tx.get(ref);if(snap.data().status==='cancelled'||snap.data().lease!==lease)return;const index=job.stepIndex+1;tx.update(ref,{...patch,stepIndex:index,status:index>=(patch.steps||job.steps).length?'completed':'queued',leaseUntil:Timestamp.fromMillis(0),updatedAt:Timestamp.now()});});
 }catch(error){
  await db.runTransaction(async tx=>{const snap=await tx.get(ref);if(snap.data().status==='cancelled'||snap.data().lease!==lease)return;tx.update(ref,{status:'failed',error:error instanceof AppError?error.message:'No se pudo completar la etapa. Revisa los datos y el consumo antes de reintentar.',errorCode:error.code||'generation_failed',leaseUntil:Timestamp.fromMillis(0),updatedAt:Timestamp.now()});});
 }
 return (await ownedWorkerJob(id,actor,{db})).job;
}
export async function cancelWorkerJob(id,actor,{db=getAdminDb()}={}){const {ref}=await ownedWorkerJob(id,actor,{db});await db.runTransaction(async tx=>{const snap=await tx.get(ref);if(snap.data().status==='completed')throw new ConflictError('La tarea ya terminó.');tx.update(ref,{status:'cancelled',updatedAt:Timestamp.now()});});return (await ownedWorkerJob(id,actor,{db})).job;}
export {workerResult};

// Approve the already generated design without spending on another generation.
export async function approveWorkerJob(id,actor,options={}){
 const db=options.db||getAdminDb(),{ref}=await ownedWorkerJob(id,actor,{db});
 await db.runTransaction(async tx=>{
  const snap=await tx.get(ref),job=snap.data();
  if(job.status!=='completed'||!job.candidate?.cover)throw new ConflictError('Termina el diseño antes de publicar.');
  if(job.applied&&job.event?.status==='published')return;
  if(job.applied){
   const target=await tx.get(db.collection('events').doc(job.targetEventId));
   if(!target.exists||target.data().status==='archived'||target.data().aiEditor?.lastWorkerJobId!==id||inputFingerprint(target.data().publicData.aiDesign)!==inputFingerprint(buildAiEvent(aiPublishSchema.parse(job.candidate),job.actorUid).publicData.aiDesign))throw new ConflictError('El borrador cambió después de la vista previa. Revisa la invitación antes de publicar.');
  }
  tx.update(ref,{status:'queued',input:{...job.input,publish:true},warnings:job.warnings.filter(value=>!value.startsWith('Cambios preparados como vista previa privada.')),stepIndex:job.steps.length-1,updatedAt:Timestamp.now()});
 });
 return advanceWorkerJob(id,actor,{...options,db});
}
