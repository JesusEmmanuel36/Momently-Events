import test from 'node:test';import assert from 'node:assert/strict';
import {createInvitationWorker} from '../lib/ai/worker/client.js';
import {generateInvitationDesign} from '../lib/ai/design-provider.js';
test('one client call advances asynchronous stages and returns the invitation URL without exposing token in the body',async()=>{
 const requests=[];let stages=0;
 const client=createInvitationWorker({baseUrl:'https://example.test',token:'private-token',fetcher:async(url,args={})=>{requests.push({url,args});assert.equal(args.headers.Authorization,'Bearer private-token');assert.ok(!String(args.body).includes('private-token'));
  if(url.endsWith('/run')){stages++;return Response.json(stages===2?{jobId:'id',status:'completed',invitationUrl:'https://example.test/eventos/ana-y-luis'}:{jobId:'id',status:'queued'})}
  return Response.json({jobId:'id',status:'queued'});
 }});
 const result=await client.create({prompt:'Una boda'},{idempotencyKey:'stable-request-id'});assert.equal(result.invitationUrl,'https://example.test/eventos/ana-y-luis');assert.equal(stages,2);assert.equal(requests[0].args.headers['Idempotency-Key'],'stable-request-id');
});
test('client does not automatically retry failed generations',async()=>{
 let calls=0;const client=createInvitationWorker({baseUrl:'https://example.test',token:'key',fetcher:async()=>{calls++;return Response.json({jobId:'id',status:'failed',error:'Revisa consumo'})}});
 await assert.rejects(client.resume('id'),/Revisa consumo/);assert.equal(calls,1);
});
test('shared design provider preserves WhatsApp and repairs spaces with mocked OpenAI only',async()=>{
 const previous={summary:'Original',html:'<main><h1>Ana</h1><a href="https://wa.me/521234567890">Confirmar</a></main>',css:'main{color:#123}',warnings:[]};
 let requestBody;
 const result=await generateInvitationDesign({prompt:'Agrega una frase bonita',name1:'Ana',name2:'Luis',occasion:'Boda',dateLabel:'',imageUrl:'',previous},{env:{OPENAI_API_KEY:'MOCK',OPENAI_TEXT_MODEL:'gpt-6.1-sol'},fetcher:async(url,args)=>{assert.equal(url,'https://api.openai.com/v1/responses');requestBody=JSON.parse(args.body);return Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({summary:'Nuevo',html:'<main><h1>Reservaeste día</h1></main>',css:'main{color:#123}',warnings:[]})}]}],usage:{input_tokens:100,output_tokens:50}})}});
 assert.match(result.cover.html,/Reserva este día/);assert.match(result.cover.html,/wa.me\/521234567890/);assert.equal(requestBody.store,false);assert.ok(requestBody.instructions.includes('PORTADA SEGÚN ORIGEN'));
});
