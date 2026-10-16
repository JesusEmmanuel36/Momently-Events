"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Church, Gift, Mail, MapPin, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { RSVPSection, SongSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";

import { ScheduleSection } from "@/components/sections/EventDetails";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./ArielGabriela.module.css";
const images = "/images/events/ariel-y-gabriela";
export function ArielGabrielaInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Ariel",groom:"Gabriela"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Ariel y Gabriela",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:true,askMessage:true,askSongSuggestion:false}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.introImage} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Ariel y Gabriela"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Ariel <i>&amp;</i> Gabriela</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y plata" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo guinda y sello A y G" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Ariel y Gabriela"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Ariel y Gabriela" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Ariel <i>&amp;</i> Gabriela</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El inicio de nuestra historia</span><p>{wedding.hero.quote}</p><div className={`signature ${styles.fullNames}`}><span>ARIEL REGALADO</span><i>&amp;</i><span>GABRIELA REGALADO</span></div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y follaje verde"/></Reveal><CountdownSection wedding={view}/>
      <section className="section"><Reveal><SectionHeading eyebrow="Hermosillo, Sonora" title="Nuestra celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><Reveal className={styles.placeCard} key={place.name}>{index===0 ? <Church strokeWidth={1}/> : <MapPin strokeWidth={1}/>}<span className="eyebrow">{index===0 ? "Ceremonia religiosa" : "Nuestra celebración"}</span><h2>{place.name}</h2><strong>{index===0 ? place.time : wedding.civil.time}</strong><p>{place.address}</p><a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal>)}</div></section>
      <ScheduleSection wedding={view}/>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <section className={`section gifts ${styles.gifts}`}><Reveal><Gift strokeWidth={1} className="section-icon"/><SectionHeading eyebrow="Mesa de regalos" title="Tu presencia es nuestro mejor regalo" copy={wedding.gifts[1].description}/><a className="button" href={wedding.gifts[0].url} target="_blank" rel="noreferrer">Liverpool · 60025340 <Gift size={16}/></a><p className={styles.envelopeGift}><Mail strokeWidth={1}/> Lluvia de sobres</p></Reveal></section>
      <div className={`${styles.photoCollage} ${galleryExpanded?styles.expanded:""}`}><GallerySection wedding={view} imageSizes="(max-width:700px) 50vw,25vw"/>{wedding.gallery.length>8&&<button className={`button ${styles.galleryToggle}`} type="button" aria-expanded={galleryExpanded} onClick={()=>setGalleryExpanded(!galleryExpanded)}>{galleryExpanded?"Ver menos fotos":"Ver todos nuestros recuerdos"}</button>}</div>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará compartir contigo esta celebración.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:12,location:wedding.ceremony.name+", Hermosillo, Sonora",details:"Ceremonia religiosa: 1:00 p. m. Ceremonia civil: 7:30 p. m. Recepción: 8:30 p. m. Primer baile y fiesta: 9:00 p. m. Cena: 9:30 p. m. "+wedding.reception.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/><SongSection wedding={view}/>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Ariel y Gabriela" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p>Ariel &amp; Gabriela</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
