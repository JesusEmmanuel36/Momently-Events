"use client";
import Image from "next/image";
import { MapPin, MessageCircle, ChevronDown, Heart, Mail, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { GallerySection } from "@/components/sections/Gallery";
import {RSVPSection} from "@/components/sections/GuestActions";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./KarlaNoemiXv.module.css";
const images = "/images/events/xv-karla-noemi";
export function KarlaNoemiXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const view={...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Karla Noemi",groom:""},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Karla Noemi",rsvpSettings:{maxCompanions:wedding.maxCompanions,askCompanions:false,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled&&<audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Karla Noemi"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Karla Noemi</h2>{wedding.dateStamp&&<small>{wedding.dateStamp}</small>}<Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image unoptimized src={`${images}/envelope-open-lilies.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y rosa pastel" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image unoptimized src={`${images}/envelope-open.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image unoptimized src={`${images}/envelope-closed-lilies.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lirios rosas, lazo blush y sello KN" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Karla Noemi"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Karla Noemi" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Karla Noemi</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div>{wedding.dateDisplay&&<p>{wedding.dateDisplay}</p>}<a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Un día para soñar</span>{wedding.welcomeParagraphs.map(text=><p key={text}>{text}</p>)}<div className="signature">Karla Noemi</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image unoptimized src={`${images}/floral-lilies.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de lirios rosas con follaje salvia y detalles champán"/></Reveal>
      
      {wedding.date&&<CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Karla Noemi",groom:""}}}/>}
      <section className="section"><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.reception].map((place,i)=><Reveal className={styles.placeCard} key={i}><MapPin strokeWidth={1}/><span className="eyebrow">Recepción</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}{place.mapsUrl&&<a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a>}</Reveal>)}</div></section>
      <section className={`section ${styles.attire}`}><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/></Reveal></section>
      <GallerySection wedding={{...view,images:{...view.images,gallery:wedding.currentGallery.map(p=>p.src)},galleryItems:wedding.currentGallery}} fixedOverlay heading={{eyebrow:'Mis XV años',title:'La ilusión de esta nueva etapa',copy:'Momentos llenos de sueños y alegría.'}} imageSizes="(max-width:700px) 50vw,25vw"/>
      <GallerySection wedding={{...view,images:{...view.images,gallery:wedding.childhoodGallery.map(p=>p.src)},galleryItems:wedding.childhoodGallery}} fixedOverlay heading={{eyebrow:'Desde mis primeros días',title:'Recuerdos de mi infancia',copy:'Los pasos y recuerdos que me trajeron hasta aquí.'}} imageSizes="(max-width:700px) 50vw,25vw"/>
      <section className="section gifts"><Reveal><Mail strokeWidth={1} className="section-icon"/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>
      <RSVPSection wedding={view}/>
      <section className={`section ${styles.whatsappContact}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="También puedes escribirnos" title="Confirma por WhatsApp"/><p>{wedding.contact.phone}</p><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a los XV años de Karla Noemi el 21 de noviembre de 2026.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image unoptimized src={wedding.hero.image} fill sizes="100vw" alt="Karla Noemi" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p>{wedding.dateDisplay&&<small>{wedding.dateDisplay}</small>}</Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

