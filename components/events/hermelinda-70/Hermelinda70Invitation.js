"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, Gift, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./Hermelinda70.module.css";

const images = "/images/events/hermelinda-70";
export function Hermelinda70Invitation({ wedding }) {
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
    welcomeTitle: "Setenta años de amor y bendiciones",
    welcome: ["Doy gracias a Dios por permitirme llegar a mis 70 años y por el amor incondicional de mis hijos, reflejado en este gran festejo.", "Hermelinda Mejía Villa"],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpMessageLabel: "Mensaje para Hermelinda",
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Hermelinda Mejía Villa" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Mis 70 años</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Mis 70 años</span><h2>Hermelinda<br/><span>Mejía Villa</span></h2><small>28 · 10 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Hermelinda Mejía Villa" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre marfil con listón dorado y sello H" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Hermelinda Mejía Villa" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Hermelinda Mejía Villa" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Celebrando la vida</span><h1>Hermelinda</h1><p className={styles.heroSurname}>Mejía Villa</p><div className={styles.birthdayAge}><strong>70</strong><span>años</span></div><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></Reveal></section><WelcomeSection wedding={view}/><Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw, 550px" alt="Flores blancas con detalles dorados"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Con gratitud a Dios" title="Celebremos juntos"/></Reveal><div className={styles.placeGrid}><Reveal className={styles.placeCard}><Cross strokeWidth={1}/><span className="eyebrow">Misa de acción de gracias</span><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><p>{wedding.ceremony.address}</p><p>La misa de acción de gracias se llevará a cabo a las 5:00 p. m. en la Iglesia de San Juan Nepomuceno, en Jalapa, Guerrero.</p><p>Su presencia en mi misa de cumpleaños será el mejor regalo. ¡Dios los bendiga por estar conmigo!</p></Reveal><Reveal className={styles.placeCard}><MapPin strokeWidth={1}/><span className="eyebrow">Recepción</span><h2>{wedding.reception.name}</h2><p>{wedding.reception.time}</p></Reveal></div></section>
      <section className="section gifts"><Reveal><Gift className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Lluvia de sobres" title="Tu presencia es el mejor regalo" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.ceremony.address, details: `${wedding.hero.quote} Misa de acción de gracias a las 5:00 p. m. en ${wedding.ceremony.name}, ${wedding.ceremony.address}. Recepción en domicilio conocido después de la misa.` })}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>Comparte esta celebración</h2><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Hermelinda Mejía Villa" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte</span><h2>de mi historia.</h2><p>Hermelinda Mejía Villa</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
