"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Cross, Gift, Mail, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RSVPSection } from "@/components/sections/GuestActions";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./KarlaMichelleXv.module.css";

const images = "/images/events/xv-karla-michelle";
export function KarlaMichelleXvInvitation({ wedding }) {
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
    welcomeTitle: "Una noche para soñar",
    welcome: [wedding.hero.quote, "Te invito a celebrar mis XV años y a ser parte de una noche llena de alegría y recuerdos inolvidables."],
    itinerary: wedding.itinerary.map((item) => ({ ...item, time: `${Number(item.time.split(":")[0]) - 12}:${item.time.split(":")[1]} p. m.` })),
    rsvpMessageLabel: "Mensaje para Karla Michelle",
    rsvpSettings: { maxCompanions: wedding.maxCompanions, askMenuPreference: false, askAllergies: false, askMessage: true },
  };
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Karla Michelle" />
      <div className={styles.introShade} />
      <div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Karla<br/><span>Michelle</span></h2><small>26 · 12 · 2026</small><Heart size={18}/></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1635} height={962} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto de Karla Michelle" priority /></div>
          <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1635} height={962} sizes="(max-width:700px) 90vw, 650px" className={styles.openEnvelopeArtwork} alt="" priority /></div>
          <Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw, 720px" className={styles.closedEnvelope} alt="Sobre celeste con listón marfil y sello K" priority />
          <button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir la invitación de Karla Michelle" />
        </div>
        <button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button>
      </div>
    </div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Karla Michelle" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Karla<br/>Michelle</h1><div className={styles.birthdayAge}><strong>XV</strong><span>años</span></div><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></Reveal></section><section className="section welcome" id="bienvenida"><Reveal><span className="script">{view.welcomeTitle}</span>{view.welcome.map(text=><p key={text}>{text}</p>)}<div className="signature">Karla Michelle</div></Reveal></section><Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1961} height={802} sizes="(max-width:800px) 90vw, 550px" alt="Flores blancas y celestes"/></Reveal><CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Reserva este día" title="Te espero con mucha ilusión"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><Reveal className={styles.placeCard} key={place.name}>{index?<MapPin strokeWidth={1}/>:<Cross strokeWidth={1}/>}<span className="eyebrow">{index?"Recepción":"Ceremonia religiosa"}</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address && <p>{place.address}</p>}{place.mapsUrl && <a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a>}</Reveal>)}</div></section>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Ropa cómoda" copy="Ven con un atuendo cómodo y muchas ganas de disfrutar esta celebración."/></Reveal></section>
      <section className="section gifts"><Reveal><Mail className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Tu presencia es mi mejor regalo" title="Lluvia de sobres" copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={() => openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, durationHours: 8, location: wedding.ceremony.address, details: `${wedding.hero.quote} Ceremonia: ${wedding.ceremony.time}, ${wedding.ceremony.name}. Recepción: ${wedding.reception.time}, ${wedding.reception.name}, ${wedding.reception.address}.` })}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><Heart strokeWidth={1}/><h2>Comparte esta celebración</h2><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Karla Michelle" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte</span><h2>de mi historia.</h2><p>Karla Michelle</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
