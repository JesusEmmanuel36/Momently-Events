export const cloudinaryUploadSettings = {
 images:{accept:'image/jpeg,image/png,image/webp,image/avif',max:15*1024*1024,resourceType:'image'},
 audio:{accept:'audio/*,.mp3,.mpeg,.mpg,.mpga,audio/mpeg,audio/mpg,audio/x-mpeg',max:25*1024*1024,resourceType:'video'},
 video:{accept:'video/*,.mpeg,.mpg,.mpe,video/mpeg,video/mpg,video/x-mpeg',max:150*1024*1024,resourceType:'video'},
};
export function mpegPlaybackUrl(url,file,kind){
 if(!['audio','video'].includes(kind)||! /\.(mpeg|mpg|mpe|mpga)$/i.test(file?.name||''))return url;
 if(!/^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\//.test(url))return url;
 const extension=kind==='audio'?'mp3':'mp4';
 const transform=kind==='audio'?'f_mp3':'f_mp4,vc_h264,ac_aac';
 return url.replace('/video/upload/','/video/upload/'+transform+'/').replace(/\.[a-z0-9]+(?=\?|#|$)/i,'.'+extension);
}
