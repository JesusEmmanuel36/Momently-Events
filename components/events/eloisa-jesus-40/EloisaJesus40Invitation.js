"use client";
import Image from "next/image";
import { ChevronDown, Heart, Mail, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";

import { GallerySection } from "@/components/sections/Gallery";
import styles from "./EloisaJesus40.module.css";
const images = "/images/events/eloisa-y-jesus-40";
export function EloisaJesus40Invitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Eloísa",groom:"Jesús"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Eloísa y Jesús",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Eloísa y Jesús"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">40 aniversario · Bodas de rubí</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Bodas de rubí</span><h2><span>Eloísa</span><i>&amp;</i><span>Jesús</span></h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto rubí con interior marfil" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre rubí con flores marfil, lazo champán y sello E y J dorado" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Eloísa y Jesús"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Eloísa y Jesús" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">40 aniversario · Bodas de rubí</span><h1><span>Eloísa</span><i>&amp;</i><span>Jesús</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Cuarenta años de una gran historia</span><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <section className={`section ${styles.anniversary}`}><Reveal><span className="eyebrow">Celebramos nuestro amor</span><strong>40</strong><h2>Bodas de rubí</h2><p>Cuatro décadas de recuerdos y una vida por seguir compartiendo.</p></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas rubí y marfil con orquídeas blancas y detalles dorados"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Celebra con nosotros" title={wedding.reception.name}/><p className={styles.venueAddress}>{wedding.dateDisplay}</p><strong className={styles.eventHours}>{wedding.reception.time}</strong><a className={`button ${styles.mapButton}`} href={wedding.reception.mapsUrl}><MapPin size={16}/>Ver ubicación</a></Reveal></section>
      <section className={`section ${styles.adultsOnly}`}><Reveal><SectionHeading eyebrow="Una noche para compartir" title="Celebración sin niños" copy="Con mucho cariño, les pedimos acompañarnos sin niños. Gracias por su comprensión y por compartir esta noche tan especial con nosotros."/></Reveal></section>
      <section className={`section ${styles.attireSection}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,33vw" heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Del primer sí a los momentos que hoy seguimos compartiendo."}}/>
      <section className={`section ${styles.registry}`}><Reveal><Mail strokeWidth={1}/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Nos hará muy felices contar contigo. Confirma tu asistencia por WhatsApp.</p><div className={styles.contacts}>{wedding.contacts.map(contact=><a key={contact.phone} className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia al 40 aniversario de Eloísa y Jesús el 20 de noviembre de 2026 en Adia Eventos.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Confirmar con Eloísa</a>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Eloísa y Jesús" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>40 años de amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Eloísa &amp; Jesús</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

