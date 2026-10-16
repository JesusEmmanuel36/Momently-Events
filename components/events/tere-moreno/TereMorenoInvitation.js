"use client";
import Image from "next/image";
import { PersonalizedPass } from "@/components/events/alejandra-david/passes/PersonalizedPass";
import { MessageCircle, MapPin, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./TereMoreno.module.css";
const images = "/images/events/tere-moreno";
export function TereMorenoInvitation({ wedding, pass = null, passToken = null }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new window.MediaMetadata({title:"Mi canción",artist:"Tere Moreno",album:"Cumpleaños y jubilación"});}},[playing]);
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Tere Moreno",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para nuestra familia",rsvpSettings:{maxCompanions:5,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Tere Moreno"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Cumpleaños y jubilación</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Cumpleaños y jubilación</span><h2>Tere Moreno</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y azul petróleo" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo azul petróleo y sello T" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Tere Moreno"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Tere Moreno" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Cumpleaños y jubilación</span><h1>Tere Moreno</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      {pass&&<Reveal className={styles.passSummary}><span className="eyebrow">Este pase es para</span><h2>{pass.displayName}</h2><p>Invitación válida para <strong>{pass.allowedSeats} {pass.allowedSeats===1?"persona":"personas"}</strong></p><a className="button" href="#tu-pase">Confirmar asistencia</a></Reveal>}
      <section className="section welcome" id="bienvenida"><Reveal><Heart className={styles.welcomeCrown} strokeWidth={1} aria-hidden="true"/><span className="script">Celebrar la vida</span><p>{wedding.hero.quote}</p><div className="signature">Tere Moreno</div></Reveal></section>
      <section className={`section ${styles.milestones}`}><Reveal><SectionHeading eyebrow="Dos motivos para agradecer" title="Una nueva etapa para disfrutar"/><div className={styles.milestoneGrid}><article><Heart strokeWidth={1}/><h3>Mi cumpleaños</h3><p>La alegría de celebrar la vida junto a quienes más quiero.</p></article><article><span className={styles.milestoneStar} aria-hidden="true">✦</span><h3>Mi jubilación</h3><p>Un camino que agradezco y nuevos sueños que comienzan.</p></article></div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil, dalias y follaje verde salvia con detalles azul petróleo"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date+"T00:00:00-06:00",couple:{bride:"Tere Moreno",groom:""}}}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Acción de gracias y recepción" title={wedding.reception.name}/><p className={styles.eventDate}>{wedding.dateDisplay}</p><p className={styles.address}>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a></Reveal></section>
      <section className="section dress"><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view} heading={{eyebrow:"Recuerdos que atesoro",title:"Una vida llena de momentos",copy:"Personas, lugares y recuerdos que siempre llevo en el corazón."}}/>
      {pass?<PersonalizedPass pass={pass} token={passToken} slug={wedding.slug} messageLabel="Mensaje para Tere"/>:<section className={`section ${styles.passSummary}`} id="tu-pase"><Reveal><SectionHeading eyebrow="Una invitación especial para ti" title="Tu pase personalizado" copy="En el enlace de tu pase encontrarás tu nombre, los lugares reservados para ti y el botón para confirmar tu asistencia."/></Reveal></section>}
      <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="¿Tienes alguna duda?" title="Escríbeme"/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, Tere. Tengo una duda sobre tu celebración del 5 de diciembre de 2026.")}`} target="_blank" rel="noreferrer">Contactar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Tere Moreno" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarme en</span><h2>esta nueva etapa.</h2><p className={styles.closingMessage}>{wedding.closingMessage}</p><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

