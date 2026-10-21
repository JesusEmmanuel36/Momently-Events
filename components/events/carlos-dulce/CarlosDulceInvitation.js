"use client";
import Image from "next/image";
import { ChevronDown, Heart, Mail, Church, MapPin, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";

import {RSVPSection} from "@/components/sections/GuestActions";
import { GallerySection } from "@/components/sections/Gallery";
import styles from "./CarlosDulce.module.css";
const images = "/images/events/carlos-y-dulce";
export function CarlosDulceInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Carlos",groom:"Dulce"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Carlos y Dulce",rsvpSettings:{askCompanions:false,maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:false}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Carlos y Dulce"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2><span>Carlos</span><i>&amp;</i><span>Dulce</span></h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre azul marino abierto con detalles dorados" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre azul marino con rosas blancas y sello dorado C y D" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Carlos y Dulce"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Carlos y Dulce" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Carlos</span><i>&amp;</i><span>Dulce</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas marfil y azul marino con hojas doradas"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Celebra con nosotros" title="Nuestra celebración"/><div className={styles.venues}>{[[wedding.ceremony,'Ceremonia religiosa',Church],[wedding.reception,'Recepción',MapPin]].map(([place,label,Icon])=><article key={label}><Icon strokeWidth={1}/><span className="eyebrow">{label}</span><h3>{place.name}</h3>{place.time&&<strong>{place.time}</strong>}<p>{place.address}</p><a className="button" href={place.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>Ver ubicación</a></article>)}</div></Reveal></section>
      <section className={`section ${styles.attireSection}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,33vw" heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Instantes que forman parte de nuestra historia."}}/>
      {wedding.gifts.length>0&&<section className={`section ${styles.registry}`}><Reveal><Mail strokeWidth={1}/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>}
      <RSVPSection wedding={view}/>

      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Carlos y Dulce" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Carlos &amp; Dulce</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

