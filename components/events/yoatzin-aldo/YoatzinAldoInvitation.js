"use client";
import Image from "next/image";
import { ChevronDown, Heart, Mail, Utensils, Clock, Church, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";

import {GallerySection} from "@/components/sections/Gallery";
import {PersonalizedPass} from "@/components/events/alejandra-david/passes/PersonalizedPass";
import {YoatzinAldoAlbum} from "./YoatzinAldoAlbum";
import styles from "./YoatzinAldo.module.css";
const images = "/images/events/yoatzin-y-aldo";
export function YoatzinAldoInvitation({ wedding, pass = null, passToken = null }) {
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
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Yoatzin",groom:"Aldo"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Yoatzin y Aldo",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Yoatzin y Aldo"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2><span>Yoatzin</span><i>&amp;</i><span>Aldo</span></h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto azul marino con interior marfil y dorado" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre azul marino con flores blancas, lazo y sello Y y A dorado" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Yoatzin y Aldo"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Yoatzin y Aldo" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Yoatzin</span><i>&amp;</i><span>Aldo</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      {pass&&<Reveal className={styles.passSummary}><span className="eyebrow">Este pase es para</span><h2>{pass.displayName}</h2><p>Invitación válida para <strong>{pass.allowedSeats} {pass.allowedSeats===1?"persona":"personas"}</strong></p><a className="button" href="#tu-pase">Confirmar asistencia</a></Reveal>}
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <section className={`section ${styles.personalMessage}`}><Reveal><Heart strokeWidth={1}/><p>{wedding.personalMessage}</p></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de magnolias y rosas blancas con follaje olivo y detalles dorados"/></Reveal>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Nuestra celebración" title="Acompáñanos"/><div className={styles.venues}>{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{index===0?'Misa religiosa':'Recepción y comida'}</span><h3>{place.name}</h3>{place.image&&<Image unoptimized src={place.image} width={place.imageWidth} height={place.imageHeight} sizes="(max-width:700px) 90vw,450px" className={styles.venuePhoto} alt={`Vista de ${place.name}`}/>}<strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}{place.mapsUrl&&<a className="button" href={place.mapsUrl}>Ver ubicación</a>}</article>)}</div></Reveal></section>
      <section className={`section ${styles.attireSection}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <section className={`section ${styles.scheduleSection}`}><Reveal><SectionHeading eyebrow="Cada momento contigo" title="Nuestro día"/><ol>{wedding.itinerary.map(item=>{const Icon={church:Church,dinner:Utensils,clock:Clock}[item.icon];return <li key={item.time}><Icon strokeWidth={1.4}/><div><time>{item.time==='01:00'?'1:00 a. m.':item.time==='13:00'?'1:00 p. m.':'3:30 p. m.'}</time><h3>{item.title}</h3><p>{item.description}</p></div></li>;})}</ol></Reveal></section>
      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 50vw,25vw" heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Instantes que forman parte de nuestra historia."}}/>
      <section className={`section ${styles.giftSection}`}><Reveal><Mail strokeWidth={1}/><SectionHeading eyebrow="Tu presencia es nuestro mejor regalo" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>
      <YoatzinAldoAlbum/>
      {pass?<PersonalizedPass pass={pass} token={passToken} slug={wedding.slug} messageLabel="Mensaje para Yoatzin y Aldo"/>:<section className={`section ${styles.passSummary}`} id="tu-pase"><Reveal><SectionHeading eyebrow="Una invitación especial para ti" title="Tu pase personalizado" copy="Abre el enlace de tu pase para ver tu nombre, los lugares reservados y confirmar tu asistencia."/></Reveal></section>}
      <section className="share"><Reveal><MessageCircle strokeWidth={1}/><h2>¿Tienes alguna duda?</h2><p>Si necesitas ayuda con tu pase, escríbenos por WhatsApp.</p><div className={styles.contacts}>{wedding.contacts.map(contact=><a key={contact.phone} className="button" href={`https://wa.me/52${contact.phone}?text=${encodeURIComponent('Hola, tengo una duda sobre mi pase para la boda de Yoatzin y Aldo el 19 de diciembre de 2026.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/><span>Dudas por WhatsApp<small className={styles.phoneNumber}>{contact.display}</small></span></a>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Yoatzin y Aldo" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Yoatzin &amp; Aldo</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

