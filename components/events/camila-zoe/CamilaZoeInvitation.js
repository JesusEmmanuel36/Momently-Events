"use client";

import Image from "next/image";
import { MessageCircle, ChevronDown, Crown, Gift, X, Heart, Volume2, VolumeX, MapPin, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./CamilaZoeInvitation.module.css";
import { Botanical } from "@/components/ui";

const assetFolder = "/images/events/xv-camila-zoe";
const floral = "/images/events/xv-camila-zoe/floral.png";
const theme = {
  "--coral": "#203856", "--peach": "#c7ccd6", "--olive": "#203856", "--dark": "#10243e",
  "--gold": "#203856", "--gold-soft": "#c7ccd6", "--paper": "#fcfaf6", "--ivory": "#f3f3f1",
  "--charcoal": "#10243e", "--muted": "#566477", "--accent-light": "#e1e3e8", "--floral-image": `url('${floral}')`,
};

function getCountdown(date, timePending) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  if (timePending) return [["Días", Math.ceil(remaining / 86400000)]];
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function CamilaZoeInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [toast, setToast] = useState("");
  const openingTimer = useRef(null);
  const photoDialog = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playMusic = () => { if (!event.music.enabled) return; audioRef.current?.play().catch(() => notify("Toca el botón de música para escuchar la canción")); };
  const toggleMusic = () => { if (audioRef.current?.paused) playMusic(); else audioRef.current?.pause(); };

  useEffect(() => { const update = () => setCountdown(getCountdown(event.date, event.timePending)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [event.date, event.timePending]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } }), { threshold: 0 });
    nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect();
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow"); document.body.style.removeProperty("overflow");
    let secondFrame; const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })); });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);
  useEffect(() => () => { if (openingTimer.current) clearTimeout(openingTimer.current); }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    photoDialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activePhoto]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => { if (opening) return; setOpening(true); playMusic(); openingTimer.current = window.setTimeout(() => setOpened(true), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1900); };
  const share = async () => { const data = { title: "XV años de Camila Zoe", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={`${styles.wedding} ${localStyles.invitation}`} style={theme}>
    {!opened && <div className={`intro ${opening ? "intro--leaving" : ""}`}>
      <Image src={event.hero.image} fill priority sizes="100vw" alt="Decoración de los XV años de Camila Zoe" className={`cover ${localStyles.introBackground}`} />
      <div className="intro__overlay" /><Botanical className="intro__branch intro__branch--left" /><Botanical className="intro__branch intro__branch--right" />
      <div className="intro__content"><span className="eyebrow">Mis XV años</span><h1 className="intro__heading">Una invitación para ti</h1>
        <div className="envelope-scene" aria-live="polite"><div className="envelope envelope--photoreal">
          <div className="envelope__letter"><span className="envelope__monogram">CZ</span><strong>Camila Zoe</strong><small>19 · 12 · 2026</small><Heart size={14} fill="currentColor" /></div>
          <Image className={`envelope__asset envelope__asset--open-back ${localStyles.openEnvelope}`} src={`${assetFolder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre azul marino abierto" />
          <Image className={`envelope__asset envelope__asset--open-front ${localStyles.openEnvelope}`} src={`${assetFolder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="" aria-hidden="true" />
          <Image className="envelope__asset envelope__asset--closed" src={`${assetFolder}/envelope-closed.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre azul marino con sello CZ" />
          <button className="envelope__seal" onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"><span>Abrir invitación</span></button>
        </div></div><p className="intro__hint">Toca el sello para abrir</p>
      </div>
    </div>}

    {opened && <main className={styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de los XV años de Camila Zoe" /><div className={`${styles.heroShade} ${localStyles.heroShade}`} /><Image className={styles.heroFlower} src={floral} width={700} height={350} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><span>Mis XV años</span><h1 className={localStyles.heroName}>Camila Zoe</h1><p>Sábado · 19 de diciembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Crown /><span>Un día para recordar</span><h2>Hoy comienza un capítulo<br />lleno de nuevos sueños.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Camila Zoe</div></section>
      <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{(event.timePending ? ["Días"] : ["Días", "Horas", "Minutos", "Segundos"]).map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>
      {event.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Mis recuerdos</span><h2>Mi historia en fotografías</h2><div className={localStyles.photoGrid}>{event.gallery.map((photo,index) => <button type="button" key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Ampliar fotografía ${index+1}`}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width:600px) 100vw,33vw" alt={photo.alt} /></button>)}</div></section>}
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={`${styles.locationImage} ${localStyles.venueArtwork}`}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Arreglo floral en tonos azul marino" /></div><article><Sparkles /><span>Recepción</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>
      <section className={`${styles.welcome} ${localStyles.gratitude}`} data-je-reveal><Heart /><span>Con mucho cariño</span><h2>Gracias por acompañarme</h2><p>A mi familia y amigos, gracias por acompañarme, por su cariño y por ser parte de los recuerdos que hacen especial mi vida. Me llena de alegría compartir mis quince años contigo.</p><div className={styles.signature}>Con cariño, Camila Zoe</div></section>

      <section className={styles.timeline} data-je-reveal><span>El gran día</span><h2>Itinerario</h2><div>{event.itinerary.map(item => <article key={item.time}><Sparkles /><strong>{item.time === "14:00" ? "2:00 p. m." : "3:00 p. m."}</strong><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><div className={localStyles.reservedColor}><i/><span>Azul marino</span></div><p>{event.dressCode.text}</p></section>
      <section className={`${styles.welcome} ${localStyles.gifts}`} data-je-reveal><Gift/><span>Un detalle para mi futuro</span><h2>Fondo de sueños</h2><p>{event.gifts[0].description}</p><small>Lluvia de sobres</small></section>
      <section className={`${styles.welcome} ${localStyles.whatsappConfirmation}`} data-je-reveal><MessageCircle /><span>Confirmación de asistencia</span><h2>¿Me acompañas?</h2><p>Confirma tu asistencia por WhatsApp e indica tu nombre y cuántas personas asistirán contigo.</p><small>Máximo cinco personas en total, incluyéndote.</small><a href={`${event.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a los XV años de Camila Zoe el 19 de diciembre de 2026. Mi nombre es: ____. Asistiremos ____ personas en total.")}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Confirmar por WhatsApp</a></section>
      <section className={styles.closing} data-je-reveal><Image src={floral} fill sizes="100vw" alt="Arreglo floral en tonos azul marino" /><div className={localStyles.closingShade} /><Heart /><span>Gracias por ser parte de</span><h2>mi día soñado.</h2><p>Camila Zoe</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>}
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); notify("No se pudo cargar la música. Intenta de nuevo."); }} />}
    {opened && event.music.enabled && <button type="button" className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Volume2 /> : <VolumeX />}<span>{playing ? "Pausar música" : "Escuchar música"}</span></button>}
    <dialog ref={photoDialog} className={localStyles.photoDialog} aria-label="Fotografía ampliada de Camila Zoe" onClose={() => setActivePhoto(null)} onClick={e => { if(e.target === e.currentTarget) photoDialog.current.close(); }}>{activePhoto !== null && <><button type="button" onClick={() => photoDialog.current.close()} aria-label="Cerrar fotografía"><X /></button><Image src={event.gallery[activePhoto].src} width={event.gallery[activePhoto].width} height={event.gallery[activePhoto].height} sizes="100vw" alt={event.gallery[activePhoto].alt} /></>}</dialog>
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
