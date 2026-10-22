"use client";
import Image from "next/image";
import {useEffect,useRef} from "react";
import styles from "./PhotographicEnvelope.module.css";
export function PhotographicEnvelope({assets,opening,onOpen,onOpened,title,subtitle,date,openLabel="Abrir invitación",openWidth=100,openBottom=0,sealTop=55}){
 const callback=useRef(onOpened);useEffect(()=>{callback.current=onOpened;},[onOpened]);
 useEffect(()=>{if(!opening)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const timer=setTimeout(()=>callback.current?.(),reduced?0:4200);return()=>clearTimeout(timer);},[opening]);
 return <div className={`${styles.scene} ${opening?styles.opening:''}`} style={{'--open-width':`${openWidth}%`,'--open-offset':`${-openWidth/2}%`,'--seal-top':`${sealTop}%`,'--open-bottom':`${openBottom}%`}} data-photographic-envelope>
  <div className={`${styles.openLayer} ${styles.openBack}`}><Image src={`${assets}/envelope-open.webp`} width={1536} height={1024} className={styles.openArtwork} sizes="(max-width:700px) 96vw,720px" alt="Sobre abierto con arreglo floral" unoptimized priority draggable={false}/></div>
  <div className={styles.letter}><span>{subtitle}</span><h2>{title}</h2><p>{date}</p><small>Una invitación para ti</small></div>
  <div className={`${styles.openLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${assets}/envelope-open.webp`} width={1536} height={1024} className={styles.openArtwork} sizes="(max-width:700px) 96vw,720px" alt="" unoptimized priority draggable={false}/></div>
  <Image src={`${assets}/envelope-closed.webp`} fill sizes="(max-width:700px) 96vw,720px" className={styles.closed} alt="Sobre de invitación con lazo, sello y flores" unoptimized priority draggable={false}/>
  <button type="button" className={styles.seal} onClick={onOpen} disabled={opening} aria-label={openLabel}/>
 </div>;
}
