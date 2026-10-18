"use client";
import Image from "next/image";
import { ChevronDown, Heart, Gift, Church, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";

import { GallerySection } from "@/components/sections/Gallery";
import styles from "./AlbertoAraceli.module.css";
const images = "/images/events/alberto-y-araceli";
export function AlbertoAraceliInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Alberto",groom:"Araceli"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Alberto y Araceli",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Alberto y Araceli"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2><span>Alberto</span><i>&amp;</i><span>Araceli</span></h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto guinda con interior marfil" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre guinda con rosas rojas, lazo rojo y sello A y A" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Alberto y Araceli"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Alberto y Araceli" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Alberto</span><i>&amp;</i><span>Araceli</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas rojas, guinda y marfil con eucalipto"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Nuestra celebración" title="Acompáñanos"/><div className={styles.venues}>{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{index===0?'Ceremonia religiosa':'Recepción'}</span><h3>{place.name}</h3><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}</article>)}</div></Reveal></section>
      <section className={`section ${styles.attireSection}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,33vw" heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Instantes que forman parte de nuestra historia."}}/>
      <section className={`section ${styles.registry}`}><Reveal><Gift strokeWidth={1}/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Nos hará muy felices contar contigo. Confirma tu asistencia por WhatsApp.</p><div className={styles.contacts}>{wedding.contacts.map(contact=><a key={contact.phone} className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a la boda de Alberto y Araceli el 21 de noviembre de 2026.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Confirmar por WhatsApp</a>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Alberto y Araceli" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Alberto &amp; Araceli</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

