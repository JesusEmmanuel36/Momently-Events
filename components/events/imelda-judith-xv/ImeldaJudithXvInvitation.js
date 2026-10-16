"use client";
import Image from "next/image";
import { Church, MapPin, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import {RSVPSection} from "@/components/sections/GuestActions";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./ImeldaJudithXv.module.css";
const images = "/images/events/xv-imelda-yudith";
export function ImeldaJudithXvInvitation({ wedding }) {
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
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Imelda Judith",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Imelda Judith",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Imelda Judith"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Imelda Judith</h2>{wedding.dateStamp&&<small>{wedding.dateStamp}</small>}<Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil con interior rojo y detalles dorados" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo rojo, rosas y sello I dorado" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Imelda Judith"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Imelda Judith" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Imelda Judith<small>Durazo</small></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div>{wedding.dateDisplay&&<p>{wedding.dateDisplay}</p>}<strong className={styles.heroTime}>{wedding.ceremony.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Imelda Judith</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con cariño y gratitud" title="Mis padrinos" copy="Gracias por acompañarme y ser parte de este momento tan especial."/><div className={styles.godparentGrid}>{wedding.godparents.map((names,index)=><article key={index}>{names.map((name,i)=><div key={name}>{i>0&&<span className={styles.pairAnd}>&amp;</span>}<p>{name}</p></div>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas rojas con follaje dorado"/></Reveal>
      
      {wedding.date&&<CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Imelda Judith",groom:""}}}/>}
      <section className="section"><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi ceremonia y celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,i)=><Reveal className={styles.placeCard} key={i}>{i===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{i===0?"Ceremonia religiosa":"Recepción"}</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}{place.mapsUrl&&<a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a>}</Reveal>)}</div></section>

      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Para mis invitados" title={wedding.dressCode.title} copy={wedding.dressCode.text}/><span className={styles.reservedColor} aria-label="Rojo reservado para Imelda Judith"/></Reveal></section>
      <RSVPSection wedding={view}/>

      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Imelda Judith" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p>{wedding.dateDisplay&&<small>{wedding.dateDisplay}</small>}<button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

