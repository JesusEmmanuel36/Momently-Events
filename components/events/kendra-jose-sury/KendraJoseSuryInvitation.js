"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, Gift, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./KendraJoseSury.module.css";

const images = "/images/events/kendrajoseysury";
export function KendraJoseSuryInvitation({ wedding }) {
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
    images: { hero: wedding.hero.image },
    heroSubtitle: wedding.hero.subtitle, heroQuote: wedding.hero.quote,
    dateLong: wedding.dateDisplay,
    welcomeTitle: "Un día lleno de bendiciones",
    welcome: ["Con alegría y gratitud a Dios, celebraremos el bautizo de Kendra Alexandra, José Carlos y Sury Shaddai.", "Nos encantará compartir este momento contigo y guardar juntos un recuerdo lleno de amor."],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpMessageLabel: "Mensaje para nuestra familia",
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Kendra, José y Sury" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Nuestro bautizo</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Nuestro bautizo</span><h2>Kendra Alexandra<br/>José Carlos<br/>Sury Shaddai</h2><small>28 · 11 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1633} height={963} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Kendra, José y Sury" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1633} height={963} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre blanco con listón vino y sello de cruz" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Kendra, José y Sury" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className={`hero ${styles.tripleHero}`} id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Kendra, José y Sury" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestro bautizo</span><Cross className={styles.baptismCross} strokeWidth={1}/><h1>Kendra Alexandra<br/>José Carlos<br/>Sury Shaddai</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></Reveal></section><section className="section welcome" id="bienvenida"><Reveal><span className="script">{view.welcomeTitle}</span>{view.welcome.map(text=><p key={text}>{text}</p>)}<div className="signature">Kendra, José y Sury</div></Reveal></section><Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw, 550px" alt="Flores blancas y rojo vino"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.family}`}><Reveal><Cross strokeWidth={1}/><SectionHeading eyebrow="Con amor y la bendición de Dios" title="Nuestra familia"/><span className="eyebrow">Nuestra madre</span><p>Ana Laura Jiménez Díaz</p><span className="eyebrow">Nuestros padrinos</span><p>Juan Carlos Jiménez Díaz<br/>Juan Clemente García Jerónimo</p></Reveal></section>
      <section className={`section ${styles.prayer}`}><Reveal><Cross strokeWidth={1}/><SectionHeading eyebrow="Una oración para nuestro camino" title="Que Dios guíe nuestros pasos" copy={wedding.hero.quote}/></Reveal></section>
      <section className={`section ${styles.places}`} id="detalles"><Reveal><SectionHeading eyebrow="Celebra con nosotros" title="Un día lleno de fe y alegría"/></Reveal><div className={styles.placeGrid}><Reveal><Cross strokeWidth={1}/><span className="eyebrow">Misa</span><h3>{wedding.ceremony.name}</h3><strong>{wedding.ceremony.time}</strong><p>{wedding.ceremony.address}</p></Reveal><Reveal><Heart strokeWidth={1}/><span className="eyebrow">Calenda</span><h3>Compartamos la alegría</h3><p>Al terminar la ceremonia religiosa, saliendo del atrio de la iglesia.</p></Reveal><Reveal><MapPin strokeWidth={1}/><span className="eyebrow">Recepción</span><h3>{wedding.reception.name}</h3><p>{wedding.reception.address}</p></Reveal></div></section>
      <section className={`section ${styles.gallery}`}><Reveal><SectionHeading eyebrow="Nuestros recuerdos" title="Un recuerdo lleno de ternura"/></Reveal><div className={styles.photoGrid}>{wedding.gallery.map((photo) => <Reveal key={photo.src} className={photo.crop ? styles.croppedPhoto : undefined}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width:800px) 90vw, 550px" alt={photo.alt}/></Reveal>)}</div></section>
      <section className="section gifts"><Reveal><Gift className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Lluvia de sobres" title="Tu presencia es el mejor regalo" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.ceremony.address, details: `${wedding.hero.quote} Misa: 11:00 a. m. Calenda al salir del atrio de la iglesia. Recepción: ${wedding.reception.name}, ${wedding.reception.address}.` })}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Confirma tu asistencia por WhatsApp.</p><div className={styles.contacts}>{wedding.contact.whatsapps.map((contact) => <a className="text-link" href={contact.whatsapp} target="_blank" rel="noreferrer" key={contact.phone}><MessageCircle size={17}/>{contact.phone}</a>)}</div><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Kendra, José y Sury" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte</span><h2>de nuestro bautizo.</h2><p>Kendra, José y Sury</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
