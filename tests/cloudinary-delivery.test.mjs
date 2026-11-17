import test from 'node:test';import assert from 'node:assert/strict';
import {cloudinaryImage,cloudinaryAudio,cloudinaryVideo,cloudinarySrcSet,imageWidth} from '../lib/media/cloudinary.js';
import {designDelivery} from '../lib/media/design-delivery.js';
process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_OPTIMIZATION='on';
process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_OPTIMIZATION='on';
const image='https://res.cloudinary.com/test/image/upload/v123/momently-events/photo_123.png';
const audio='https://res.cloudinary.com/test/video/upload/v123/song.mp3';
test('four canonical image widths, format and quality without crop/upscale or alpha removal',()=>{
 for(const [input,output]of [[200,480],[480,480],[481,480],[900,1200],[1500,1600],[3840,1600]]){assert.equal(imageWidth(input),output);assert.equal(cloudinaryImage(image,{width:input}),`https://res.cloudinary.com/test/image/upload/c_limit,w_${output}/f_auto/q_auto/v123/momently-events/photo_123.png`)}
 assert.equal(cloudinarySrcSet(image).split(', ').length,4);
 assert.equal(cloudinaryImage(cloudinaryImage(image)),cloudinaryImage(image));
});
test('special, signed, transformed, animated, vector, noncloud URLs stay byte-for-byte unchanged',()=>{
 const urls=['/local.png','https://example.com/a.png','https://res.cloudinary.com/test/image/private/v1/a.png',image+'?token=a',image+'#page=1',image.replace('/v123/','/s--ABC--/v123/'),image.replace('/v123/','/t_custom/v123/'),image.replace('/v123/','/c_fill,w_500,h_500/v123/'),image.replace('.png','.gif'),image.replace('.png','.svg'),image.replace('.png','.pdf'),image.replace('/v123/','/f_auto/q_auto/v123/')];
 for(const url of urls){assert.equal(cloudinaryImage(url),url);assert.equal(cloudinarySrcSet(url),undefined)}
});
test('music/video only known originals, no changes to transformed or special codecs',()=>{
 assert.match(cloudinaryAudio(audio),/br_128k\/f_mp3\/v123\/song.mp3$/);
 assert.equal(cloudinaryAudio(audio.replace('/v123/','/f_mp3/v123/')),audio.replace('/v123/','/f_mp3/v123/'));
 assert.equal(cloudinaryAudio(audio.replace('.mp3','.m4a')),audio.replace('.mp3','.m4a'));
 assert.match(cloudinaryVideo(audio.replace('.mp3','.mov')),/c_limit,w_1280\/q_auto\/vc_h264,ac_aac\/f_mp4\/v123\/song.mp4$/);
 assert.equal(cloudinaryVideo(audio.replace('.mp3','.webm')),audio.replace('.mp3','.webm'));
});
test('delivery-only design rewrite preserves input and original for fallback/downloads',()=>{
 const cover={html:`<section><img src="{{COVER_IMAGE}}"></section><section><img src="${image}"></section>`,css:`.cover{background-image:url('{{COVER_IMAGE}}')}`};const before=JSON.stringify(cover);
 const d=designDelivery(cover,image,'',[{id:'p',url:image}],[]);
 assert.equal(JSON.stringify(cover),before);assert.ok(d.cover.html.includes('srcset='));assert.ok(d.cover.html.includes('loading="lazy"'));assert.ok(d.cover.html.includes('data-media-original='));assert.equal(d.gallery[0].original,image);assert.match(d.gallery[0].fullUrl,/w_1600/);assert.equal(d.fallback[cloudinaryImage(image)],image);
});
test('single kill switch and per-kind switches revert delivery without data mutation',()=>{
 const previous=process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION;process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION='off';
 try{assert.equal(cloudinaryImage(image),image);assert.equal(cloudinaryAudio(audio),audio);assert.equal(cloudinaryVideo(audio.replace('.mp3','.mp4')),audio.replace('.mp3','.mp4'))}finally{if(previous===undefined)delete process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION;else process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION=previous}
 process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_OPTIMIZATION='off';try{assert.equal(cloudinaryAudio(audio),audio);assert.notEqual(cloudinaryImage(image),image)}finally{process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_OPTIMIZATION='on'}
});

test('media selection rejects larger, denied, missing sizes and failures without blocking original playback',async()=>{
 const {selectSmallerMedia}=await import('../lib/media/cloudinary.js');
 const request=(size,status=200)=>new Response(null,{status,headers:{'content-length':String(size)}});
 for(const [optimized,expected]of [[600,true],[1100,false],[0,false]]){
  const url=await selectSmallerMedia(audio,'audio',{fetcher:async url=>request(url===audio?1000:optimized)});assert.equal(url!==audio,expected);
 }
 assert.equal(await selectSmallerMedia(audio,'audio',{fetcher:async()=>request(10,403)}),audio);
 assert.equal(await selectSmallerMedia(audio,'audio',{fetcher:async()=>{throw Error('network')}}),audio);
});
test('gallery preserves IDs and never exposes uploaded filenames in generated document',async()=>{
 const {coverDocument}=await import('../lib/ai/cover-code.js');const {galleryPhotoId}=await import('../lib/ai/gallery.js');
 const photo={url:image,fileName:'private-filename.png',alt:'Photo'};const cover={summary:'x',html:'<main><div data-gallery></div></main>',css:'main{color:#123}',warnings:[]};
 const html=coverDocument(cover,'','https://test.example',{fullInvitation:true,gallery:[photo]});assert.ok(html.includes(galleryPhotoId(photo)));assert.ok(!html.includes(photo.fileName));assert.ok(html.includes('data-momently-media-fallback='));
});
