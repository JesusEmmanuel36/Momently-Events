// Detect the broad opaque paper body, ignoring the transparent canvas and soft shadow.
export function paperBodyBounds({data,width,height}){
 if(!width||!height||!data||data.length!==width*height*4)return null;
 const rows=[];
 for(let y=Math.floor(height*.6);y<Math.floor(height*.83);y+=Math.max(1,Math.floor(height/70))){let left=width,right=-1,count=0;for(let x=0;x<width;x++){if(data[(y*width+x)*4+3]>220){left=Math.min(left,x);right=x;count++}}if(count>width*.45&&right-left>width*.5)rows.push(right-left+1)}
 if(!rows.length)return null;rows.sort((a,b)=>a-b);const span=rows[Math.floor(rows.length/2)];let bottom=0;
 for(let y=Math.floor(height*.6);y<height;y++){let count=0;for(let x=0;x<width;x++)if(data[(y*width+x)*4+3]>220)count++;if(count>span*.85)bottom=y+1}
 return bottom?{width:span/width,bottom:bottom/height}:null;
}
export function alignEnvelopeBodies(closed,opened){
 if(!closed||!opened)return null;const scale=closed.width/opened.width;const bottom=1-closed.bottom-scale*(1-opened.bottom);
 if(scale<.8||scale>1.4||bottom<-.15||bottom>.2)return null;
 return{openWidth:Math.round(scale*1000)/10,openBottom:Math.round(bottom*1000)/10};
}
export async function measureEnvelopePair(closedUrl,openUrl){
 const pixels=url=>new Promise((resolve,reject)=>{const img=new window.Image();img.crossOrigin='anonymous';img.onload=()=>{try{const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);resolve(paperBodyBounds(ctx.getImageData(0,0,canvas.width,canvas.height)))}catch(e){reject(e)}};img.onerror=()=>reject(Error('image'));img.src=url});
 const [closed,opened]=await Promise.all([pixels(closedUrl),pixels(openUrl)]);return alignEnvelopeBodies(closed,opened);
}
