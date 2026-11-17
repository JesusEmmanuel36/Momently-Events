// Delivery-only. Never use these URLs to update stored data or download originals.
export const IMAGE_WIDTHS = Object.freeze([480, 800, 1200, 1600]);
// Literal env references are required for Next.js browser builds.
const switches={images:()=>process.env.NEXT_PUBLIC_CLOUDINARY_IMAGES_OPTIMIZATION,audio:()=>process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_OPTIMIZATION,video:()=>process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_OPTIMIZATION};
export function enabled(kind='images'){return process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION!=='off'&&process.env.NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION!=='false'&&(kind==='images'?switches.images()!=='off':switches[kind]?.()==='on')}
export function imageWidth(width=1200){const value=Number(width);return IMAGE_WIDTHS.find(w=>w>=(Number.isFinite(value)?value:1200)*.95)||1600}
export function plainCloudinaryUpload(src,type='image') {
 if(typeof src!=='string'||src.length>4000)return null;
 // Skip signed/query/hash/private/fetch/named/chained/animated/special URLs.
 const match=src.match(/^https:\/\/res\.cloudinary\.com\/([\w-]+)\/(image|video)\/upload\/(.+)$/);
 if(!match||match[2]!==type||/[?#\s\\<>"']/.test(src))return null;
 const path=match[3],parts=path.split('/');
 if(parts.some(p=>!p||p.includes(',')||p.includes(':')||/^s--|^(?:a|ac|ar|b|bl|bo|br|c|co|cs|d|dl|dn|dpr|du|e|eo|f|fl|fn|fps|g|h|if|ki|l|o|pg|q|r|so|sp|t|u|vc|vs|w|x|y|z)_/i.test(p)||/%(?:2f|2c|3f|23|3a)/i.test(p)))return null;
 return {prefix:`https://res.cloudinary.com/${match[1]}/${type}/upload/`,path};
}
export function cloudinaryImage(src,{width=1200}={}) {
 if(!enabled('images'))return src;
 const parsed=plainCloudinaryUpload(src);if(!parsed||! /\.(?:jpe?g|png|webp|avif)$/i.test(parsed.path))return src;
 return `${parsed.prefix}c_limit,w_${imageWidth(width)}/f_auto/q_auto/${parsed.path}`;
}
export function cloudinarySrcSet(src){return cloudinaryImage(src)!==src?IMAGE_WIDTHS.map(width=>`${cloudinaryImage(src,{width})} ${width}w`).join(', '):undefined}
export function cloudinaryAudio(src){
 if(!enabled('audio'))return src;const parsed=plainCloudinaryUpload(src,'video');
 if(!parsed||! /\.(mp3|wav|flac|aiff?)$/i.test(parsed.path))return src;
 return `${parsed.prefix}br_128k/f_mp3/${parsed.path.replace(/\.[^.\/]+$/,'.mp3')}`;
}
export function cloudinaryVideo(src){
 if(!enabled('video'))return src;const parsed=plainCloudinaryUpload(src,'video');
 if(!parsed||! /\.(mp4|mov|mpe?g|mpe)$/i.test(parsed.path))return src;
 return `${parsed.prefix}c_limit,w_1280/q_auto/vc_h264,ac_aac/f_mp4/${parsed.path.replace(/\.[^.\/]+$/,'.mp4')}`;
}
export function imageDelivery(src,{width=800,sizes='(max-width: 600px) 100vw, 800px'}={}){return {original:src,url:cloudinaryImage(src,{width}),srcSet:cloudinarySrcSet(src),sizes}}
// HEAD requests warm the derivative but transfer no audio/video body. Never delay play:
// callers keep the original until a smaller derivative is ready while still idle.
export async function selectSmallerMedia(src,kind,{fetcher=fetch,signal}={}){
 const candidate=kind==='audio'?cloudinaryAudio(src):kind==='video'?cloudinaryVideo(src):src;
 if(candidate===src)return src;
 try{
  const responses=await Promise.all([fetcher(src,{method:'HEAD',signal}),fetcher(candidate,{method:'HEAD',signal})]);
  const [original,optimized]=responses.map(response=>Number(response.headers.get('content-length')));
  return responses.every(response=>response.ok)&&original>0&&optimized>0&&optimized<original*.97?candidate:src;
 }catch{return src}
}
