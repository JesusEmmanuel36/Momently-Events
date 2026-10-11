"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./RicardoBelinda.module.css";
const images = "/images/events/ricardo-y-belinda";
export function RicardoBelindaInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Ricardo",groom:"Belinda"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Rosas blancas y girasoles para la boda de Ricardo y Belinda"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Ricardo <i>&amp;</i> Belinda</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto blanco con detalles verdes" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre blanco con listón verde y sello R y B" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Ricardo y Belinda"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Ricardo y Belinda abrazados" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Ricardo<span className={styles.heroAmp}>&amp;</span>Belinda</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra vida juntos</span><p>{wedding.hero.quote}</p><div className="signature">Ricardo &amp; Belinda</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas blancas y girasoles"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><Heart className={styles.venueIcon} strokeWidth={1}/><SectionHeading eyebrow="Celebra con nosotros" title="Nuestra boda"/><div className={styles.venueInfo}><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p></div></Reveal></section>
      <section className={`section ${styles.formalAttire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Formal" copy="Nos encantará que nos acompañes con un atuendo formal para celebrar este día tan especial."/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:9,location:wedding.reception.address,details:`Boda en ${wedding.reception.name}. Recepción: ${wedding.reception.time}. ${wedding.reception.address}.`})}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Rosas blancas y girasoles para la boda de Ricardo y Belinda" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>nuestra historia.</h2><p>{wedding.couple.partner1}<br/>&amp;<br/>{wedding.couple.partner2}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
