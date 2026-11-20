import test from 'node:test';
import assert from 'node:assert/strict';
import {authenticateWorkerBearer} from '../lib/ai/worker/auth.js';
import {parseWorkerInput} from '../lib/ai/worker/schema.js';
import {prepareWorkerCandidate,workerResult} from '../lib/ai/worker/policy.js';
import {createWorkerJob,advanceWorkerJob,cancelWorkerJob,ownedWorkerJob,approveWorkerJob} from '../lib/ai/worker/jobs.js';
import {saveAiInvitation} from '../lib/ai/publishing-server.js';
import {artworkPrompt} from '../lib/ai/artwork-prompts.js';
const actor={uid:'worker-test',worker:true};
const basePlan={name1:'Ana',name2:'Luis',occasion:'Nuestra boda',dateLabel:'28 de noviembre de 2026',eventDate:'2026-11-28',slug:'ana-y-luis',artworkPrompt:'Mariposas moradas y hojas lila',confirmation:'rsvp',resources:{cover:true,envelopes:true,floral:true},features:{rsvp:true,passes:false,photos:false,askAgeCounts:false,askCompanions:false,askMessage:true,askSongSuggestion:false,showInitials:true},warnings:[]};
const planOutput={plan:basePlan,regenerate:{cover:false,envelopes:false,floral:false},remove:{cover:false,envelopes:false,floral:false},galleryImages:[],featureChanges:{},model:'mock',cost:{usd:0.01,mxn:0.19}};
const cover={summary:'Boda',html:'<main><h1>Ana y Luis</h1></main>',css:'main{color:#123456}',warnings:[],event:{name1:'Ana',name2:'Luis',occasion:'Nuestra boda',dateLabel:basePlan.dateLabel}};
const url=kind=>`https://res.cloudinary.com/test/image/upload/${kind}.webp`;
function fixture(){
 const store=new Map(),versions=new Map();let count=0,revision=0,queue=Promise.resolve();
 const ref=path=>({path,id:path.split('/').at(-1),get:async()=>snapshot(path)});
 const snapshot=path=>({exists:store.has(path),id:path.split('/').at(-1),updateTime:{toMillis:()=>versions.get(path)||0},data:()=>store.get(path)});
 function write(path,value){store.set(path,value);versions.set(path,++revision)}
 const db={collection:path=>({doc:id=>ref(path+'/'+(id||'generated-'+(++count))),add:async value=>{write(path+'/'+(++count),value)}}),runTransaction:fn=>{const run=queue.then(async()=>{const writes=[];const result=await fn({get:async r=>snapshot(r.path),create:(r,value)=>{assert.ok(!store.has(r.path));writes.push(()=>write(r.path,value))},update:(r,value)=>{assert.ok(store.has(r.path));writes.push(()=>write(r.path,{...store.get(r.path),...value}))}});writes.forEach(w=>w());return result});queue=run.catch(()=>{});return run}};
 const calls=[];
 const deps={db,request:new Request('https://example.test/api'),limit:async()=>{},availableSlug:async slug=>slug,plan:async()=>planOutput,layout:async()=>({openWidth:105,openBottom:3}),artwork:async({kind})=>{calls.push(kind);return {url:url(kind),model:'mock-image',cost:{usd:.1,mxn:1.9}}},design:async()=>{calls.push('design');return {cover,model:'mock',cost:{usd:.01,mxn:.19}}}};
 async function finish(job){for(let i=0;i<20&&!['completed','failed','cancelled'].includes(job.status);i++)job=await advanceWorkerJob(job.id,actor,deps);return job}
 return {store,versions,db,deps,calls,write,finish};
}
test('worker bearer is disabled without a strong secret and rejects invalid authentication',()=>{
 assert.throws(()=>authenticateWorkerBearer('',{}),e=>e.status===503);
 const env={MOMENTLY_WORKER_API_KEY:'x'.repeat(48)};
 assert.throws(()=>authenticateWorkerBearer('Bearer '+'y'.repeat(48),env),e=>e.status===401);
 assert.equal(authenticateWorkerBearer('Bearer '+'x'.repeat(48),env).worker,true);
});
test('strict API input cannot smuggle owners, status, raw code or remote fetch URLs',()=>{
 for(const key of ['ownerUids','accessToken','status','html'])assert.throws(()=>parseWorkerInput({prompt:'Una boda',changes:{[key]:'bad'}}));
 assert.throws(()=>parseWorkerInput({prompt:'Una boda',changes:{imageUrl:'http://localhost/private'}}));
 assert.equal(parseWorkerInput({prompt:'Una boda'}).publish,false);
});
test('idempotency reuses a job and rejects a different payload without another event',async()=>{
 const f=fixture(),input={prompt:'Una boda con mariposas'};
 const first=await createWorkerJob(input,actor,'request-create-001',f);
 assert.equal((await createWorkerJob(input,actor,'request-create-001',f)).id,first.id);
 await assert.rejects(createWorkerJob({prompt:'Otro evento'},actor,'request-create-001',f),e=>e.status===409);
 assert.equal([...f.store.keys()].filter(k=>k.startsWith('events/')).length,0);
 await assert.rejects(ownedWorkerJob(first.id,{uid:'other-worker'},f),e=>e.status===403);
});
test('complete creation checkpoints four themed assets, aligns envelopes and returns an editable draft',async()=>{
 const f=fixture();let job=await createWorkerJob({prompt:'Una boda con mariposas'},actor,'request-create-002',f);job=await f.finish(job);
 assert.equal(job.status,'completed');assert.equal(job.event.status,'draft');assert.equal(job.applied,true);
 assert.deepEqual(f.calls,['cover','envelope-closed','envelope-open','floral','design']);
 const event=f.store.get('events/'+job.event.id);assert.equal(event.templateKey,'ai-designed');assert.equal(event.publicData.aiDesign.coverImageSource,'generated');assert.equal(event.publicData.aiDesign.envelopeLayout.openWidth,105);
 const output=workerResult(job,'https://example.test');assert.equal(output.invitationUrl,'https://example.test/eventos/ana-y-luis');assert.equal(output.published,false);assert.ok(output.editUrl.includes('crear-con-ia-v2'));
 assert.equal((await advanceWorkerJob(job.id,actor,f.deps)).status,'completed');assert.equal(f.calls.length,5);
});
test('publication is explicit and published edits default to staged previews without mutating the live event',async()=>{
 const f=fixture();let job=await f.finish(await createWorkerJob({prompt:'Una boda',publish:true},actor,'request-publish-01',f));
 assert.equal(f.store.get('events/'+job.event.id).status,'published');
 const before=JSON.stringify(f.store.get('events/'+job.event.id));
 const edit=await f.finish(await createWorkerJob({prompt:'Cambia el título de bienvenida',eventId:job.event.id},actor,'request-edit-001',f));
 assert.equal(edit.status,'completed');assert.equal(edit.applied,false);assert.equal(JSON.stringify(f.store.get('events/'+job.event.id)),before);
 assert.equal(workerResult(edit,'https://example.test').invitationUrl,null);
 assert.deepEqual(f.calls.filter(x=>x==='cover'),['cover']);
});
test('prompt changes and explicit regeneration preserve unrequested photo and native settings',()=>{
 const input=parseWorkerInput({prompt:'Cambia solo el texto',eventId:'existing',changes:{features:{askAgeCounts:true}}});
 const current={...basePlan,features:{...basePlan.features,photoOpening:'week-before',rsvpTitle:'¿Vienes?'},imageUrl:url('human'),coverImageSource:'uploaded',artwork:{'envelope-closed':url('closed'),'envelope-open':url('open'),floral:url('floral')},gallery:[]};
 const result=prepareWorkerCandidate(input,current,planOutput,'ignored');assert.equal(result.candidate.imageUrl,url('human'));assert.equal(result.candidate.features.rsvpTitle,'¿Vienes?');assert.equal(result.candidate.features.askAgeCounts,true);assert.equal(result.candidate.features.photoOpening,'week-before');assert.ok(!result.steps.some(s=>s.startsWith('image:')));
 const regen=prepareWorkerCandidate({...input,regenerate:{envelopes:true}},current,planOutput,'ignored');assert.ok(regen.steps.includes('image:envelope-closed'));assert.ok(regen.steps.includes('image:envelope-open'));
});
test('failure does not rerun completed paid steps and retry is explicit',async()=>{
 const f=fixture();let job=await createWorkerJob({prompt:'Una boda'},actor,'request-failure-01',f);
 job=await advanceWorkerJob(job.id,actor,f.deps);job=await advanceWorkerJob(job.id,actor,f.deps);
 let failed=true;const original=f.deps.artwork;f.deps.artwork=async input=>{if(failed){failed=false;throw Error('provider failed')}return original(input)};
 job=await advanceWorkerJob(job.id,actor,f.deps);assert.equal(job.status,'failed');assert.equal(job.candidate.imageUrl,url('cover'));assert.equal(workerResult(job,'https://example.test').estimatedCost.incomplete,true);
 assert.equal((await advanceWorkerJob(job.id,actor,f.deps)).status,'failed');
 job=await advanceWorkerJob(job.id,actor,{...f.deps,retry:true});job=await f.finish(job);assert.equal(job.status,'completed');assert.equal(f.calls.filter(k=>k==='cover').length,1);
});
test('cancel prevents writes and a competing invocation cannot claim a running step',async()=>{
 const f=fixture();let job=await createWorkerJob({prompt:'Una boda'},actor,'request-cancel-001',f);
 await cancelWorkerJob(job.id,actor,f);assert.equal((await advanceWorkerJob(job.id,actor,f.deps)).status,'cancelled');assert.equal(f.calls.length,0);
 job=await createWorkerJob({prompt:'Una boda'},actor,'request-lease-0001',f);
 let release;const gate=new Promise(resolve=>{release=resolve});
 const first=advanceWorkerJob(job.id,actor,{...f.deps,plan:async()=>{await gate;return planOutput}});
 await new Promise(resolve=>setTimeout(resolve,5));await assert.rejects(advanceWorkerJob(job.id,actor,f.deps),e=>e.status===409);release();await first;
});
test('edits detect live changes instead of overwriting them; static event templates are rejected',async()=>{
 const f=fixture();const original=await f.finish(await createWorkerJob({prompt:'Una boda'},actor,'request-original-1',f));
 let edit=await createWorkerJob({prompt:'Cambia título',eventId:original.event.id,publish:true},actor,'request-version-1',f);
 const ref='events/'+original.event.id;f.write(ref,{...f.store.get(ref),updatedAt:'manual edit'});
 edit=await f.finish(edit);assert.equal(edit.status,'failed');assert.match(edit.error,/cambió/);
 f.write('events/static',{templateKey:'classic',status:'published'});
 await assert.rejects(createWorkerJob({prompt:'Cambia texto',eventId:'static'},actor,'request-static-01',f),e=>e.status===400);
});
test('server save recovers an already applied operation without creating a duplicate event',async()=>{
 const f=fixture();const data=prepareWorkerCandidate(parseWorkerInput({prompt:'Una boda'}),null,planOutput,'ana-y-luis').candidate;data.cover=cover;
 const opts={...f,newEventId:'fixed-event',operationId:'op-1'};
 const first=await saveAiInvitation(data,actor.uid,opts);const second=await saveAiInvitation(data,actor.uid,opts);
 assert.equal(first.id,second.id);assert.equal([...f.store.keys()].filter(k=>k.startsWith('events/')).length,1);
});
test('thematic motifs apply to cover, envelopes and floral while respecting clean/no-flower requests',()=>{
 for(const kind of ['cover','envelope-closed','envelope-open','floral']){const prompt=artworkPrompt(kind,'Tema galaxia azul, sin flores',kind==='envelope-open');assert.match(prompt,/recognizable, coherent visual elements/);assert.match(prompt,/Respect explicit requests for no flowers/);assert.match(prompt,/Tema galaxia/)}
});
test('partial input has no hidden feature defaults and invalid event dates are rejected before paid work',()=>{
 assert.deepEqual(parseWorkerInput({prompt:'Un evento',changes:{features:{rsvp:false}}}).changes.features,{rsvp:false});
 assert.throws(()=>parseWorkerInput({prompt:'Un evento',changes:{eventDate:'2026-02-31'}}));
});
test('explicit edits apply without changing issued passes, owners or confirmation deadline',async()=>{
 const f=fixture();const original=await f.finish(await createWorkerJob({prompt:'Una boda',publish:true},actor,'request-preserve1',f));
 const ref='events/'+original.event.id,old=f.store.get(ref);f.write(ref,{...old,ownerUids:['client-owner'],settings:{...old.settings,rsvp:{...old.settings.rsvp,deadline:'original-deadline'}}});f.write(ref+'/guests/pass',{token:'existing-pass'});
 const edit=await f.finish(await createWorkerJob({prompt:'Cambia solo un texto',eventId:original.event.id,publish:true},actor,'request-preserve2',f));
 assert.equal(edit.status,'completed');const updated=f.store.get(ref);assert.equal(updated.status,'published');assert.deepEqual(updated.ownerUids,['client-owner']);assert.equal(updated.settings.rsvp.deadline,'original-deadline');assert.equal(f.store.get(ref+'/guests/pass').token,'existing-pass');
});
test('uploaded cover skips generation; extra generated images get stable names for placement',async()=>{
 const f=fixture();const job=await f.finish(await createWorkerJob({prompt:'Usa mi foto y agrega una iglesia ilustrada llamada iglesia.webp',changes:{imageUrl:url('uploaded'),coverImageSource:'uploaded'},galleryImages:[{name:'iglesia',prompt:'Iglesia en acuarela lila'}]},actor,'request-gallery-1',f));
 assert.equal(job.status,'completed');assert.ok(!f.calls.includes('cover'));assert.ok(f.calls.includes('gallery'));assert.equal(job.candidate.gallery[0].fileName,'iglesia.webp');assert.equal(job.candidate.coverImageSource,'uploaded');
});

test('approve publishes an existing generated draft without new paid stages and is idempotent',async()=>{
 const f=fixture();let job=await f.finish(await createWorkerJob({prompt:'Una boda'},actor,'request-approve-1',f));const count=f.calls.length;
 job=await approveWorkerJob(job.id,actor,f.deps);assert.equal(job.status,'completed');assert.equal(job.event.status,'published');assert.equal(f.calls.length,count);
 assert.equal((await approveWorkerJob(job.id,actor,f.deps)).status,'completed');assert.equal(f.calls.length,count);
});
test('approve applies a staged published edit but refuses a draft changed after its preview',async()=>{
 const f=fixture();let original=await f.finish(await createWorkerJob({prompt:'Una boda',publish:true},actor,'request-stage-001',f));
 let edit=await f.finish(await createWorkerJob({prompt:'Cambia el título',eventId:original.event.id},actor,'request-stage-002',f));const count=f.calls.length;
 edit=await approveWorkerJob(edit.id,actor,f.deps);assert.equal(edit.status,'completed');assert.equal(edit.applied,true);assert.equal(edit.event.status,'published');assert.equal(f.calls.length,count);
 const draft=await f.finish(await createWorkerJob({prompt:'Otro evento',changes:{slug:'otro-evento'}},actor,'request-stage-003',f));
 const ref='events/'+draft.event.id,old=f.store.get(ref);f.write(ref,{...old,aiEditor:{...old.aiEditor,lastWorkerJobId:'manual-change'}});
 await assert.rejects(approveWorkerJob(draft.id,actor,f.deps),e=>e.status===409);
});
