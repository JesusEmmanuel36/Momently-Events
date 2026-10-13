"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, MapPin, Mail, MessageCircle, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { PersonalizedPass } from "@/components/events/alejandra-david/passes/PersonalizedPass";
import { AbigailAlbum } from "./AbigailAlbum";
import { Reveal, SectionHeading } from "@/components/ui";

import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./AbigailXv.module.css";
const images = "/images/events/xv-abigail";
export function AbigailXvInvitation({ wedding, pass = null, passToken = "" }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Abigail",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Abigail",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Abigail"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Abigail</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto rosa y dorado" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre rosa y dorado con sello A" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Abigail"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Decoración rosa y dorada de los XV años de Abigail" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Abigail</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      {pass && <Reveal className={styles.passSummary}><span className="eyebrow">Este pase es para</span><h2>{pass.displayName}</h2><p>Invitación válida para <strong>{pass.allowedSeats} {pass.allowedSeats === 1 ? "persona" : "personas"}</strong></p><a className="button" href="#tu-pase">Confirmar asistencia</a></Reveal>}
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Una noche para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Abigail</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas rosas y blancas con hojas doradas"/></Reveal><CountdownSection wedding={view}/>
      {wedding.family?.groups && <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con la bendición y el amor de" title="Mis papás y mis padrinos"/><div className={styles.familyGroups}>{wedding.family.groups.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>}
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="Mi gran día" title="Misa y celebración"/></Reveal><Reveal className={styles.placeCard}><MapPin strokeWidth={1}/><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><p>La misa y la celebración serán en el mismo salón.</p><a className="button" href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal></section>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <section className="section gifts"><Reveal><Mail className="section-icon" strokeWidth={1}/><SectionHeading eyebrow="Tu presencia es mi mejor regalo" title={wedding.gifts[0].title} copy={wedding.gifts[0].description}/></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:8,location:wedding.reception.name,details:"Misa a las 5:00 p. m. y celebración en Salón Gina Loren. "+wedding.reception.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
      <AbigailAlbum/>{pass ? <div className={styles.pass}><PersonalizedPass pass={pass} token={passToken} slug={wedding.slug} messageLabel="Mensaje para Abigail"/></div> : <section className={`section ${styles.passNotice}`} id="tu-pase"><Reveal><SectionHeading eyebrow="Una invitación especial para ti" title="Tu pase personalizado" copy="En el enlace de tu pase encontrarás tu nombre, los lugares reservados para ti y el botón para confirmar tu asistencia."/></Reveal></section>}<section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>Estamos para ayudarte</h2><p>Si necesitas ayuda con tu pase, escríbeme por WhatsApp.</p><a className="button" href={`${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, Abigail. Tengo una pregunta sobre mi pase para tus XV años.")}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Contactar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Abigail" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
