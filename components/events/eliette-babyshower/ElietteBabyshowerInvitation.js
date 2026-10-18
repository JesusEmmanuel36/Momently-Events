"use client";
import Image from "next/image";
import { Heart as BabyHeart, MapPin, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./ElietteBabyshower.module.css";
const images = "/images/events/eliette-babyshower";
export function ElietteBabyshowerInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new window.MediaMetadata({title:"Mi canción",artist:"Amalia",album:"Baby shower"});}},[playing]);
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Amalia",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para nuestra familia",rsvpSettings:{maxCompanions:5,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Osito, zapatitos y flores rosas"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Baby shower</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Baby shower</span><h2>Amalia</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y rosa pastel" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo rosa pastel y sello E" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Amalia"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Osito, zapatitos y flores rosas" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Estás invitado a mi baby shower</span><h1>Amalia</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.reception.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><BabyHeart className={styles.welcomeCrown} strokeWidth={1} aria-hidden="true"/><span className="script">Una dulce espera</span><p>{wedding.hero.quote}</p><div className="signature">Amalia</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con todo nuestro amor" title="Mis papás"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas rosa pastel y marfil con follaje verde salvia"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Amalia",groom:""}}}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Celebremos esta dulce espera" title="Nuestro baby shower"/><p className={styles.eventDate}>{wedding.dateDisplay}</p><strong className={styles.eventTime}>{wedding.reception.time}</strong><p className={styles.address}>{wedding.reception.address}</p></Reveal></section>
      <section className="section dress"><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Un toque de rosa" copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} heading={{eyebrow:"Nuestros primeros recuerdos",title:"Antes de conocerte",copy:"Cada latido y cada instante de esta espera nos acercan a ti."}}/>
      <RSVPSection wedding={view}/>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Osito, zapatitos y flores rosas" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarnos en</span><h2>esta dulce espera.</h2><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
