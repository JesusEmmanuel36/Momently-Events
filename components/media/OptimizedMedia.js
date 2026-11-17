'use client';
import {forwardRef,useRef,useState,useEffect} from 'react';
import {selectSmallerMedia} from '@/lib/media/cloudinary';
function createMedia(tag,kind){return forwardRef(function Media({src,onError,preload,...props},forwarded){
 const ref=useRef(null);const[selected,setSelected]=useState(null);const[failed,setFailed]=useState(null);const[retry,setRetry]=useState(false);
 const optimized=failed===src?src:selected?.original===src?selected.url:src;
 useEffect(()=>{
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
  selectSmallerMedia(src,kind,{signal:controller.signal}).then(url=>{
   // Never interrupt music already playing, or a video paused mid-playback.
   if(!controller.signal.aborted&&ref.current?.paused&&ref.current.currentTime===0&&ref.current.readyState===0)setSelected({original:src,url});
  }).finally(()=>clearTimeout(timeout));return()=>{clearTimeout(timeout);controller.abort()};
 },[src]);
 useEffect(()=>{if(retry&&ref.current){ref.current.play().catch(()=>{});setRetry(false)}},[retry,optimized]);
 const Tag=tag;return <Tag {...props} ref={node=>{ref.current=node;if(typeof forwarded==='function')forwarded(node);else if(forwarded)forwarded.current=node}} src={optimized} preload={preload??'none'} onError={event=>{if(optimized!==src){setFailed(src);setRetry(true)}else onError?.(event)}}/>;
})}
export const OptimizedAudio=createMedia('audio','audio');
export const OptimizedVideo=createMedia('video','video');
