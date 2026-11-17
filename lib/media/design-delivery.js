import {cloudinaryImage,cloudinaryVideo,imageDelivery} from './cloudinary.js';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const urlPattern=/https:\/\/res\.cloudinary\.com\/[^\s"'<>\\)]+/g;
export function designDelivery(cover,imageUrl='',floral='',gallery=[],videos=[]){
 const fallback={};const css=String(cover.css).replaceAll('{{COVER_IMAGE}}',imageUrl).replaceAll('{{FLORAL_IMAGE}}',floral).replace(urlPattern,url=>{const next=cloudinaryImage(url,{width:1200});if(next!==url)fallback[next]=url;return next});
 // Placeholder URLs are replaced later by coverDocument. Use 1200 also behind the envelope.
 let first=true;const firstSectionEnd=String(cover.html).search(/<\/section\s*>/i);
 const html=String(cover.html).replace(/<img\b[^>]*>/gi,(tag,offset)=>{
  if(/data-gallery-photo|data-media-original/.test(tag))return tag;
  const match=tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i);if(!match)return tag;
  const src=match[2]==='{{COVER_IMAGE}}'?imageUrl:match[2]==='{{FLORAL_IMAGE}}'?floral:match[2];
  const media=imageDelivery(src,{width:1200,sizes:'100vw'});if(media.url===src)return tag;
  const priority=firstSectionEnd>=0?offset<firstSectionEnd:first;first=false;
  let next=tag.replace(match[0],`src="${escape(media.url)}" data-media-original="${escape(src)}"`);
  // Explicit existing srcsets/sizes are preserved; don't reinterpret authored layouts.
  if(!/\bsrcset\s*=/i.test(tag))next=next.replace(/\s*\/?>$/,` srcset="${escape(media.srcSet)}"${/\bsizes\s*=/i.test(tag)?'':' sizes="100vw"'}>`);
  if(!priority)next=next.replace(/\s(?:loading|fetchpriority)\s*=\s*(["'])(.*?)\1/gi,'');
  if(!/\bloading\s*=/i.test(next))next=next.replace(/>$/,` loading="${priority?'eager':'lazy'}" decoding="async">`);
  return next;
 });
 const inlineHtml=html.replace(/\bstyle\s*=\s*(["'])(.*?)\1/gi,(all,quote,value)=>`style=${quote}${value.replace(urlPattern,url=>{const next=cloudinaryImage(url,{width:1200});if(next!==url)fallback[next]=url;return next})}${quote}`);
 return {cover:{...cover,html:inlineHtml,css},image:cloudinaryImage(imageUrl,{width:1200}),floral:cloudinaryImage(floral,{width:800}),fallback,
 gallery:gallery.map(item=>({...item,...imageDelivery(item.url,{width:800,sizes:'(max-width: 600px) 100vw, 800px'}),fullUrl:cloudinaryImage(item.url,{width:1600})})),
 videos:videos.map(item=>({...item,original:item.url,url:cloudinaryVideo(item.url)}))};
}
