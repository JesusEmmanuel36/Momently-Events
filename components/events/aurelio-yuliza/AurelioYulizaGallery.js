"use client";
import Image from "next/image";
import {createPortal} from "react-dom";
import {ChevronLeft,ChevronRight,X} from "lucide-react";
import {useEffect,useState} from "react";
import {Reveal,SectionHeading} from "@/components/ui";
import styles from "./AurelioYulizaGallery.module.css";
function Photo({photo,expanded=false}){
 const rotated=Math.abs(photo.rotation||0)%180===90;
 const aspect=rotated?photo.height/photo.width:photo.width/photo.height;
 return <div className={`${styles.frame} ${expanded?styles.expanded:""}`} style={{aspectRatio:aspect,"--aspect":aspect}}><Image unoptimized src={photo.src} width={photo.width} height={photo.height} sizes={expanded?"90vw":"(max-width:700px) 90vw,33vw"} alt={photo.alt} style={{width:rotated?`${photo.width/photo.height*100}%`:"100%",transform:`translate(-50%,-50%) rotate(${photo.rotation||0}deg)`}}/></div>;
}
export function AurelioYulizaGallery({photos}){
 const [active,setActive]=useState(null);
 useEffect(()=>{if(active===null)return;const body=document.body;const html=document.documentElement;const y=window.scrollY;const saved={position:body.style.position,top:body.style.top,width:body.style.width,overflow:body.style.overflow};const overflow=html.style.overflow;const focus=document.activeElement;Object.assign(body.style,{position:"fixed",top:`-${y}px`,width:"100%",overflow:"hidden"});html.style.overflow="hidden";document.querySelector('[data-ay-close]')?.focus({preventScroll:true});const key=e=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')setActive(i=>(i+1)%photos.length);if(e.key==='ArrowLeft')setActive(i=>(i-1+photos.length)%photos.length);};document.addEventListener('keydown',key);return()=>{Object.assign(body.style,saved);html.style.overflow=overflow;window.scrollTo({top:y,behavior:'instant'});document.removeEventListener('keydown',key);focus?.focus({preventScroll:true});};},[active,photos.length]);
 return <section className={`section ${styles.gallery}`}><Reveal><SectionHeading eyebrow="Nuestros momentos" title="Recuerdos que nos unen" copy="Instantes que forman parte de nuestra historia."/></Reveal><div className={styles.grid}>{photos.map((photo,index)=><Reveal key={photo.src}><button className={styles.photoButton} onClick={()=>setActive(index)} aria-label={`Abrir fotografía ${index+1}`}><Photo photo={photo}/></button></Reveal>)}</div>{active!==null&&createPortal(<div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Fotografías de Sebastián y Yuliza"><button className={styles.close} data-ay-close aria-label="Cerrar" onClick={()=>setActive(null)}><X/></button><button className={styles.previous} aria-label="Anterior" onClick={()=>setActive((active-1+photos.length)%photos.length)}><ChevronLeft/></button><Photo photo={photos[active]} expanded/><button className={styles.next} aria-label="Siguiente" onClick={()=>setActive((active+1)%photos.length)}><ChevronRight/></button><span className={styles.counter}>{active+1} / {photos.length}</span></div>,document.body)}</section>;
}
