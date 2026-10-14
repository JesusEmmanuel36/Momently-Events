"use client";
import { useEffect, useRef, useState } from "react";
import { createEnvelopeTheme } from "./theme";
import styles from "./CssEnvelope.module.css";

function Rose({pink=false,size=100,x=0,y=0,rotation=0}){
 return <div className={`${styles.rose} ${pink?styles.pink:''}`} style={{'--size':`${size}%`,'--x':`${x}%`,'--y':`${y}%`,'--rotation':`${rotation}deg`}}>{Array.from({length:18},(_,i)=><i key={i} className={styles.petal} style={{'--turn':`${i*137.5}deg`,'--layer':i,'--petal-size':`${72-i*2.9}%`}}/>)}<span className={styles.roseHeart}/></div>;
}
function Flowers({right=false}){
 return <div className={`${styles.flowers} ${right?styles.flowersRight:''}`} aria-hidden="true"><div className={styles.stems}>{Array.from({length:9},(_,i)=><i key={i} className={styles.stem} style={{'--angle':`${-70+i*17}deg`,'--length':`${58+(i%3)*17}%`}}><b/><b/><b/></i>)}</div>{Array.from({length:13},(_,i)=><i key={i} className={styles.leaf} style={{'--leaf-x':`${10+(i*23)%78}%`,'--leaf-y':`${8+(i*31)%85}%`,'--leaf-turn':`${i*39-80}deg`,'--leaf-size':`${23+(i%3)*5}%`}}/>)}<div className={styles.sprig}>{Array.from({length:15},(_,i)=><b key={i} style={{left:`${(i*29)%95}%`,top:`${(i*43)%95}%`}}/>)}</div><Rose size={47} x={17} y={30} rotation={-12}/><Rose pink size={35} x={54} y={56} rotation={20}/><Rose size={21} x={38} y={12} rotation={-15}/><Rose pink size={15} x={67} y={28} rotation={25}/></div>;
}

/** Pure CSS envelope. `color` sets the ribbon and accent roses; `colors` overrides individual materials. */
export function CssEnvelope({
  color, colors, monogram="D", letter={}, children, open, defaultOpen=false,
  onOpenChange, onOpened, showFlowers=true, maxWidth=880, className="",
  openLabel="Abrir invitación", disabled=false,
}) {
  const [internalOpen,setInternalOpen]=useState(defaultOpen);
  const isOpen=open ?? internalOpen;
  const openedCallback=useRef(onOpened);
  useEffect(()=>{openedCallback.current=onOpened;},[onOpened]);
  useEffect(()=>{
    if(!isOpen)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer=window.setTimeout(()=>openedCallback.current?.(),reduced?0:2650);
    return ()=>window.clearTimeout(timer);
  },[isOpen]);
  function reveal(){if(disabled||isOpen)return;if(open===undefined)setInternalOpen(true);onOpenChange?.(true);}
  const text=String(monogram||"D").trim().replace(/\s+/g,"") || "D";
  const letters=Array.from(text).length;
  const title=letter.title ?? "Momentos que\nse quedan.";
  const variables={...createEnvelopeTheme({color,colors}),"--envelope-width":typeof maxWidth==="number"?`${maxWidth}px`:maxWidth,"--monogram-size":letters===1?"8.1cqw":letters<=3?"4.7cqw":letters<=5?"3.8cqw":"3cqw"};
  return <div className={`${styles.stage} ${className}`} style={variables} data-css-envelope data-open={isOpen}>
    <div className={`${styles.envelope} ${isOpen?styles.open:""}`}>
      <div className={styles.back}/><div className={styles.inner}/>
      <div className={styles.card} aria-hidden={!isOpen}>{children ?? <><span>{letter.eyebrow??"UNA INVITACIÓN PARA TI"}</span><h2>{title}</h2><div className={styles.cardRule}/><p>{letter.message??"Con todo nuestro cariño"}</p><strong>{letter.footer??"Momently Events"}</strong></>}</div>
      <div className={styles.pocketLeft}/><div className={styles.pocketRight}/><div className={styles.pocketBottom}/>
      <div className={styles.flap}><div className={styles.flapFront}/><div className={styles.flapBack}/></div>
      <div className={styles.decoration}><div className={styles.ribbonBand}/><div className={styles.bow}>
        <div className={`${styles.tail} ${styles.tailLeft}`}/><div className={`${styles.tail} ${styles.tailRight}`}/>
        <div className={`${styles.loop} ${styles.loopLeft}`}/><div className={`${styles.loop} ${styles.loopRight}`}/><div className={styles.knot}/>
        <button className={styles.seal} onClick={reveal} disabled={disabled||isOpen} aria-label={openLabel} aria-expanded={isOpen}><span className={styles.sealRim}/><span className={styles.sealInner}/><span className={styles.monogram}>{text}</span></button>
      </div></div>{showFlowers&&<><Flowers/><Flowers right/></>}
    </div>
  </div>;
}
