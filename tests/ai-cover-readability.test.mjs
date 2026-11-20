import test from 'node:test';
import assert from 'node:assert/strict';
import {repairInvitationTextSpacing} from '../lib/ai/text-spacing.js';
import {coverInputSchema,COVER_INSTRUCTIONS} from '../lib/ai/cover-code.js';
import {aiPublishSchema,buildAiEvent} from '../lib/ai/publishing.js';
import {generatedGalleryImage} from '../lib/ai/gallery.js';
import {v2SavePayload,runV2Pipeline} from '../lib/ai/v2-pipeline.js';

test('repairs visible invitation words and boundaries of animated inline spans',()=>{
 assert.equal(repairInvitationTextSpacing('<h2>Reservaeste día</h2>'),'<h2>Reserva este día</h2>');
 assert.equal(repairInvitationTextSpacing('<h2><span>Reserva</span><span>este</span><em>día</em></h2>'),'<h2><span>Reserva</span> <span>este</span> <em>día</em></h2>');
 assert.equal(repairInvitationTextSpacing('<p>Con<span>todo</span>nuestro<strong>amor</strong></p>'),'<p>Con <span>todo</span> nuestro <strong>amor</strong></p>');
});
test('preserves attributes, URLs, SVG, code, names, punctuation and already spaced text',()=>{
 const html='<h2 id="Reservaeste" title="Reservaeste día">Reserva este día</h2><a href="https://example.com/confirmarasistencia">Confirmarasistencia</a><svg><text>Reservaeste</text></svg><pre>Reservaeste</pre><p>María José · Emmanuel, invitación. &amp; tú</p>';
 const expected=html.replace('>Confirmarasistencia<','>Confirmar asistencia<');
 assert.equal(repairInvitationTextSpacing(html),expected);
 assert.equal(repairInvitationTextSpacing(expected),expected);
});
test('both creators send explicit source; old requests remain unknown and generated gallery assets retain provenance',()=>{
 const input={prompt:'Una boda elegante',name1:'Ana',name2:'Luis',occasion:'Boda',dateLabel:'',imageUrl:''};
 assert.equal(coverInputSchema.parse(input).coverImageSource,'unknown');
 assert.equal(coverInputSchema.parse({...input,coverImageSource:'generated'}).coverImageSource,'generated');
 assert.equal(coverInputSchema.safeParse({...input,coverImageSource:'bad'}).success,false);
 assert.equal(generatedGalleryImage('https://res.cloudinary.com/demo/image/upload/v1/photo.webp','foto','Dos personas').source,'generated');
 assert.match(COVER_INSTRUCTIONS,/Si es generated, NO añadas degradado/);
 assert.match(COVER_INSTRUCTIONS,/sin cubrir rostros/);
});
test('V2 marks a newly generated cover before design and saves its provenance',async()=>{
 let seen;
 const result=await runV2Pipeline({draft:{imageUrl:'',artwork:{},imagePrompt:'Beige'},options:{cover:true},artwork:async()=>({url:'https://res.cloudinary.com/demo/image/upload/v1/photo.webp'}),design:async current=>{seen=current.coverImageSource;return {html:'<h1>Ana</h1>'}},checkpoint:async()=>{},progress:()=>{}});
 assert.equal(seen,'generated');assert.equal(v2SavePayload(result).coverImageSource,'generated');
});

test('source survives server save/reload and gallery metadata in either creator',()=>{
 const cover={summary:'Boda',html:'<h1>Ana y Luis</h1>',css:'h1{color:white}',warnings:[]};
 const payload=aiPublishSchema.parse({slug:'ana-y-luis',name1:'Ana',name2:'Luis',occasion:'Boda',dateLabel:'',eventDate:'',cover,coverImageSource:'generated',imageUrl:'',features:{rsvp:false,passes:false,photos:false},envelopeLayout:{openWidth:101,openBottom:4},gallery:[generatedGalleryImage('https://res.cloudinary.com/demo/image/upload/v1/photo.webp','foto','Imagen IA')]});
 const event=buildAiEvent(payload,'admin');
 assert.equal(event.publicData.aiDesign.coverImageSource,'generated');
 assert.equal(event.publicData.aiDesign.gallery[0].source,'generated');
});
