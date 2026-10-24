"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Heart, Church, Pause, Play, Wine, UtensilsCrossed, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/GuestActions";
import { Reveal, SectionHeading } from "@/components/ui";

import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./HortensiaGuadalupe.module.css";
const images = "/images/events/hortensia-y-guadalupe";
export function HortensiaGuadalupeInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [toast, setToast] = useState("");
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const [playing,setPlaying] = useState(false);
  const toggleMusic = () => { if(audioRef.current?.paused) audioRef.current.play().catch(()=>notify("Toca de nuevo para escuchar la música.")); else audioRef.current?.pause(); };
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(()=>setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };

  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Hortensia",groom:"Guadalupe"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Hortensia y Guadalupe",rsvpSettings:{maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}><audio ref={audioRef} src={wedding.music.url} preload="auto" loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>

    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Hortensia y Guadalupe"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestras bodas de oro</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestras bodas de oro</span><h2>Hortensia <i>&amp;</i> Guadalupe</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto blanco y dorado" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre blanco y dorado con sello 50" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Hortensia y Guadalupe"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Hortensia y Guadalupe tomados de la mano" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestras bodas de oro</span><h1 className={styles.heroNames}><span>Hortensia</span><i>&amp;</i><span>Guadalupe</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><div className={styles.milestone}><strong>50</strong><small>Años juntos</small></div><span className="script">Toda una vida de amor</span><div className={styles.welcomeMessage}>{wedding.hero.quote.split("\n\n").map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><div className="signature">Hortensia y Guadalupe</div></Reveal></section>
      <CountdownSection wedding={view}/>
      <section className={`section ${styles.celebration}`} id="detalles"><Reveal><SectionHeading eyebrow="26 de diciembre" title="Nuestra celebración"/></Reveal><div className={styles.placeGrid}><Reveal className={styles.placeCard}><Church strokeWidth={1}/><span className="eyebrow">Ceremonia religiosa</span><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><a className="button" href={wedding.ceremony.mapsUrl}>Ver ubicación</a></Reveal><Reveal className={styles.placeCard}><Wine strokeWidth={1}/><span className="eyebrow">Recepción</span><h2>{wedding.reception.name}</h2><strong>8:00 p. m.</strong><div className={styles.dinner}><UtensilsCrossed strokeWidth={1}/><span>Cena · 8:00 p. m.</span></div></Reveal></div></section>
      {wedding.galleryGroups.map(group=><div className={styles.galleryGroup} data-gallery-group={group.layout} key={group.title}><GallerySection wedding={{...view,images:{...view.images,gallery:group.photos.map(photo=>photo.src)},galleryItems:group.photos}} heading={{eyebrow:group.eyebrow,title:group.title,copy:group.copy}} imageSizes="(max-width:700px) 90vw, 45vw" fixedOverlay/></div>)}
      <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Nos encantará celebrar contigo.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.reception.name,details:"Ceremonia religiosa a las 17:00 hrs en Iglesia El Buen Pastor. Recepción y cena a las 8:00 p. m. en Salón Anthea."})}>Agregar a mi calendario</button></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className="closing"><Image src={wedding.closingImage || wedding.hero.image} fill sizes="100vw" alt="Hortensia y Guadalupe" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por acompañarnos en</span><h2>nuestra historia.</h2><p>Hortensia <i>&amp;</i> Guadalupe</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}><span>{playing?<Pause/>:<Play/>}</span><span><small>{playing?"Reproduciendo":"Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
