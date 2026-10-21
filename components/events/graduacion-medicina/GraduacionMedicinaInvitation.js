"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {GraduationCap,MapPin,Clock,ChevronDown,Pause,Play,Sparkles} from "lucide-react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {GallerySection} from "@/components/sections/Gallery";
import {Reveal} from "@/components/ui";
import styles from "./GraduacionMedicina.module.css";
const images="/images/events/graduacion-medicina";
export function GraduacionMedicinaInvitation({event}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false);
 const audio=useRef(null),timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setPlaying(false));timer.current=setTimeout(()=>{setOpened(true);window.scrollTo({top:0,behavior:"instant"});},window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:4200);};
 const toggle=()=>{if(audio.current?.paused)audio.current.play().catch(()=>setPlaying(false));else audio.current?.pause();};
 const view={...event,couple:{bride:"Medicina",groom:"GEN XVIII"},images:{hero:event.hero.image,gallery:event.gallery.map(item=>item.src)},galleryItems:event.gallery,dateLong:event.dateDisplay};
 return <div className={styles.invitation}><audio ref={audio} src={event.music.url} loop preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
 {!opened&&<div className={`${styles.intro} ${opening?styles.opening:""}`}><Image unoptimized src={event.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt=""/><div className={styles.introShade}/><div className={styles.introHeading}><span>Medicina · GEN XVIII</span><h2>Una noche para celebrar</h2></div><div className={styles.envelopeStage}><div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt="Sobre negro abierto con detalles dorados" priority/></div><div className={styles.letter}><GraduationCap size={26} strokeWidth={1}/><span>Fiesta de gala</span><h2>MEDICINA</h2><strong>GEN XVIII</strong><small>{event.dateStamp}</small></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed.png`} width={1536} height={1024} className={styles.closedEnvelope} sizes="(max-width:700px) 98vw,720px" alt="Sobre negro con sello dorado XVIII y laureles" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Medicina GEN XVIII"/></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}<ChevronDown size={16}/></button></div>}
 <main aria-hidden={!opened}><header className={styles.hero}><Image unoptimized src={event.hero.image} fill priority sizes="100vw" alt="Birrete, diploma y detalles de medicina en negro y dorado"/><div className={styles.heroShade}/><div className={styles.heroCopy}><GraduationCap size={48} strokeWidth={1}/><span>Fiesta de gala</span><h1>MEDICINA</h1><h2>GEN XVIII</h2><div className={styles.heroRule}/><p>{event.dateDisplay}</p><a href="#bienvenida">Descubrir la celebración<ChevronDown size={20}/></a></div></header>
 {opened&&<><section className={styles.welcome} id="bienvenida"><Reveal><span className={styles.eyebrow}>El esfuerzo se convierte en celebración</span><h2>Una generación,<br/>un futuro por escribir</h2><p>{event.hero.quote}</p><Image unoptimized src={`${images}/academic.png`} width={2048} height={768} sizes="(max-width:700px) 75vw,380px" className={styles.academic} alt="Birrete, diploma y estetoscopio con laureles dorados"/></Reveal></section>
 <CountdownSection wedding={event}/>
 <section className={styles.venue}><Reveal><MapPin size={34} strokeWidth={1}/><span className={styles.eyebrow}>Nos vemos en</span><h2>{event.reception.name}</h2><p>{event.reception.address}</p><div className={styles.time}><Clock size={20} strokeWidth={1}/>{event.reception.time}</div><small>{event.dateDisplay}</small></Reveal></section>
 <section className={styles.attire}><Reveal><Sparkles size={30} strokeWidth={1}/><span className={styles.eyebrow}>Código de vestimenta</span><h2>Etiqueta</h2><p>{event.dressCode.text}</p></Reveal></section>
 <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,40vw" heading={{eyebrow:"Nuestra generación",title:"Recuerdos que nos unen",copy:"El camino que compartimos también merece celebrarse."}}/>
 <footer className={styles.closing}><GraduationCap size={34} strokeWidth={1}/><p>Por los sueños cumplidos<br/>y los que están por venir.</p><h2>MEDICINA <span>GEN XVIII</span></h2><small>11 de diciembre de 2026</small></footer></>}
 </main>{opened&&<button className={styles.music} onClick={toggle} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={19}/>:<Play size={19}/>}<span>{event.music.label}</span></button>}</div>;
}
