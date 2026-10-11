"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, Gift, Mail, Wine, Utensils, Music, PartyPopper, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GallerySection } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/GuestActions";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./NovalyXv.module.css";

const images = "/images/events/xv-novaly";
export function NovalyXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const open = () => {
    if (opening) return;
    setOpening(true);
    audioRef.current?.play().catch(() => setPlaying(false));
    const openingDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000;
    timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({ top: 0, behavior: "instant" }); }, openingDuration);
  };
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción."));
    else audioRef.current.pause();
  };
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: wedding.eventTitle, text: wedding.hero.quote, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); }
    } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); }
  };
  // Reuse the home invitation sections with this event's data and working RSVP endpoint.
  const view = {
    ...wedding, isLive: true, eventId: wedding.slug,
    couple: { bride: wedding.displayNames.partner1, groom: wedding.displayNames.partner2 },
    images: { hero: wedding.hero.image, gallery: wedding.gallery.map(photo => photo.src) }, galleryItems: wedding.gallery,
    heroSubtitle: wedding.hero.subtitle, heroQuote: wedding.hero.quote,
    dateLong: wedding.dateDisplay,
    welcomeTitle: "Una noche para soñar",
    welcome: [wedding.hero.quote, "Te invito a celebrar mis XV años y a ser parte de una noche llena de alegría y recuerdos inolvidables."],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpMessageLabel: "Mensaje para Novaly Kristell",
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Novaly Kristell" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Novaly<br/><span>Kristell</span></h2><small>07 · 11 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Novaly Kristell" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre negro con detalles dorados y sello N" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Novaly Kristell" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Novaly Kristell" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Novaly<br/>Kristell</h1><div className={styles.birthdayAge}><strong>XV</strong><span>años</span></div><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></Reveal></section><section className="section welcome" id="bienvenida"><Reveal><span className="script">{view.welcomeTitle}</span>{view.welcome.map(text=><p key={text}>{text}</p>)}<div className="signature">Novaly Kristell</div></Reveal></section><Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw, 550px" alt="Rosas rojas y hojas doradas"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Reserva este día" title="Te espero con mucha ilusión"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><Reveal className={styles.placeCard} key={place.name}>{index?<MapPin strokeWidth={1}/>:<Cross strokeWidth={1}/>}<span className="eyebrow">{index?"Recepción":"Ceremonia religiosa"}</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address && <p>{place.address}</p>}{place.mapsUrl && <a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a>}</Reveal>)}</div></section>
      <section className={`section ${styles.itinerary}`} id="itinerario"><Reveal><SectionHeading eyebrow="Una noche inolvidable" title="Mi itinerario"/></Reveal><div className={styles.timeline}>{wedding.itinerary.map((item,index)=>{const Icon=[Cross,Wine,Utensils,Heart,Music][index];return <Reveal className={styles.timelineItem} key={item.time}><Icon strokeWidth={1}/><span>{view.itinerary[index].time}</span><h3>{item.title}</h3></Reveal>;})}</div></section>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.description}/><div className={styles.reservedColor}><span style={{backgroundColor:"#000000"}} aria-label="Color negro"/><p>All Black</p></div></Reveal></section>
      <section className="section gifts"><Reveal><Mail className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Tu presencia es mi mejor regalo" title="Lluvia de sobres" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.ceremony.address || wedding.ceremony.name, details: `${wedding.hero.quote} Ceremonia: ${wedding.ceremony.time}, ${wedding.ceremony.name}. Recepción: ${wedding.reception.time}, ${wedding.reception.name}, ${wedding.reception.address}.` })}>Agregar a mi calendario</button></Reveal></section>
      <section className={`section ${styles.photoMemories}`}><Reveal><SectionHeading eyebrow="Mis recuerdos" title="Instantes que brillan"/></Reveal><div className={styles.galleryContent}><GallerySection wedding={view}/></div></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Me acompañas?</h2><p>También puedes confirmar tu asistencia por WhatsApp.</p><a className="button" href={`${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, Novaly. Quiero confirmar mi asistencia a tus XV años.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>Comparte esta celebración</h2><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Novaly Kristell" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte</span><h2>de mi historia.</h2><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
