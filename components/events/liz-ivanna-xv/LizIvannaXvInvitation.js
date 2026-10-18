"use client";
import Image from "next/image";
import { Church, MessageCircle, MapPin, ChevronDown, Heart, Crown, Utensils, Music2, Sparkles, PartyPopper, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";


import { LizIvannaAlbum } from "./LizIvannaAlbum";
import styles from "./LizIvannaXv.module.css";
const images = "/images/events/xv-liz-ivanna";
export function LizIvannaXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new window.MediaMetadata({title:"Mi canción",artist:"Liz Ivanna",album:"Mis XV años"});}},[playing]);
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2400); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Liz Ivanna"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Liz Ivanna</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil con interior esmeralda" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo esmeralda y sello LI" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Liz Ivanna"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Liz Ivanna" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Liz Ivanna</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Liz Ivanna</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con el amor de mi familia" title="Mis padres"/>{wedding.parents.map(name=><p key={name}>{name}</p>)}<h3>Mi madrina</h3><p>{wedding.godmother}</p></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image unoptimized src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas marfil, hortensias y follaje salvia y esmeralda"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Liz Ivanna",groom:""}}}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi celebración"/><div className={styles.venueGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{index===0?'Misa':'Recepción'}</span><h3>{place.name}</h3><strong>{place.time}</strong><p>{place.address}</p></article>)}</div></Reveal></section>
      <section className={`section ${styles.itinerary}`}><Reveal><SectionHeading eyebrow="Cada momento será especial" title="Horario de la celebración"/><ol>{wedding.itinerary.map(item=>{const Icon={church:Church,arrival:MapPin,meal:Utensils,crown:Crown,dance:Sparkles,party:PartyPopper,music:Music2}[item.icon];return <li key={item.time}><span className={styles.scheduleIcon}><Icon strokeWidth={1.3}/></span><div><time>{`${Number(item.time.slice(0,2))%12||12}:${item.time.slice(3)} ${Number(item.time.slice(0,2))>=12?'p. m.':'a. m.'}`}</time><h3>{item.title}</h3></div></li>})}</ol></Reveal></section>
      <section className={`section ${styles.attireSection}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <LizIvannaAlbum/>
      {wedding.contact.whatsapp && <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Me acompañas?" copy="Me hará muy feliz compartir esta celebración contigo."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a los XV años de Liz Ivanna el 13 de febrero de 2027.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>}
      <section className="closing"><Image unoptimized src={wedding.hero.image} fill sizes="100vw" alt="Liz Ivanna" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarme en</span><h2>esta nueva etapa.</h2><p className={styles.closingMessage}>{wedding.closingMessage}</p><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}


