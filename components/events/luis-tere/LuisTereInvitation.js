"use client";
import Image from "next/image";
import { CalendarDays, MessageCircle, MapPin, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { GallerySection } from "@/components/sections/Gallery";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { openGoogleCalendar } from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./LuisTere.module.css";
const images = "/images/events/luis-y-tere";
export function LuisTereInvitation({ wedding }) {
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
  return <div className={styles.invitation}>
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Luis y Tere juntos"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda civil</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda civil</span><h2>Luis y Tere</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y café y champagne" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo café y champagne y sello L y T en café y champagne" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Luis y Tere"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Luis y Tere juntos" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda civil</span><h1>Luis y Tere</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.ceremony.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className="signature">Luis y Tere</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y beige con follaje champagne"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Tere",groom:"Luis"}}}/>
      <section className="section"><Reveal><SectionHeading eyebrow="Nuestra ceremonia civil" title={wedding.ceremony.name}/></Reveal><Reveal className={styles.placeCard}><MapPin strokeWidth={1}/><strong>{wedding.ceremony.time}</strong>{wedding.ceremony.address&&<p>{wedding.ceremony.address}</p>}<p>Nos encantará compartir contigo este día tan especial.</p><a className="button" href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal></section>
      <section className="section dress"><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Formal · Todos de negro" copy="Acompáñanos a celebrar vistiendo de negro. Gracias por ser parte de la elegancia de este día tan especial."/><div className="dress__colors"><span style={{background:'#181818',width:48,height:48,borderRadius:'50%'}} aria-label="Vestimenta negra para todos los invitados"/></div></Reveal></section>
      <GallerySection wedding={{...wedding,couple:{bride:"Tere",groom:"Luis"},images:{gallery:wedding.gallery.map(p=>p.src)},galleryItems:wedding.gallery}} fixedOverlay heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Instantes que forman parte de nuestra historia."}}/>
      <section className="section gifts"><Reveal><SectionHeading eyebrow="Tu presencia es nuestro mejor regalo" title="Lluvia de sobres" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Ceremonia civil · 6:00 p. m.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.ceremony.name,details:"Ceremonia civil a las 6:00 p. m. en Ámbar Salón Jardín. Vestimenta formal de negro. "+wedding.ceremony.mapsUrl})}>Agregar al calendario</button></Reveal></section>
      {wedding.contact.whatsapp&&<section className="section"><Reveal><MessageCircle/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Nos acompañas?" copy="Nos hará muy felices celebrar este día contigo."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a la boda civil de Luis y Tere el 10 de enero de 2027.')}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>}
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Luis y Tere juntos" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>nuestro amor.</h2><p>Luis &amp; Tere</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
