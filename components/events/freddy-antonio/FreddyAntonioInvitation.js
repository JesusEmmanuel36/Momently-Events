"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CarFront, ChevronDown, Heart, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import styles from "./FreddyAntonio.module.css";
const images = "/images/events/freddy-y-antonio";

export function FreddyAntonioInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);
  const initialSeekPending = useRef(true);
  const openTimer = useRef(null);
  const toastTimer = useRef(null);
  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(toastTimer.current); }, []);
  useEffect(() => { if (playing && "mediaSession" in navigator && window.MediaMetadata) navigator.mediaSession.metadata = new window.MediaMetadata({title:"Nuestra canción",artist:"Freddy y Antonio",album:"Nuestra boda"}); }, [playing]);
  function notify(message) { clearTimeout(toastTimer.current); setToast(message); toastTimer.current = setTimeout(() => setToast(""), 3000); }
  function seekToStart() {
    const audio = audioRef.current;
    if (!audio || audio.readyState < 1 || !initialSeekPending.current) return;
    audio.currentTime = Math.min(wedding.music.startAt, Math.max(0, audio.duration - .1));
    initialSeekPending.current = false;
  }
  function startMusic() {
    seekToStart();
    audioRef.current?.play().catch(() => { setPlaying(false); notify("Toca el botón de música para escuchar nuestra canción."); });
  }
  function restartMusic() { initialSeekPending.current = true; startMusic(); }
  function open() {
    if (opening) return;
    setOpening(true); startMusic();
    openTimer.current = setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000);
  }
  function toggleMusic() { if (!audioRef.current) return; if (audioRef.current.paused) startMusic(); else audioRef.current.pause(); }
  async function share() {
    try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:`Acompáñanos a celebrar nuestra boda el 5 de diciembre de 2026. Freddy y Antonio.`,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } }
    catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); }
  }
  const view = {...wedding,couple:{bride:"Freddy",groom:"Antonio"},images:{gallery:wedding.gallery.map(photo => photo.src)},galleryItems:wedding.gallery};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} preload="auto" onLoadedMetadata={seekToStart} onEnded={restartMusic} onPlay={() => { seekToStart(); setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => notify("No fue posible cargar la música. Intenta reproducirla de nuevo.")}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Freddy y Antonio"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2>Freddy <i>&amp;</i> Antonio</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil con detalles dorados"/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt=""/></div><Image src={`${images}/envelope-closed.png`} fill priority sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo bugambilia, rosas rojas y sello F y A dorado"/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Freddy y Antonio"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Freddy y Antonio juntos" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1>Freddy <i>&amp;</i> Antonio</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir nuestra celebración"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><Heart className={styles.welcomeCrown} strokeWidth={1}/><span className="script">Una historia para celebrar</span><p>{wedding.hero.quote}</p><div className="signature">Freddy &amp; Antonio</div></Reveal></section>
      <Reveal className={styles.papelPicado}><Image src={images+"/papel-picado.png"} width={1536} height={1024} alt="Papel picado mexicano de colores" sizes="(max-width:700px) 95vw,800px"/></Reveal>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,580px" alt="Arreglo de rosas rojas y bugambilia con follaje verde y dorado"/></Reveal>
      <CountdownSection wedding={wedding}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Nuestra recepción" title={wedding.reception.name}/><p className={styles.eventDate}>{wedding.dateDisplay}</p><strong className={styles.eventTime}>{wedding.reception.time}</strong><p className={styles.address}>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Buscar ubicación<ArrowUpRight size={16}/></a></Reveal></section>
      <GallerySection wedding={view} fixedOverlay heading={{eyebrow:"Nuestra historia",title:"Momentos que nos unen",copy:"Recuerdos de una vida que nos encanta compartir."}}/>
      <section className={`section ${styles.dressSection}`}><Reveal><Image src={images+"/abanico-floral.png"} width={1536} height={1024} alt="Abanico floral de inspiración mexicana" sizes="(max-width:700px) 70vw,350px" className={styles.fan}/><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy={wedding.dressCode.text}/><div className={styles.reservedColors}><span style={{background:"#fff"}} aria-label="Blanco reservado"/><span style={{background:"#BA243D"}} aria-label="Rojo reservado"/><span style={{background:"#A32961"}} aria-label="Bugambilia reservado"/></div></Reveal></section>
      <section className={`section ${styles.parking}`}><Reveal><CarFront strokeWidth={1}/><SectionHeading eyebrow="Información importante" title={wedding.importantInfo[0].title} copy={wedding.importantInfo[0].description}/></Reveal></section>
      <Reveal className={styles.hearts}><Image src={images+"/corazones-talavera.png"} width={1536} height={1024} alt="Corazones de Talavera mexicana" sizes="(max-width:700px) 65vw,330px"/></Reveal>
      <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Queremos compartirlo contigo" title="¿Nos acompañas?" copy="Nos hará muy felices contar contigo. Confirma tu asistencia por WhatsApp."/><div className={styles.confirmationContacts}>{wedding.contacts.map(contact=><div key={contact.whatsapp}><a className="button" href={`https://wa.me/52${contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a la boda de Freddy y Antonio el 5 de diciembre de 2026.")}`} target="_blank" rel="noreferrer">Confirmar con {contact.label.toLowerCase()}</a><p className={styles.contactPhone}>{contact.phone}</p></div>)}</div></Reveal></section>
      <section className="closing"><Image src={wedding.gallery[0].src} fill sizes="100vw" alt="Freddy y Antonio" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar nuestro amor</span><h2>Freddy &amp; Antonio</h2><p>{wedding.closingMessage}</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/>Compartir invitación</button></Reveal></section>
    </main>
    {opened&&<button className="music-player" onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}><span>{playing?<Pause/>:<Play/>}</span><span><small>{playing?"Reproduciendo":"Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast?"toast--show":""}`} role="status">{toast}</div>
  </div>;
}
