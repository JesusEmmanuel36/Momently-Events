"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Heart, MapPin, MessageCircle, Pause, Play, Share2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import styles from "./JoseMiriam.module.css";
const images = "/images/events/jose-y-miriam";

export function JoseMiriamInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const [videoError, setVideoError] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const resumeMusic = useRef(false);
  const openTimer = useRef(null);
  const toastTimer = useRef(null);
  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(toastTimer.current); }, []);
  useEffect(() => { if (playing && "mediaSession" in navigator && window.MediaMetadata) navigator.mediaSession.metadata = new window.MediaMetadata({title:"Nuestra canción",artist:"José y Miriam",album:"10° aniversario"}); }, [playing]);
  function notify(message) { clearTimeout(toastTimer.current); setToast(message); toastTimer.current = setTimeout(() => setToast(""), 3000); }
  function startMusic() { audioRef.current?.play().catch(() => { setPlaying(false); notify("Toca el botón de música para escuchar nuestra canción."); }); }
  function open() {
    if (opening) return;
    setOpening(true); startMusic();
    openTimer.current = setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000);
  }
  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { resumeMusic.current = false; videoRef.current?.pause(); startMusic(); }
    else audio.pause();
  }
  function playVideo() { resumeMusic.current = Boolean(audioRef.current && !audioRef.current.paused); audioRef.current?.pause(); }
  function finishVideo() { if (resumeMusic.current) { resumeMusic.current = false; startMusic(); } }
  async function share() {
    try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:`Primera llamada: acompáñanos a celebrar nuestro 10° aniversario el 5 de diciembre de 2026. José y Miriam.`,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } }
    catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); }
  }
  const view = {...wedding,couple:{bride:"José",groom:"Miriam"},images:{gallery:wedding.gallery.map(photo => photo.src)},galleryItems:wedding.gallery};
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => notify("No fue posible cargar la música. Intenta reproducirla de nuevo.")}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="José y Miriam"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Primera llamada · 10° aniversario</span><h1>Una fecha para celebrar</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Primera llamada</span><h2>José <i>&amp;</i> Miriam</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil con detalles dorados"/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt=""/></div><Image src={`${images}/envelope-closed.png`} fill priority sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo café, rosas beige y sello J y M dorado"/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de José y Miriam"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="José y Miriam juntos" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Primera llamada</span><h1>José <i>&amp;</i> Miriam</h1><span className={styles.anniversaryLabel}>Nuestro 10° aniversario</span><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir nuestra celebración"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><Heart className={styles.welcomeCrown} strokeWidth={1}/><span className="script">Diez años de amor</span><p>{wedding.hero.quote}</p><div className="signature">José &amp; Miriam</div></Reveal></section>
      <section className={`section ${styles.announcement}`}><Reveal><span className="eyebrow">Una historia que seguimos escribiendo</span><strong className={styles.announcementNumber}>10</strong><h2>Años compartiendo la vida</h2><p>{wedding.saveDateMessage}</p><p className={styles.formalMessage}>{wedding.formalInvitationMessage}</p></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,580px" alt="Arreglo de rosas beige y café con follaje otoñal dorado"/></Reveal>
      <CountdownSection wedding={wedding}/>
      <section className={`section ${styles.celebration}`}><Reveal><MapPin strokeWidth={1}/><SectionHeading eyebrow="Misa y recepción" title={wedding.reception.name}/><p className={styles.eventDate}>{wedding.dateDisplay}</p><strong className={styles.eventTime}>{wedding.reception.time}</strong><p className={styles.address}>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Buscar ubicación<ArrowUpRight size={16}/></a></Reveal></section>
      <GallerySection wedding={view} heading={{eyebrow:"Nuestra historia",title:"Momentos que nos unen",copy:"Recuerdos de una vida que nos encanta compartir."}}/>
      <section className={`section ${styles.videoSection}`}><Reveal><SectionHeading eyebrow="De nosotros para ti" title="Un recuerdo especial"/><div className={styles.videoFrame}><video ref={videoRef} controls playsInline preload="metadata" poster={wedding.video.posterUrl} aria-label="Video de José y Miriam" onPlay={playVideo} onPause={finishVideo} onEnded={finishVideo} onError={() => { setVideoError(true); finishVideo(); }}><source src={wedding.video.url} type="video/mp4"/>Tu navegador no puede reproducir este video.</video>{videoError&&<p className={styles.videoError}>Puedes abrir nuestro video desde el siguiente enlace.</p>}<a href={wedding.video.url} className={styles.videoLink} target="_blank" rel="noreferrer">Abrir video<ArrowUpRight size={14}/></a></div></Reveal></section>
      <section className={`section ${styles.confirmation}`}><Reveal><MessageCircle strokeWidth={1}/><SectionHeading eyebrow="Queremos compartirlo contigo" title="¿Nos acompañas?" copy="Nos hará muy felices contar contigo. Confirma tu asistencia por WhatsApp."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, José y Miriam. Quiero confirmar mi asistencia a la celebración de su 10° aniversario el 5 de diciembre de 2026.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a><p className={styles.contactPhone}>{wedding.contact.phone}</p></Reveal></section>
      <section className="closing"><Image src={wedding.gallery[0].src} fill sizes="100vw" alt="José y Miriam" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Guarda esta fecha con cariño</span><h2>José &amp; Miriam</h2><p>{wedding.saveDateMessage}</p><small>{wedding.dateDisplay}</small><p className={styles.closingMessage}>{wedding.formalInvitationMessage}</p><button className="button" onClick={share}><Share2 size={16}/>Compartir invitación</button></Reveal></section>
    </main>
    {opened&&<button className="music-player" onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}><span>{playing?<Pause/>:<Play/>}</span><span><small>{playing?"Reproduciendo":"Escuchar"}</small>{wedding.music.label}</span></button>}
    <div className={`toast ${toast?"toast--show":""}`} role="status">{toast}</div>
  </div>;
}
