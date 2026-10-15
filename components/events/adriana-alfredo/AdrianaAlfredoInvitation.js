"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GallerySection } from "@/components/sections/Gallery";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {openGoogleCalendar} from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";

import styles from "./AdrianaAlfredo.module.css";
const images = "/images/events/adriana-y-alfredo";
export function AdrianaAlfredoInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Adriana",groom:"Alfredo"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Adriana y Alfredo",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Adriana y Alfredo"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda civil</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda civil</span><h2>Adriana <i>&amp;</i> Alfredo</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y terracota" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo terracota y sello A y A" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Adriana y Alfredo"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Adriana y Alfredo" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda civil</span><h1>Adriana <i>&amp;</i> Alfredo</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>Embarcadero · 3:30 p. m.</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className="signature">Adriana y Alfredo</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo floral de rosas terracota, pampas y follaje salvia"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Nuestra boda civil" title={wedding.reception.name} copy="Xochimilco"/><div className={styles.transfer}><span className="eyebrow">Importante · Traslado a la chinampa</span><strong>3:30 p. m. · Puntual</strong><p>Es importante estar en el embarcadero a las 3:30 p. m. en punto para el traslado a la chinampa. Te agradecemos llegar con anticipación.</p></div></Reveal></section>
      <section className={`section ${styles.dress}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Formal"/><p>Se sugiere a las mujeres llevar zapatos bajos o tacones aptos para jardín.</p><p>Los colores azul, blanco y beige están reservados para los novios.</p><p>Te agradecemos evitar jeans, playeras y prendas totalmente negras (total black).</p></Reveal></section>
      <section className={`section ${styles.adults}`}><Reveal><Heart strokeWidth={1}/><SectionHeading eyebrow="Para disfrutar juntos" title="Celebración sin niños" copy={wedding.adultsOnlyMessage}/></Reveal></section>
      <GallerySection wedding={view}/>
      <section className="section gifts"><Reveal><SectionHeading eyebrow="Tu presencia es nuestro mejor regalo" title="Un detalle con cariño" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Embarcadero · 3:30 p. m. puntual</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.reception.name+", "+wedding.reception.address,details:"Celebra nuestra boda con nosotros. Estar en el embarcadero a las 3:30 p. m. puntual para el traslado a la chinampa. Boda civil en Las Ninfas, Xochimilco."})}>Agregar a mi calendario</button></Reveal></section>
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Nos hará muy felices contar contigo. Confirma tu asistencia por WhatsApp.</p><div className={styles.contacts}>{wedding.contacts.map(contact=><a key={contact.phone} className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a la boda de Adriana y Alfredo el 5 de diciembre de 2026.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Confirmar por WhatsApp</a>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Adriana y Alfredo" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Adriana &amp; Alfredo</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
