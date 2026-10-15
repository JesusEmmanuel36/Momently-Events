"use client";
import Image from "next/image";
import { CalendarDays, Church, MapPin, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import {RSVPSection} from "@/components/sections/GuestActions";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { openGoogleCalendar } from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./YeniYuliana.module.css";
const images = "/images/events/xv-yeni-yuliana";
export function YeniYulianaInvitation({ wedding }) {
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
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Yeni Yuliana",groom:""},dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Yeni Yuliana",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Composición vaquera en marfil, azul noche y verde jade"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Yeni Yuliana</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y azul noche" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo azul noche y sello Y en azul noche" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Yeni Yuliana"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Composición vaquera en marfil, azul noche y verde jade" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Yeni Yuliana</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.ceremony.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><Image className={styles.westernElement} src={`${images}/hat.png`} width={1536} height={1024} alt="Sombrero vaquero azul noche con detalles de plata"/><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Yeni Yuliana</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con el amor de mi familia" title="Quienes me acompañan"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y flores jade con follaje plateado"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Yeni Yuliana",groom:""}}}/>
      <section className={`section ${styles.westernSchedule}`}><Reveal><Image className={styles.westernElement} src={`${images}/boots.png`} width={1305} height={1205} alt="Botas vaqueras bordadas en jade y plata"/><SectionHeading eyebrow="Así celebraremos" title="Un día con espíritu vaquero"/><div className={styles.schedule}><article><strong>10:30 a. m.</strong><h3>Cabalgata</h3></article><article><strong>1:00 p. m.</strong><h3>Misa</h3></article><article><h3>Recepción</h3><p>En casa de la quinceañera</p></article></div></Reveal></section>
      <section className="section"><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi ceremonia y celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,i)=><Reveal className={styles.placeCard} key={i}>{i===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{i===0?"Ceremonia religiosa":"Recepción"}</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}{place.mapsUrl&&<a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a>}</Reveal>)}</div></section>
      <section className="calendar"><Reveal><CalendarDays/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Cabalgata · 10:30 a. m.<br/>Misa · 1:00 p. m.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.ceremony.name+", "+wedding.ceremony.address,details:"Cabalgata a las 10:30 a. m. Misa a la 1:00 p. m. Recepción en casa de la quinceañera."})}>Agregar al calendario</button></Reveal></section>
      <Reveal className={styles.emblem}><Image className={styles.westernElement} src={`${images}/horseshoe.png`} width={1261} height={1247} alt="Herradura plateada y lazo vaquero"/></Reveal>
      <RSVPSection wedding={view}/>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Composición vaquera en marfil, azul noche y verde jade" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
