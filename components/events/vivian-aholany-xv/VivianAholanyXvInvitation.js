"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Church,MapPin,Pause,Play,ChevronDown} from "lucide-react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {RSVPSection} from "@/components/sections/GuestActions";
import styles from "./VivianAholanyXv.module.css";
export function VivianAholanyXvInvitation({wedding}){
 const audio=useRef(null);const [opened,setOpened]=useState(false);const [playing,setPlaying]=useState(false);const [opening,setOpening]=useState(false);const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
 useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata)navigator.mediaSession.metadata=new window.MediaMetadata({title:"Perfect",artist:"Ed Sheeran",album:"Vivian Aholany · Mis XV años"});},[playing]);
 const toggle=()=>{if(audio.current.paused)audio.current.play().catch(()=>setPlaying(false));else audio.current.pause();};
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setPlaying(false));timer.current=setTimeout(()=>{setOpened(true);window.scrollTo({top:0,behavior:"instant"});},window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:4200);};
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.url} preload="auto" loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
 {!opened&&<div className={`${styles.intro} ${opening?styles.opening:""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt=""/><div className={styles.introShade}/><div className={styles.introHeading}><span>Mis XV años</span><h2>Una invitación para ti</h2></div><div className={styles.envelopeStage}>
 <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src="/images/events/xv-vivian-aholany/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="Sobre rosa abierto" priority/></div>
 <div className={styles.letter}><span>Mis XV años</span><h2>Vivian Aholany</h2><small>20 · 11 · 2026</small></div>
 <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src="/images/events/xv-vivian-aholany/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="" priority/></div>
 <Image unoptimized src="/images/events/xv-vivian-aholany/envelope-closed.png" width={1536} height={1024} className={styles.closedEnvelope} sizes="(max-width:700px) 98vw,720px" alt="Sobre rosa con flores, lazo marfil y sello dorado" priority/>
 <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Vivian Aholany"/></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}<ChevronDown size={16}/></button></div>}
 <header className={styles.hero}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Joven de espaldas con vestido rosa y dorado, corona y mariposas luminosas"/><div className={styles.shade}/><div className={styles.heroCopy}><span>Mis XV años</span><h1>Vivian <br/>Aholany</h1><p>{wedding.dateDisplay}</p><a href="#celebracion">Te espero <ChevronDown size={18}/></a></div></header>
 {opened&&<main id="celebracion"><section className={styles.family}><Image unoptimized src="/images/events/xv-vivian-aholany/floral.png" width={1536} height={1024} className={styles.floral} sizes="(max-width:700px) 65vw,310px" alt="Arreglo de rosas rosa empolvado y flores marfil con detalles dorados"/><h2>Un día muy especial</h2><p>{wedding.hero.quote}</p><div className={styles.familyGrid}><div><h3>Mi mamá</h3><p>{wedding.family.mother}</p></div><div><h3>Mis padrinos</h3>{wedding.family.godparents.map(name=><p key={name}>{name}</p>)}</div></div></section>
 <CountdownSection wedding={wedding}/>
 <section className={styles.venues} aria-label="Lugares y horarios">{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church size={30} strokeWidth={1}/>:<MapPin size={30} strokeWidth={1}/>}<span>{index===0?"Misa":"Recepción"}</span><strong>{place.time}</strong><h2>{place.name}</h2>{place.note&&<p>{place.note}</p>}<p>{place.address}</p></article>)}</section>
 {wedding.rsvpEnabled&&<RSVPSection wedding={{...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Vivian Aholany",groom:""},rsvpSettings:{maxCompanions:0,askCompanions:false,askMenuPreference:false,askAllergies:false,askMessage:false,askSongSuggestion:false}}}/>}
 <footer className={styles.footer}>¡Gracias por celebrar conmigo!</footer></main>}
 {opened&&<button className={styles.music} onClick={toggle} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>Perfect · Ed Sheeran</span></button>}
 </div>;
}
