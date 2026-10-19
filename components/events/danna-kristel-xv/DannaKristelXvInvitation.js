"use client";
import Image from "next/image";
import { Church, MessageCircle, MapPin, Utensils, PartyPopper, Clock, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import {CountdownSection} from "@/components/sections/CountdownStory";
import {GallerySection} from "@/components/sections/Gallery";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./DannaKristelXv.module.css";
const images = "/images/events/xv-danna-kristel";
function SectionSparkles(){return <div className={styles.sectionSparkles} aria-hidden="true">{[[8,16],[88,22],[15,73],[92,81],[6,44],[79,61],[33,8],[63,90]].map(([left,top],index)=><span key={index} style={{left:`${left}%`,top:`${top}%`,animationDelay:`-${index*.8}s`}}/>)}</div>;}
export function DannaKristelXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new window.MediaMetadata({title:"Photograph",artist:"Danna Kristel",album:"Mis XV años"});}},[playing]);
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2400); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view={...wedding,couple:{bride:"Danna Kristel",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Danna Kristel"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Danna Kristel</h2>{wedding.dateStamp&&<small>{wedding.dateStamp}</small>}<Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto verde esmeralda con interior marfil" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre verde esmeralda con lazo olivo y sello DK dorado" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Danna Kristel"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Danna Kristel" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Danna Kristel</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div>{wedding.dateDisplay&&<p>{wedding.dateDisplay}</p>}<a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className={`section welcome ${styles.sparkleSection}`} id="bienvenida"><SectionSparkles/><Reveal><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">{wedding.couple.partner1}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image unoptimized src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas blancas y orquídeas con hojas esmeralda y olivo"/></Reveal>
      
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi celebración"/><div className={styles.venueGrid}>{[[wedding.ceremony,'Misa',Church],[wedding.banquet,'Banquete',Utensils],[wedding.reception,'Recepción',MapPin]].map(([place,label,Icon])=><article key={label}><Icon strokeWidth={1}/><span className="eyebrow">{label}</span><h3>{place.name}</h3><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}<a className="button" href={place.mapsUrl}><MapPin size={16}/>Ver ubicación</a></article>)}</div></Reveal></section>
      <section className={`section ${styles.itinerary}`}><Reveal><SectionHeading eyebrow="Cada momento será especial" title="Así celebraremos"/><ol>{wedding.itinerary.map(item=>{const Icon={church:Church,meal:Utensils,party:PartyPopper,clock:Clock}[item.icon];return <li key={item.title}><span><Icon strokeWidth={1.2}/></span><div><time>{item.time}</time><h3>{item.title}</h3></div></li>})}</ol></Reveal></section>
      <section className={`section ${styles.attireSection} ${styles.sparkleSection}`}><SectionSparkles/><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/><div className={styles.colorSwatches}>{wedding.dressCode.reservedColors.map(color=><figure key={color.name}><span style={{backgroundColor:color.color}} aria-hidden="true"/><figcaption>{color.name}</figcaption></figure>)}</div></Reveal></section>
      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,33vw" heading={{eyebrow:"Mis momentos",title:"Un recuerdo para siempre"}}/>
      {wedding.contact.whatsapp && <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Me acompañas?" copy="Me hará muy feliz compartir esta celebración contigo."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a los XV años de Danna Kristel el 14 de noviembre de 2026 en la Parroquia de San Cayetano y la Cancha Social Sinahuiza.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>}
      <section className="closing"><Image unoptimized src={wedding.hero.image} fill sizes="100vw" alt="Danna Kristel" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarme en</span><h2>esta nueva etapa.</h2><p className={styles.closingMessage}>{wedding.closingMessage}</p><p>{wedding.couple.partner1}</p>{wedding.dateDisplay&&<small>{wedding.dateDisplay}</small>}<button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}


