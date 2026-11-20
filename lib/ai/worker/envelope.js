import sharp from 'sharp';
import {paperBodyBounds,alignEnvelopeBodies} from '../envelope-layout.js';
export async function workerEnvelopeLayout(closedUrl,openUrl){
 const pixels=async url=>{const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(20000)});if(!response.ok||Number(response.headers.get('content-length'))>15000000)throw Error('Imagen no disponible');const bytes=await response.arrayBuffer();if(bytes.byteLength>15000000)throw Error('Imagen demasiado grande');const {data,info}=await sharp(bytes).resize({width:768,withoutEnlargement:true}).ensureAlpha().raw().toBuffer({resolveWithObject:true});return paperBodyBounds({data,width:info.width,height:info.height})};
 const [closed,open]=await Promise.all([pixels(closedUrl),pixels(openUrl)]);return alignEnvelopeBodies(closed,open);
}
