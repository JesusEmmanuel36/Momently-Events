import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {generatedGalleryImage,galleryModelReferences,normalizeAiGallery} from '../lib/ai/gallery.js';
import {artworkInputSchema,artworkPrompt} from '../lib/ai/artwork-prompts.js';
import {generateArtwork} from '../lib/ai/artwork-provider.js';
const url='https://res.cloudinary.com/test/image/upload/iglesia.webp';
test('Generated gallery names are unique and IDs survive reordering and serialization',()=>{
 const item=generatedGalleryImage(url,'iglesia.webp','Una iglesia en acuarela');
 assert.equal(item.fileName,'iglesia.webp');
 const second=generatedGalleryImage(url+'?v=2','IGLESIA.png','Segunda iglesia',[item]);assert.equal(second.fileName,'IGLESIA-2.webp');
 const restored=normalizeAiGallery(JSON.parse(JSON.stringify([second,item])));
 assert.equal(restored[1].id,item.id);assert.equal(galleryModelReferences(restored)[1].fileName,'iglesia.webp');
 assert.equal(generatedGalleryImage(url,'','').fileName,'imagen-ia.webp');
});
test('Gallery prompt follows the subject rather than forcing cover negative space or stationery',()=>{
 const prompt='Montañas con cielo azul y laguna';
 assert.equal(artworkInputSchema.parse({kind:'gallery',prompt}).kind,'gallery');
 assert.match(artworkPrompt('gallery',prompt),/Montañas con cielo azul y laguna/);
 assert.doesNotMatch(artworkPrompt('gallery',prompt),/generous readable negative space|SHARED STYLE AND PALETTE/);
});
test('Gallery generation accepts opaque images, uploads WebP and preserves API usage without paid calls',async()=>{
 const bytes=await sharp({create:{width:16,height:16,channels:3,background:'#eee'}}).png().toBuffer();let calls=0;
 const result=await generateArtwork({kind:'gallery',prompt:'Montañas verdes y cielo azul'},'test-admin',{env:{OPENAI_API_KEY:'mock',CLOUDINARY_CLOUD_NAME:'test',CLOUDINARY_API_KEY:'mock',CLOUDINARY_API_SECRET:'mock'},fetcher:async(endpoint,args)=>{
 calls++;
 if(endpoint==='https://api.openai.com/v1/images/generations'){
 const body=JSON.parse(args.body);assert.equal(body.size,'1024x1024');assert.equal(body.background,'opaque');assert.equal(body.n,1);
 return Response.json({data:[{b64_json:bytes.toString('base64')}],usage:{input_tokens:20,output_tokens:30}});
 }
 assert.equal(endpoint,'https://api.cloudinary.com/v1_1/test/image/upload');assert.ok(args.body.get('file') instanceof Blob);assert.match(args.body.get('public_id'),/^gallery-/);return Response.json({secure_url:url});
 }});
 assert.equal(calls,2);assert.equal(result.url,url);assert.equal(result.kind,'gallery');assert.equal(result.usage.output_tokens,30);
});
