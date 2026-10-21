"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Church,MapPin,Utensils,ChevronDown,Pause,Play} from "lucide-react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {RSVPSection} from "@/components/sections/GuestActions";
import {GallerySection} from "@/components/sections/Gallery";
import styles from "./AlissonXv.module.css";
export function AlissonXvInvitation({wedding}){
 const audio=useRef(null);const [playing,setPlaying]=useState(false);
 const toggleMusic=()=>{if(audio.current?.paused)audio.current.play().catch(()=>setPlaying(false));else audio.current?.pause();};
 const [opened,setOpened]=useState(false);const [opening,setOpening]=useState(false);const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setPlaying(false));timer.current=setTimeout(()=>{setOpened(true);window.scrollTo({top:0,behavior:"instant"});},window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:4200);};
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.url} loop preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
 <div className={styles.butterflySky} aria-hidden="true">{Array.from({length:24},(_,i)=><span className={styles.flight} key={i} style={{"--x":`${(i*37)%100}%`,"--size":`${24+(i*13)%35}px`,"--duration":`${18+(i*7)%19}s`,"--delay":`${-i*2.7}s`,"--drift":`${(i%2?1:-1)*(45+(i*17)%110)}px`}}><Image unoptimized src="/images/events/xv-alisson/butterfly.png" width={1254} height={1254} alt=""/></span>)}</div>
 {!opened&&<div className={`${styles.intro} ${opening?styles.opening:""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt=""/><div className={styles.introShade}/><div className={styles.introHeading}><span>Mis XV años</span><h2>Una invitación para ti</h2></div><div className={styles.envelopeStage}>
 <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src="/images/events/xv-alisson/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="Sobre rosa abierto" priority/></div>
 <div className={styles.letter}><span>Mis XV años</span><h2>Alisson</h2><small>13 · 11 · 2026</small></div>
 <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src="/images/events/xv-alisson/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="" priority/></div>
 <Image unoptimized src="/images/events/xv-alisson/envelope-closed.png" width={1536} height={1024} className={styles.closedEnvelope} sizes="(max-width:700px) 98vw,720px" alt="Sobre rosa con flores y sello MY" priority/>
 <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Alisson"/></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}<ChevronDown size={16}/></button></div>}
 <header className={styles.hero}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Alisson con su vestido lila"/><div className={styles.shade}/><div className={styles.heroCopy}><span>Mis XV años</span><h1>Alisson</h1><p>{wedding.dateDisplay}</p><a href="#celebracion">Te esperamos <ChevronDown size={18}/></a></div></header>
 {opened&&<main id="celebracion"><section className={styles.family}><Image unoptimized src="/images/events/xv-alisson/crown.png" width={1536} height={1024} className={styles.floral} sizes="(max-width:700px) 65vw,310px" alt="Corona de plata con joyas moradas"/><span className={styles.familyLabel}>La familia</span><h2>Cebreros Frayjo</h2><p>{wedding.hero.quote}</p><h3 className={styles.invitedName}>Alisson</h3><div className={styles.baptism}><h3>Padrinos de bautizo</h3><div className={styles.baptismGrid}>{wedding.family.baptismGodparents.map(pair=><div key={pair[0]}>{pair.map(name=><p key={name}>{name}</p>)}</div>)}</div></div><div className={styles.godparents}><h3>Padrinos de quinceaños</h3><p>Carmen Silva y Filiberto Felix</p></div></section>
 <CountdownSection wedding={wedding}/>
 <section className={styles.celebration}><h2>Itinerario</h2><div className={styles.venues}>{[[wedding.ceremony,"Misa",Church],[wedding.dinner,"Cena",Utensils],[wedding.reception,"Recepción",MapPin]].map(([place,label,Icon])=><article key={label}><Icon size={30} strokeWidth={1}/><span>{label}</span><strong>{place.time}</strong><h2>{place.name}</h2>{place.address&&<p>{place.address}</p>}<a href={place.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={15}/>Ver ubicación</a></article>)}</div></section>
 <GallerySection wedding={{...wedding,images:{gallery:wedding.gallery.map(p=>p.src)},galleryItems:wedding.gallery,couple:{bride:"Alisson",groom:""}}} fixedOverlay heading={{eyebrow:"Mis recuerdos",title:"Momentos que brillan",copy:"Con ilusión, me preparo para celebrar contigo."}}/>
 <section className={styles.attire}><h2>{wedding.dressCode.title}</h2><span>Código de vestimenta</span><p>{wedding.dressCode.text}</p></section>
 {wedding.rsvpEnabled&&<RSVPSection wedding={{...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Alisson",groom:""},rsvpSettings:{maxCompanions:0,askCompanions:false,askMenuPreference:false,askAllergies:false,askMessage:false,askSongSuggestion:false}}}/>}
 <footer className={styles.footer}>¡Te esperamos!</footer></main>}
 {opened&&<button className={styles.music} onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>{wedding.music.label}</span></button>}
 </div>;
}
