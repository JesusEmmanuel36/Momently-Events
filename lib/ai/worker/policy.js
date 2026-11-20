import {createHash} from 'node:crypto';
import {normalizeAiFeatures} from '../feature-settings.js';
import {normalizeAiGallery} from '../gallery.js';
import {normalizeSlug} from '../../wedding/slug.js';
import {ValidationError,ConflictError} from '../../errors.js';
export function jobIdentity(actorUid,key){if(!/^[a-zA-Z0-9_.:-]{12,128}$/.test(key||''))throw new ValidationError('Envía Idempotency-Key (12–128 caracteres).');return createHash('sha256').update(actorUid+'\0'+key).digest('hex')}
function canonical(value){if(Array.isArray(value))return value.map(canonical);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,canonical(value[key])]));return value;}
export const inputFingerprint=input=>createHash('sha256').update(JSON.stringify(canonical(input))).digest('hex');
export function assertSameJob(existing,fingerprint){if(existing.fingerprint!==fingerprint)throw new ConflictError('La clave de idempotencia ya se usó para otra solicitud.');}
export function prepareWorkerCandidate(input,current,output,slug){
 const {plan}=output,editing=Boolean(current);
 const candidate={...(current||{}),...Object.fromEntries(['name1','name2','occasion','dateLabel','eventDate'].map(k=>[k,editing?(plan[k]||current[k]||''):(plan[k]||'')])),slug:current?.slug||normalizeSlug(input.changes.slug||slug||plan.slug),imagePrompt:input.changes.imagePrompt||plan.artworkPrompt,prompt:input.prompt,
  imageUrl:current?.imageUrl||'',coverImageSource:current?.coverImageSource||'unknown',musicUrl:current?.musicUrl||'',musicName:current?.musicName||'',gallery:current?.gallery||[],videos:current?.videos||[],artwork:{...current?.artwork},showFloral:current?.showFloral!==false,envelopeLayout:current?.envelopeLayout||{openWidth:101,openBottom:4}};
 Object.assign(candidate,input.changes,{artwork:{...candidate.artwork,...input.changes.artwork}});
 if(Object.hasOwn(input.changes,'imageUrl')&&!Object.hasOwn(input.changes,'coverImageSource'))candidate.coverImageSource=input.changes.imageUrl?'uploaded':'unknown';
 candidate.features=normalizeAiFeatures({...(!editing?plan.features:current.features),...Object.fromEntries(Object.entries(output.featureChanges).filter(([,v])=>v!==null)),...input.changes.features});
 candidate.gallery=normalizeAiGallery(candidate.gallery);
 if(editing&&input.changes.slug&&normalizeSlug(input.changes.slug)!==current.slug)throw new ValidationError('No se puede cambiar el slug de una invitación existente; protege pases y QR.');
 if(candidate.features.photos&&candidate.features.photoOpening!=='now'&&!candidate.eventDate)throw new ValidationError('Para programar el QR se necesita fecha, o photoOpening: now.');
 const regen={...output.regenerate,...input.regenerate};
 const resources=editing?{cover:false,envelopes:false,floral:false}:{...plan.resources};
 for(const key of ['cover','envelopes','floral'])if(input.regenerate?.[key]===false)resources[key]=false;
 const remove=output.remove||{};
 if(remove.cover){candidate.imageUrl='';candidate.coverImageSource='unknown';resources.cover=false;regen.cover=false;}
 if(remove.envelopes){candidate.artwork['envelope-closed']='';candidate.artwork['envelope-open']='';resources.envelopes=false;regen.envelopes=false;}
 if(remove.floral){candidate.artwork.floral='';candidate.showFloral=false;resources.floral=false;regen.floral=false;}
 const steps=[];
 if(regen.cover||(resources.cover&&!candidate.imageUrl))steps.push('image:cover');
 if(regen.envelopes){steps.push('image:envelope-closed','image:envelope-open');}
 else if(resources.envelopes){if(!candidate.artwork['envelope-closed'])steps.push('image:envelope-closed');if(!candidate.artwork['envelope-open'])steps.push('image:envelope-open');}
 if(regen.floral||(resources.floral&&!candidate.artwork.floral))steps.push('image:floral');
 const galleryImages=input.galleryImages||output.galleryImages;
 if(candidate.gallery.length+galleryImages.length>40)throw new ValidationError('La galería admite hasta 40 imágenes.');
 galleryImages.forEach((_,i)=>steps.push('gallery:'+i));
 if(steps.some(step=>step.includes('envelope-'))||(candidate.artwork['envelope-closed']&&candidate.artwork['envelope-open']))steps.push('layout');
 steps.push('design','save');
 return {candidate,steps,galleryImages,warnings:plan.warnings||[]};
}
export function workerResult(job,baseUrl){
 const base=baseUrl.replace(/\/$/,''),candidate=job.candidate||{},event=job.event;
 const complete=job.status==='completed';
 return {jobId:job.id,status:job.status,step:job.steps?.[job.stepIndex]||null,progress:{completed:job.stepIndex||0,total:job.steps?.length||1},eventId:event?.id||job.targetEventId||null,slug:candidate.slug||null,published:complete&&job.applied===true&&event?.status==='published',applied:complete&&job.applied===true,
  invitationUrl:complete&&job.applied===true&&candidate.slug?`${base}/eventos/${candidate.slug}`:null,
  previewUrl:`${base}/admin/ai-jobs/${job.id}`,previewHtmlUrl:`${base}/api/ai/v2/jobs/${job.id}/preview`,
  editUrl:complete&&event?.id&&job.applied?`${base}/admin/crear-con-ia-v2?eventId=${event.id}`:null,
  runUrl:`${base}/api/ai/v2/jobs/${job.id}/run`,warnings:job.warnings||[],error:job.error||null,
  resources:{cover:candidate.imageUrl||null,artwork:candidate.artwork||{},gallery:candidate.gallery||[],music:candidate.musicUrl||null},
  consumption:job.consumption||[],estimatedCost:{usd:(job.consumption||[]).reduce((s,x)=>s+(x.cost?.usd||0),0),mxn:(job.consumption||[]).reduce((s,x)=>s+(x.cost?.mxn||0),0),incomplete:['failed','cancelled'].includes(job.status)||(job.consumption||[]).some(x=>!x.cost)},
 };
}
