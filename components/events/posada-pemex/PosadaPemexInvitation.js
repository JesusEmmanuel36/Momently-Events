"use client";
import Image from "next/image";
import { MapPin, ChevronDown, Snowflake, TreePine, Bell, Gift, CalendarDays, Share2, Pause, Play, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import {openGoogleCalendar} from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./PosadaPemex.module.css";
const images = "/images/events/posada-d-l-95";
export function PosadaPemexInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [toast, setToast] = useState("");
  const [playing,setPlaying] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(()=>{}); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  return <div className={styles.invitation}>
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>}
    <div className={styles.snow} aria-hidden="true">{Array.from({length:46},(_,i)=><i key={i} style={{left:`${(i*37+7)%100}%`,'--snow-size':`${2+i%5}px`,'--snow-speed':`${9+i%9}s`,'--snow-delay':`${-(i*1.7)}s`,'--snow-drift':`${(i%2?1:-1)*(20+i%45)}px`,opacity:.3+(i%5)*.12}}/>)}</div>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Decoración navideña de pino y esferas"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Posada navideña</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Una celebración para compartir</span><h2>Posada navideña</h2><small>{wedding.dateStamp}</small><Snowflake size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre navideño abierto con moño rojo vino" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre navideño marfil con moño rojo y sello de copo de nieve" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de la posada"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Decoración navideña de pino y esferas" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">{wedding.couple.partner1}</span><h1>Posada<br/>navideña</h1><div className="hero__rule"><span/><Snowflake size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.reception.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Celebremos juntos la magia de la Navidad</span><Image className={styles.associationLogo} src={wedding.logo} width={905} height={1280} sizes="(max-width:700px) 70vw,280px" alt="Logo de la Asociación de Enfermeras de PEMEX Zona Norte A.C."/><p>{wedding.couple.partner1}</p><p>{wedding.hero.quote}</p></Reveal></section>
      <section className={styles.christmasDetails} aria-label="Detalles navideños"><Reveal><TreePine strokeWidth={1}/><span>Un encuentro especial</span></Reveal><Reveal><Bell strokeWidth={1}/><span>Momentos de alegría</span></Reveal><Reveal><Gift strokeWidth={1}/><span>El regalo de compartir</span></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,580px" alt="Guirnalda navideña de pino, esferas y campanas doradas"/></Reveal>
      <CountdownSection wedding={wedding}/>
      <section className="section"><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Nuestra celebración" title={wedding.reception.name}/><p>{wedding.reception.address}</p><p>{wedding.dateDisplay}</p><strong className={styles.receptionTime}>Recepción · {wedding.reception.time}</strong><p className={styles.coverPrice}>{wedding.coverText}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17}/>Ver ubicación</a></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Te esperamos a las {wedding.reception.time}</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:`${wedding.reception.name}, ${wedding.reception.address}`,details:`Invita la ${wedding.couple.partner1}. Recepción a las ${wedding.reception.time}`})}>Agregar al calendario</button></Reveal></section>
      <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Confirmación de asistencia" title="¿Nos acompañas?" copy="Por favor confirma tu asistencia por WhatsApp con Nancy Aracely Flores Vega."/><p>{wedding.contact.display}</p><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent('Hola Nancy, quiero confirmar mi asistencia a la posada de la Asociación de Enfermeras de PEMEX Zona Norte A.C. el 17 de diciembre de 2026 a las 6:00 p. m.')}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Decoración navideña de pino y esferas" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por compartir</span><h2>esta Navidad.</h2><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened&&wedding.music.enabled&&<button className="music-player" onClick={()=>{if(audioRef.current?.paused)audioRef.current.play().catch(()=>notify("Toca de nuevo para escuchar la música."));else audioRef.current?.pause();}} aria-label={playing?"Pausar música":"Reproducir música"}><span>{playing?<Pause/>:<Play/>}</span><span><small>{playing?"Reproduciendo":"Escuchar música"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
