"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, MapPin, Mail, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection, StorySection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { PersonalizedPass } from "@/components/events/alejandra-david/passes/PersonalizedPass";
import { ClaudiaAlbum } from "./ClaudiaAlbum";
import { ScheduleSection, ImportantSection } from "@/components/sections/EventDetails";
import { Reveal, SectionHeading } from "@/components/ui";

import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./ClaudiaPorfirio.module.css";
const images = "/images/events/claudia-y-porfirio";
export function ClaudiaPorfirioInvitation({ wedding, pass = null, passToken = "" }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Claudia",groom:"Porfirio"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Claudia y Porfirio",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Claudia y Porfirio"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Claudia <i>&amp;</i> Porfirio</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto café y beige" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre café y beige con sello C y P" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Claudia y Porfirio"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Decoración floral café y beige de nuestra boda" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Claudia <i>&amp;</i> Porfirio</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      {pass && <Reveal className={styles.passSummary}><span className="eyebrow">Este pase es para</span><h2>{pass.displayName}</h2><p>Invitación válida para <strong>{pass.allowedSeats} {pass.allowedSeats === 1 ? "persona" : "personas"}</strong></p><a className="button" href="#tu-pase">Confirmar asistencia</a></Reveal>}
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Comienza una nueva historia</span><p>{wedding.hero.quote}</p><p>{wedding.welcomeText}</p><div className="signature">Claudia y Porfirio</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y flores beige con hojas suaves"/></Reveal><CountdownSection wedding={view}/><StorySection wedding={view}/><GallerySection wedding={view} imageSizes="(max-width:600px) 90vw, 33vw" heading={{eyebrow:"El amor en los detalles",title:"Una nueva historia juntos",copy:"Cada detalle nos recuerda la ilusión de compartir este día contigo."}}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Nuestra celebración" title="Salón y Jardín Haida"/></Reveal><Reveal className={styles.placeCard}><MapPin strokeWidth={1}/><h2>{wedding.ceremony.name}</h2><strong>Ceremonia civil · {wedding.ceremony.time}</strong><p>Recepción · {wedding.reception.time}<br/>Cena · 7:30 p. m.</p><p>{wedding.reception.address}</p><a className="button" href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal></section>
      <ScheduleSection wedding={view}/><ImportantSection wedding={view}/>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <section className="section gifts"><Reveal><Mail className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Tu presencia es nuestro mejor regalo" title={wedding.gifts[0].title} copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:8,location:wedding.reception.name+", "+wedding.reception.address,details:"Ceremonia civil: 5:30 p. m. Recepción: 6:30 p. m. Cena: 7:30 p. m. "+wedding.reception.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
      <ClaudiaAlbum/>{pass ? <div className={styles.pass}><PersonalizedPass pass={pass} token={passToken} slug={wedding.slug} messageLabel="Mensaje para Claudia y Porfirio"/></div> : <section className={`section ${styles.passNotice}`} id="tu-pase"><Reveal><SectionHeading eyebrow="Una invitación especial para ti" title="Tu pase personalizado" copy="En el enlace de tu pase encontrarás tu nombre, los lugares reservados para ti y el botón para confirmar tu asistencia."/></Reveal></section>}
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Claudia y Porfirio" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>nuestra historia.</h2><p>Claudia &amp; Porfirio</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
