'use client';
import NextImage from 'next/image';
import {useState} from 'react';
import {cloudinaryImage} from '@/lib/media/cloudinary';
// Keep Next Image geometry/fill/alt/events intact; locals and special URLs pass through.
export default function OptimizedImage(props){
 const [failed,setFailed]=useState(null);const eligible=typeof props.src==='string'&&failed!==props.src&&!props.loader&&cloudinaryImage(props.src)!==props.src;
 if(!eligible)return <NextImage {...props}/>;
 return <NextImage {...props} loader={({src,width})=>cloudinaryImage(src,{width})} unoptimized={false} sizes={props.sizes||(props.fill?'100vw':`${props.width||800}px`)} onError={()=>setFailed(props.src)}/>;
}
