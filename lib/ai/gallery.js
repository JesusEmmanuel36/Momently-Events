// Stable references: moving a photo never changes the ID used by generated HTML.
export function galleryPhotoId(item,index=0){
 if(/^[a-zA-Z0-9_-]{1,100}$/.test(item?.id||''))return item.id;
 const source=String(item?.url||`missing-${index}`);let hash=2166136261,second=5381;for(const ch of source){hash=Math.imul(hash^ch.charCodeAt(0),16777619);second=Math.imul(second,33)^ch.charCodeAt(0)}return `photo-${(hash>>>0).toString(36)}-${(second>>>0).toString(36)}`;
}
export function galleryFileName(item,index=0){
 let name=String(item?.fileName||'');if(!name){try{name=decodeURIComponent(new URL(item?.url).pathname.split('/').at(-1)||'')}catch{name=''}}
 return (name||item?.alt||`Foto ${index+1}`).replace(/[\u0000-\u001f\u007f]/g,'').slice(0,255);
}
export function normalizeAiGallery(items=[]){return items.map((item,index)=>({...item,id:galleryPhotoId(item,index),fileName:galleryFileName(item,index),alt:String(item.alt||'').slice(0,300)}));}
export function galleryModelReferences(items=[]){return normalizeAiGallery(items).map(({id,fileName,alt},index)=>({id,index,fileName,alt}));}

// Generated images participate in the same stable-ID/name workflow as uploads.
export function generatedGalleryImage(url,name,description,items=[]){
 const raw=String(name||'imagen-ia').trim().replace(/[\u0000-\u001f\u007f]/g,'').replace(/\.(png|jpe?g|webp)$/i,'').slice(0,220)||'imagen-ia';
 const used=new Set(items.map(item=>galleryFileName(item).toLowerCase()));
 let fileName=raw+'.webp',suffix=2;while(used.has(fileName.toLowerCase())){fileName=raw+'-'+suffix+'.webp';suffix+=1;}
 return normalizeAiGallery([{url,fileName,alt:String(description||'Imagen generada con IA').slice(0,300)}])[0];
}
