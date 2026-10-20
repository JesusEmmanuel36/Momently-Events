"use client";
import Image from "next/image";
import { Church, MessageCircle, MapPin, Mail, ChevronDown, Heart, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./FernandaXv.module.css";
const images = "/images/events/xv-fernanda";
function SectionSparkles({dense=false}){return <div className={styles.sectionSparkles} aria-hidden="true">{(dense?[[5,10],[14,17],[25,7],[40,13],[59,6],[76,14],[91,9],[97,24],[4,32],[14,39],[87,34],[95,46],[5,56],[12,66],[89,61],[97,73],[4,83],[16,92],[29,86],[43,96],[59,89],[73,96],[87,88],[96,96],[33,25],[66,29],[36,76],[63,78]]:[[8,16],[88,22],[15,73],[92,81],[6,44],[79,61],[33,8],[63,90]]).map(([left,top],index)=><span key={index} style={{left:`${left}%`,top:`${top}%`,animationDelay:`-${index*.8}s`}}/>)}</div>;}
export function FernandaXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new window.MediaMetadata({title:"Mi canción",artist:"Fernanda",album:"Mis XV años"});}},[playing]);
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2400); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Fernanda"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Fernanda</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto blush con interior marfil y oro rosa" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre blush con lazo y sello F en oro rosa" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Fernanda"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Fernanda" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Fernanda</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className={`section welcome ${styles.sparkleSection}`} id="bienvenida"><SectionSparkles/><Reveal><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">{wedding.couple.partner1}</div></Reveal></section>
      <section className={`section ${styles.family} ${styles.sparkleSection}`}><SectionSparkles/><Reveal><SectionHeading eyebrow="Con el amor de mi familia" title="Quienes me acompañan"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image unoptimized src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas blush y marfil con hojas oro rosa"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Fernanda",groom:""}}}/>
      <section className={`section ${styles.celebration} ${styles.sparkleSection}`}><SectionSparkles dense/><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi celebración"/><div className={styles.venueGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{index===0?'Misa':'Recepción'}</span><h3>{place.name}</h3><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}</article>)}</div>{wedding.reception.mapsUrl&&<a className={`button ${styles.locationButton}`} href={wedding.reception.mapsUrl}><MapPin size={16}/>Ver ubicación</a>}</Reveal></section>
      <section className={`section ${styles.attireSection} ${styles.sparkleSection}`}><SectionSparkles/><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/><div className={styles.colorSwatches}>{wedding.dressCode.reservedColors.map(color=><figure key={color.name}><span style={{backgroundColor:color.color}} aria-hidden="true"/><figcaption>{color.name}</figcaption></figure>)}</div></Reveal></section>
      <section className={`section gifts ${styles.sparkleSection}`}><SectionSparkles/><Reveal><Mail strokeWidth={1} className="section-icon"/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].intro}/><p className={styles.giftMessage}>{wedding.gifts[0].description}</p><p className={styles.giftMessage}>{wedding.gifts[0].note}</p></Reveal></section>
      {wedding.contact.whatsapp && <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Me acompañas?" copy="Me hará muy feliz compartir esta celebración contigo."/><p className={styles.deadline}>{wedding.confirmationDeadlineText}</p><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a los XV años de Fernanda el 12 de diciembre de 2026.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>}
      <section className="closing"><Image unoptimized src={wedding.closingImage || wedding.hero.image} fill sizes="100vw" alt="Fernanda" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarme en</span><h2>esta nueva etapa.</h2><p className={styles.closingMessage}>{wedding.closingMessage}</p><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}


