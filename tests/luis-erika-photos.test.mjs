import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {luisErikaPhotos as event,guestPhotosAreOpen,kristellRicardoPhotos} from '../lib/event-photos/config.js';
import {processGuestPhoto} from '../lib/event-photos/server.js';
import {listGuestPhotos} from '../lib/event-photos/gallery.js';
const env={CLOUDINARY_CLOUD_NAME:'test-cloud',CLOUDINARY_API_KEY:'test-key',CLOUDINARY_API_SECRET:'test-secret'};
test('Luis and Erika upload opens at midnight in Oaxaca, with isolated storage',async()=>{
 const opens=Date.parse('2027-06-27T06:00:00Z');assert.equal(Date.parse(event.opensAt),opens);
 assert.equal(guestPhotosAreOpen(opens-1,event),false);assert.equal(guestPhotosAreOpen(opens,event),true);
 await assert.rejects(processGuestPhoto(new Request('https://example.com'+event.apiPath,{method:'POST'}),{event,now:opens-1,env}),e=>e.status===403&&e.code==='photos_not_open');
 const image=await sharp({create:{width:32,height:32,channels:3,background:'white'}}).png().toBuffer();
 const form=new FormData();form.set('file',new Blob([image],{type:'image/png'}),'foto.png');form.set('uploadId','11111111-1111-4111-8111-111111111111');
 const request=new Request('https://example.com'+event.apiPath,{method:'POST',headers:{origin:'https://example.com'},body:form});
 let uploaded=false;
 await processGuestPhoto(request,{event,now:opens,env,rateLimit:async()=>{},upload:async(_buffer,_id,options)=>{assert.equal(options.event.folder,'momently-events/luis-y-erika/guest-photos');uploaded=true;return {ok:true};}});assert.equal(uploaded,true);
 assert.notEqual(event.folder,kristellRicardoPhotos.folder);
});
test('Luis and Erika public gallery excludes other events',async()=>{
 const result=await listGuestPhotos('',{env,event,fetcher:async url=>{assert.equal(url.searchParams.get('prefix'),event.folder+'/');return Response.json({resources:[event,kristellRicardoPhotos].map((config,i)=>({asset_id:String(i),public_id:config.folder+'/1',resource_type:'image',secure_url:'https://res.cloudinary.com/test-cloud/image/upload/v1/photo.jpg'}))});}});
 assert.equal(result.photos.length,1);assert.equal(result.photos[0].id,'0');
});
