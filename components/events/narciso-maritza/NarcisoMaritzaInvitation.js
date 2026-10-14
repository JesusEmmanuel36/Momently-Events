"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, MapPin, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";

import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./NarcisoMaritza.module.css";
const images = "/images/events/narciso-y-maritza";
export function NarcisoMaritzaInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Narciso",groom:"Maritza"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Narciso y Maritza",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Narciso y Maritza"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Bodas de plata</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Bodas de plata</span><h2>Narciso <i>&amp;</i> Maritza</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y plata" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo verde olivo y sello N y M en plata" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Narciso y Maritza"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Narciso y Maritza" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Bodas de plata</span><h1>Narciso <i>&amp;</i> Maritza</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.ceremony.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">25 años de amor</span><p>{wedding.hero.quote}</p><div className="signature">Narciso y Maritza</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y follaje verde"/></Reveal><CountdownSection wedding={view}/>
      <section className="section"><Reveal><SectionHeading eyebrow="25 años juntos" title="Nuestra ceremonia y celebración"/></Reveal><div className={styles.singleVenue}><Reveal className={styles.placeCard}><MapPin strokeWidth={1}/><span className="eyebrow">Ceremonia y recepción</span><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><a className="button" href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal></div></section>
      <section className="section dress"><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title}/><p>Acompáñanos vistiendo estos colores.</p><div className={styles.colorPalette}>{wedding.dressCode.colors.map(color=><div key={color.name}><span style={{backgroundColor:color.hex}}/><small>{color.name}</small></div>)}</div></Reveal></section>
      <GallerySection wedding={view}/>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará compartir contigo esta celebración.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,end:wedding.endDate,location:wedding.ceremony.name,details:"Ceremonia y celebración de nuestras bodas de plata, de 2:00 a 7:00 p. m. Ubicación: "+wedding.ceremony.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Narciso y Maritza" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p>Narciso &amp; Maritza</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
