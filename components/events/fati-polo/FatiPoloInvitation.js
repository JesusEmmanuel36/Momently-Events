"use client";
import Image from "next/image";
import { CalendarDays, Church, ChevronDown, Heart, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RSVPSection } from "@/components/sections/GuestActions";
import { GallerySection } from "@/components/sections/Gallery";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {openGoogleCalendar} from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";

import styles from "./FatiPolo.module.css";
const images = "/images/events/fati-y-polo";
export function FatiPoloInvitation({ wedding }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Fati",groom:"Polo"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Fati y Polo",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {opened && <div className={styles.fallingLeaves} aria-hidden="true">{Array.from({length:18},(_,i)=><span key={i} className={styles.leafTrail} style={{left:`${(i*37+11)%100}%`,"--leaf-size":`${13+(i*7)%16}px`,"--fall-duration":`${21+(i*5)%17}s`,"--fall-delay":`${-((i*11)%37)}s`,"--leaf-drift":`${(i%2?1:-1)*(35+(i*13)%65)}px`,"--leaf-turn":`${(i%2?1:-1)*(130+(i*41)%220)}deg`,"--leaf-color":["#647C4C","#91A08A","#BBA57A","#4F6950"][i%4]}}><i className={styles.forestLeaf}/></span>)}</div>}

    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Fati y Polo"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Fati <i>&amp;</i> Polo</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y verde bosque" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo verde bosque y sello F y P" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Fati y Polo"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Fati y Polo" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Fati <i>&amp;</i> Polo</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><strong className={styles.heroTime}>{wedding.ceremony.time}</strong><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className="signature">Fati y Polo</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con el amor de nuestras familias" title="Nuestros padres"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <section className={`section ${styles.family}`}><Reveal><SectionHeading eyebrow="Con cariño y gratitud" title="Nuestros padrinos de velación"/><div className={styles.godparents}>{wedding.godparents.map((name,index)=><div key={name}>{index>0&&<span aria-hidden="true">&amp;</span>}<p>{name}</p></div>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo floral de flores marfil y helechos del bosque"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Nuestro gran día" title="Ceremonia y recepción"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><Reveal key={place.name} className={styles.placeCard}>{index?<MapPin strokeWidth={1}/>:<Church strokeWidth={1}/>}<span className="eyebrow">{index?"Recepción":"Ceremonia religiosa"}</span><h2>{place.name}</h2>{place.time&&<strong>{place.time}</strong>}{place.address&&<p>{place.address}</p>}<a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a></Reveal>)}</div></section>
      <section className={`section ${styles.dress}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={view}/>
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Misa · 2:00 p. m.<br/>Recepción · 6:00 p. m.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.ceremony.name,details:`Misa a las 2:00 p. m. en ${wedding.ceremony.name}. ${wedding.ceremony.mapsUrl} Recepción a las 6:00 p. m. en ${wedding.reception.name}. ${wedding.reception.mapsUrl}`})}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Confirma tu asistencia por WhatsApp con el contacto de Fati o de Polo, según corresponda.</p><div className={styles.contacts}>{wedding.contacts.map(contact=><a key={contact.phone} className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a la boda de Fati y Polo el 26 de diciembre de 2026.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/>{contact.label} · {contact.display}</a>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.closingImage} unoptimized fill sizes="100vw" alt="Fati y Polo" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Fati &amp; Polo</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}


