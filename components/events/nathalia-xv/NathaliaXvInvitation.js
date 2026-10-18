"use client";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { GallerySection } from "@/components/sections/Gallery";

import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./NathaliaXv.module.css";
const images = "/images/events/xv-nathalia";
export function NathaliaXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Nathalia Isabella",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Nathalia Isabella",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>{opened&&<div className={styles.sparkles} aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{left:`${(i*29+7)%100}%`,top:`${(i*37+11)%100}%`,animationDelay:`${i*.33}s`}}/>)}</div>}
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Nathalia Isabella"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Nathalia Isabella</h2>{wedding.dateStamp&&<small>{wedding.dateStamp}</small>}<Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y rosa pastel" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo rosa pastel y sello NI en rosa pastel" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Nathalia Isabella"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Nathalia Isabella" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Nathalia Isabella</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div>{wedding.dateDisplay&&<p>{wedding.dateDisplay}</p>}<a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><Image src={`${images}/crown.png`} unoptimized width={1536} height={1024} className={styles.crown} alt="Corona con cristales rosa y azul"/><span className="script">Una noche para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Nathalia Isabella</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con el amor de mi familia" title="Quienes me acompañan"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image unoptimized src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas rosas y marfil con follaje salvia"/></Reveal>
      
      {wedding.date&&<CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Nathalia Isabella",groom:""}}}/>}
      <section className="section"><Reveal><SectionHeading eyebrow="Mi celebración" title={wedding.reception.name}/><div className={styles.partyCard}><MapPin strokeWidth={1}/><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl}>Ver ubicación</a></div></Reveal></section>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} fixedOverlay heading={{eyebrow:'Mis recuerdos',title:'Momentos para atesorar',copy:'La ilusión de una nueva etapa llena de sueños.'}}/>
      <section className="section gifts"><Reveal><Mail strokeWidth={1} className="section-icon"/><SectionHeading eyebrow="Un detalle con cariño" title="Lluvia de sobres" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className={`section ${styles.whatsappContact}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Me acompañas?"/><p className={styles.deadline}>{wedding.confirmationDeadlineText}</p><div className={styles.contactOptions}>{wedding.contacts.map(contact=><div key={contact.phone}><a className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a los XV años de Nathalia Isabella el 5 de diciembre de 2026.')}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a><p>{contact.display}</p></div>)}</div></Reveal></section>
      <section className="closing"><Image unoptimized src={wedding.hero.image} fill sizes="100vw" alt="Nathalia Isabella" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p>{wedding.dateDisplay&&<small>{wedding.dateDisplay}</small>}<button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

