"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./KimberlyMary.module.css";

const images = "/images/events/kimberly-y-mary";
export function KimberlyMaryInvitation({ wedding }) {
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
    welcomeTitle: "Dos alegrías, una celebración",
    welcome: ["Kimberly celebra su graduación como técnica en enfermería y Mary festeja un nuevo año de vida.", "Dos momentos especiales que queremos disfrutar rodeadas de las personas que más queremos. ¡Te esperamos!"],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpMessageLabel: "Mensaje para las festejadas",
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Kimberly y Mary" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Graduación y cumpleaños</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Graduación y cumpleaños</span><h2>Kimberly <i>&amp;</i> Mary</h2><small>31 · 10 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Kimberly y Mary" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1254} height={1254} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre marfil con listón vino y sello KM" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Kimberly y Mary" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className={`hero ${styles.dualHero}`} id="inicio"><div className={styles.heroPortraits}>{wedding.gallery.map((photo, index) => <div className={styles.portrait} key={photo.src}><Image src={photo.src} fill priority sizes="50vw" alt={photo.alt}/><div className={styles.portraitCopy}><span>{index === 0 ? "Mi graduación · Técnica en enfermería" : "Mi cumpleaños"}</span><h1>{index === 0 ? "Kimberly" : "Mary"}</h1></div></div>)}</div><Reveal className={styles.heroDate}><span className="eyebrow">Dos motivos para celebrar</span><p>{wedding.dateDisplay}</p><strong>3:00 p. m.</strong><a href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></Reveal></section><WelcomeSection wedding={view}/><CountdownSection wedding={view}/>
      <section className={styles.venue} id="detalles">
        <Reveal className={styles.venueDecoration}><div className={styles.arch}><Image src={wedding.reception.image} width={1536} height={1024} sizes="(max-width:800px) 85vw, 550px" alt="Arreglo de flores blancas y vino" /></div></Reveal>
        <Reveal className={styles.venueCopy}><span className="eyebrow">Nuestra celebración</span><MapPin strokeWidth={1}/><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p></Reveal>
      </section>
      <section className={`section ${styles.gallery}`}><Reveal><SectionHeading eyebrow="Nuestros recuerdos" title="Momentos para recordar"/></Reveal><div className={styles.photoGrid}>{wedding.gallery.map((photo) => <Reveal key={photo.src}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width:800px) 90vw, 550px" alt={photo.alt}/></Reveal>)}</div></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.reception.address, details: wedding.hero.quote })}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>Estamos para ayudarte</h2><p>Si tienes alguna duda, escríbenos.</p><div className={styles.contacts}>{wedding.contact.whatsapps.map((contact) => <a className="text-link" href={contact.whatsapp} target="_blank" rel="noreferrer" key={contact.phone}><MessageCircle size={17}/>{contact.phone}</a>)}</div><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Kimberly y Mary" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por compartir</span><h2>nuestra alegría.</h2><p>Kimberly <i>&amp;</i> Mary</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
