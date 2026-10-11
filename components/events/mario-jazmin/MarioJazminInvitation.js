"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { MarioJazminRSVP } from "./MarioJazminRSVP";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./MarioJazmin.module.css";
const images = "/images/events/mario-y-jazmin";
export function MarioJazminInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Mario",groom:"Jazmin"},images:{hero:wedding.hero.image},dateLong:wedding.dateDisplay,rsvpSettings:{maxCompanions:1,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Anillos y flores en un jardín de hacienda"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Mario <i>&amp;</i> Jazmin</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto verde olivo" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre verde olivo con sello M y J" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Mario y Jazmin"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Anillos de boda entre flores y ramas de olivo" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Mario<span className={styles.heroAmp}>&amp;</span>Jazmin</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra vida juntos</span><p>{wedding.hero.quote}</p><div className="signature">Mario &amp; Jazmin</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas blancas y ramas de olivo"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Reserva este día" title="Nuestra ceremonia y celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,index) => <Reveal className={styles.placeCard} key={place.name}>{index ? <MapPin strokeWidth={1}/> : <Cross strokeWidth={1}/>}<span className="eyebrow">{index ? "Recepción" : "Ceremonia religiosa"}</span><h2>{place.name}</h2><strong>{place.time}</strong><p>{place.address}</p><a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal>)}</div></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:9,location:wedding.ceremony.address,details:`Ceremonia: ${wedding.ceremony.name}, ${wedding.ceremony.time}. Recepción: ${wedding.reception.name}, ${wedding.reception.time}, ${wedding.reception.address}.`})}>Agregar a mi calendario</button></Reveal></section>
      <MarioJazminRSVP wedding={view}/><section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>Estamos para ayudarte</h2><p>También puedes confirmar tu asistencia por WhatsApp.</p><a className="button" href={`${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, Mario y Jazmin. Quiero confirmar mi asistencia a su boda.")}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Confirmar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Flores y anillos de boda" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>nuestra historia.</h2><p>Mario &amp; Jazmin</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
