import test from 'node:test';
import assert from 'node:assert/strict';
import {aiPublishSchema,buildAiEvent} from '../lib/ai/publishing.js';
import {coverInputSchema,coverDocument,coverOutputSchema} from '../lib/ai/cover-code.js';
const cover={summary:'Video',html:'<main><h1>Celebración</h1><div data-video-id="video-a"></div></main>',css:'main{color:#123}',warnings:[]};
const videos=[{id:'video-a',url:'https://res.cloudinary.com/test/video/upload/clip.mp4',fileName:'Nuestro recuerdo.mp4',title:'Un día especial'}];
const data={slug:'test-video',name1:'Pareja',name2:'',occasion:'Boda',dateLabel:'',eventDate:'',cover,videos,envelopeLayout:{openWidth:100,openBottom:4},features:{rsvp:false,passes:false,photos:false}};
test('videos and titles survive save and reload; old invitations default to no videos',()=>{
 const parsed=aiPublishSchema.parse(data);assert.deepEqual(buildAiEvent(parsed,'admin').publicData.aiDesign.videos,videos);
 assert.deepEqual(aiPublishSchema.parse({...data,videos:undefined}).videos,[]);
 for(const url of ['','javascript:alert(1)','https://evil.test/movie.mp4'])assert.equal(aiPublishSchema.safeParse({...data,videos:[{...videos[0],url}]}).success,false);
 assert.equal(aiPublishSchema.safeParse({...data,videos:Array(11).fill(videos[0])}).success,false);
});
test('AI receives only file references; runtime supplies video and retains script isolation',()=>{
 const references=videos.map(({id,fileName,title})=>({id,fileName,title}));
 assert.equal(coverInputSchema.safeParse({prompt:'Usa el video subido',name1:'',name2:'',occasion:'',dateLabel:'',imageUrl:'',videos:references}).success,true);
 const html=coverDocument(cover,'','https://example.test',{fullInvitation:true,videos});
 assert.ok(html.includes(videos[0].url));assert.ok(html.includes('media-src https://res.cloudinary.com'));assert.ok(html.includes("connect-src 'none'"));assert.ok(!html.includes(videos[0].fileName));
 assert.equal(coverOutputSchema.safeParse({...cover,html:'<video src="https://evil.test/v.mp4"></video>'}).success,false);
 assert.ok(!coverDocument(cover,'','https://example.test',{videos:[{...videos[0],url:'https://evil.test/v.mp4'}]}).includes('evil.test'));
});
