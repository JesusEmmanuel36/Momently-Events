"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Baby, Gift, Clock, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSection, WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./ValeriaJorge.module.css";

const images = "/images/events/valeria-y-jorge";
export function ValeriaJorgeInvitation({ wedding }) {
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
    welcomeTitle: "Dos corazones se casan y uno más viene en camino",
    welcome: ["Celebramos nuestra unión y la alegría de una nueva vida que viene en camino.", "Acompáñanos a vivir un día lleno de amor, ilusión y una sorpresa que queremos compartir contigo."],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Valeria y Jorge" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Boda y bebé en camino</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Boda y bebé en camino</span><h2>Valeria <i>&amp;</i> Jorge</h2><small>31 · 10 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Valeria y Jorge" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre marfil con listón salvia y sello VJ" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Valeria y Jorge" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <HeroSection wedding={view}/><WelcomeSection wedding={view}/><CountdownSection wedding={view}/>
      <section className={styles.venue} id="detalles">
        <Reveal className={styles.venueDecoration}><div className={styles.arch}><Image src={wedding.reception.image} width={1536} height={1024} sizes="(max-width:800px) 85vw, 550px" alt="Arreglo de flores blancas y salvia" /></div></Reveal>
        <Reveal className={styles.venueCopy}><span className="eyebrow">Nuestra celebración</span><MapPin strokeWidth={1}/><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p></Reveal>
      </section>
      <section className={`section ${styles.timeline}`}><Reveal><SectionHeading eyebrow="Nuestro gran día" title="Así celebraremos"/></Reveal><div className={styles.timelineGrid}>{wedding.itinerary.map((item,index) => <Reveal className={styles.timelineItem} key={item.time}><Clock strokeWidth={1}/><span className="eyebrow">0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></section>
      <section className={`section ${styles.babyGifts}`}><Reveal><Baby className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Un detalle para nuestro bebé" title="¿Team niño o team niña?" copy="Elige tu equipo y acompáñanos a descubrir la sorpresa."/></Reveal><div className={styles.teamGrid}><Reveal className={styles.teamCard}><Gift strokeWidth={1}/><h3>Team niño</h3><p>Si crees que será niño, trae productos de limpieza para bebé o toallitas húmedas.</p></Reveal><Reveal className={styles.teamCard}><Gift strokeWidth={1}/><h3>Team niña</h3><p>Si crees que será niña, trae pañales para darle la bienvenida con mucho cariño.</p></Reveal></div></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.reception.address, details: wedding.hero.quote })}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>Comparte nuestra alegría</h2><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Valeria y Jorge" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte</span><h2>de nuestra historia.</h2><p>Valeria <i>&amp;</i> Jorge</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
