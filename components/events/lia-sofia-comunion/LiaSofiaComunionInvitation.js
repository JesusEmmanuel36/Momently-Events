"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Church,MapPin,MessageCircle,ChevronDown,Pause,Play} from "lucide-react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import styles from "./LiaSofiaComunion.module.css";
export function LiaSofiaComunionInvitation({wedding}){
 const audio=useRef(null);const [playing,setPlaying]=useState(false);
 const toggleMusic=()=>{if(audio.current?.paused)audio.current.play().catch(()=>setPlaying(false));else audio.current?.pause();};
 const [opened,setOpened]=useState(false);const [opening,setOpening]=useState(false);const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setPlaying(false));timer.current=setTimeout(()=>{setOpened(true);window.scrollTo({top:0,behavior:"instant"});},window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:4200);};
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.url} loop preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
 {!opened&&<div className={`${styles.intro} ${opening?styles.opening:""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt=""/><div className={styles.introShade}/><div className={styles.introHeading}><span>Mi primera comunión</span><h2>Una invitación para ti</h2></div><div className={styles.envelopeStage}>
 <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src="/images/events/comunion-lia-sofia/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="Sobre beige abierto" priority/></div>
 <div className={styles.letter}><span>Mi primera comunión</span><h2>Lía Sofía</h2><small>28 · 11 · 2026</small></div>
 <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src="/images/events/comunion-lia-sofia/envelope-open.png" width={1536} height={1024} className={styles.openEnvelopeArtwork} sizes="(max-width:700px) 98vw,720px" alt="" priority/></div>
 <Image unoptimized src="/images/events/comunion-lia-sofia/envelope-closed.png" width={1536} height={1024} className={styles.closedEnvelope} sizes="(max-width:700px) 98vw,720px" alt="Sobre beige con flores, ramas de olivo y una cruz dorada" priority/>
 <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Lía Sofía"/></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}<ChevronDown size={16}/></button></div>}
 <header className={styles.hero}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Lía Sofía en su primera comunión"/><div className={styles.shade}/><div className={styles.heroCopy}><span>Mi primera comunión</span><h1>Lía <br/>Sofía</h1><p>{wedding.dateDisplay}</p><a href="#celebracion">Te espero <ChevronDown size={18}/></a></div></header>
 {opened&&<main id="celebracion"><section className={styles.family}><Image unoptimized src="/images/events/comunion-lia-sofia/floral.png" width={1536} height={1024} className={styles.floral} sizes="(max-width:700px) 65vw,310px" alt="Arreglo de rosas marfil, olivo y cáliz de comunión"/><h2>Un día muy especial</h2><p>{wedding.hero.quote}</p><div className={styles.familyGrid}><div><h3>Mis papás</h3>{wedding.family.parents.map(name=><p key={name}>{name}</p>)}</div><div><h3>Mi madrina</h3>{wedding.family.godparents.map(name=><p key={name}>{name}</p>)}</div></div></section>
 <CountdownSection wedding={wedding}/>
 <section className={styles.venues} aria-label="Lugares y horarios">{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church size={30} strokeWidth={1}/>:<MapPin size={30} strokeWidth={1}/>}<span>{index===0?"Misa":"Recepción"}</span>{place.time&&<strong>{place.time}</strong>}<h2>{place.name}</h2>{place.note&&<p>{place.note}</p>}<p>{place.address}</p>{place.mapsUrl&&<a className={styles.locationButton} href={place.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>Ver ubicación</a>}</article>)}</section>
 <section className={styles.confirmation}><MessageCircle size={32} strokeWidth={1}/><h2>¿Me acompañas?</h2><p>Me encantará compartir contigo este día tan especial. Confirma tu asistencia por WhatsApp.</p><a href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a la primera comunión de Lía Sofía el 28 de noviembre de 2026.")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar por WhatsApp</a></section>
 <footer className={styles.footer}>¡Gracias por celebrar conmigo!</footer></main>}
 {opened&&<button className={styles.music} onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>{wedding.music.label}</span></button>}
 </div>;
}
