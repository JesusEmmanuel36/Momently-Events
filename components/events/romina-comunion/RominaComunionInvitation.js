"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Cross, X, ExternalLink, Heart, Volume2, VolumeX, MapPin, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./RominaComunionInvitation.module.css";
import { Botanical } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";

const assetFolder = "/images/events/romina-comunion";
const floral = "/images/events/romina-comunion/floral.png";
const theme = {
  "--coral": "#b18b4d", "--peach": "#eed8b5", "--olive": "#b18b4d", "--dark": "#715044",
  "--gold": "#b18b4d", "--gold-soft": "#e5c78f", "--paper": "#fff9f3", "--ivory": "#f8e7e6",
  "--charcoal": "#715044", "--muted": "#96796f", "--accent-light": "#f5deda", "--floral-image": `url('${floral}')`,
};

function getCountdown(date) {
  if (!date) return null;
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function RominaComunionInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const openingTimer = useRef(null);
  const photoDialog = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [savedResponse, setSavedResponse] = useState(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playMusic = () => { if (!event.music.enabled) return; audioRef.current?.play().catch(() => notify("Toca el botón de música para escuchar la canción")); };
  const toggleMusic = () => { if (audioRef.current?.paused) playMusic(); else audioRef.current?.pause(); };

  useEffect(() => { const update = () => setCountdown(getCountdown(event.date)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [event.date]);
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
    try { const stored = JSON.parse(localStorage.getItem(`momently:rsvp:${event.slug}`) || "null"); if (stored?.rsvpId && stored?.editToken) setSavedResponse(stored); } catch { /* A damaged cache must not prevent confirmation. */ }
  }, [event.slug]);
  useEffect(() => {
    if (activePhoto === null) return;
    photoDialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activePhoto]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => { if (opening) return; setOpening(true); playMusic(); openingTimer.current = window.setTimeout(() => setOpened(true), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1900); };
  const submit = async (formEvent) => {
    formEvent.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(formEvent.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${event.slug}`; const stored = savedResponse; const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${event.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? { ok: true } : await response.json().catch(() => ({ error: "No fue posible enviar tu confirmación. Intenta de nuevo." })); if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      const nextSaved = { rsvpId: result.rsvpId, editToken: result.editToken || stored?.editToken, data: payload };
      setSavedResponse(nextSaved);
      try { localStorage.setItem(key, JSON.stringify(nextSaved)); } catch { /* The server has already saved the confirmation. */ }
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    openGoogleCalendar({ title: "primera comunión de Romina Jahori", start: event.date, durationHours: 7, location: event.reception.address || event.reception.name, details: event.hero.quote });
  };
  const share = async () => { const data = { title: "primera comunión de Romina Jahori", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={`${styles.wedding} ${localStyles.invitation}`} style={theme}>
    {!opened && <div className={`intro ${opening ? "intro--leaving" : ""}`}>
      <Image src={event.hero.image} fill priority sizes="100vw" alt="Decoración de la primera comunión de Romina Jahori" className={`cover ${localStyles.introBackground}`} />
      <div className="intro__overlay" /><Botanical className="intro__branch intro__branch--left" /><Botanical className="intro__branch intro__branch--right" />
      <div className="intro__content"><span className="eyebrow">Mi primera comunión</span><h1 className="intro__heading">Una invitación para ti</h1>
        <div className="envelope-scene" aria-live="polite"><div className="envelope envelope--photoreal">
          <div className="envelope__letter"><span className="envelope__monogram">RJ</span><strong>Romina Jahori</strong>{event.dateShort && <small>{event.dateShort}</small>}<Heart size={14} fill="currentColor" /></div>
          <Image className={`envelope__asset envelope__asset--open-back ${localStyles.openEnvelope}`} src={`${assetFolder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre rosa pastel abierto" />
          <Image className={`envelope__asset envelope__asset--open-front ${localStyles.openEnvelope}`} src={`${assetFolder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="" aria-hidden="true" />
          <Image className="envelope__asset envelope__asset--closed" src={`${assetFolder}/envelope-closed.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre rosa pastel con sello RJ" />
          <button className="envelope__seal" onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"><span>Abrir invitación</span></button>
        </div></div><p className="intro__hint">Toca el sello para abrir</p>
      </div>
    </div>}

    {opened && <main className={styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de la primera comunión de Romina Jahori" /><div className={`${styles.heroShade} ${localStyles.heroShade}`} /><Image className={styles.heroFlower} src={floral} width={700} height={350} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><svg className={localStyles.communionCross} viewBox="0 0 100 130" fill="none" aria-hidden="true"><path d="M50 9C42 1 35 11 42 19V43H23C15 36 5 43 13 51C5 59 15 66 23 59H42V106C35 114 42 124 50 116C58 124 65 114 58 106V59H77C85 66 95 59 87 51C95 43 85 36 77 43H58V19C65 11 58 1 50 9Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M50 22V103M26 51H74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m50 44 7 7-7 7-7-7Z" fill="var(--rose)" stroke="currentColor" /><path d="m18 86 2 5 5 2-5 2-2 5-2-5-5-2 5-2ZM81 19l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" fill="currentColor" /></svg><span>Mi primera comunión</span><h1 className={localStyles.heroName}>Romina Jahori</h1>{event.dateDisplay && <p>{event.dateDisplay}</p>}</div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Cross /><span>Un día para recordar</span><h2>Hoy recibo a Jesús<br />con alegría en mi corazón.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Romina Jahori</div></section>
      {event.date && <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>}
      <section className={`${styles.family} ${localStyles.family}`} data-je-reveal><Image src={floral} width={700} height={470} alt="" aria-hidden="true" /><span>Con la bendición de</span><h2>Mis papás y padrinos</h2><div className={styles.familyGrid}><article><small>Mis papás</small>{event.family.parents.map(name => <p key={name}>{name}</p>)}</article><i /><article><small>Mis padrinos</small>{event.family.godparents.map(name => <p key={name}>{name}</p>)}</article></div></section>
      {event.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Mis recuerdos</span><h2>Mi historia en fotografías</h2><div className={localStyles.photoGrid}>{event.gallery.map((photo,index) => <button type="button" key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Ampliar fotografía ${index+1}`}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width:600px) 100vw,33vw" alt={photo.alt} /></button>)}</div></section>}

      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={`${styles.locationImage} ${localStyles.venueArtwork}`}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Arreglo floral en tonos rosa pastel y dorado" /></div><article><Sparkles /><span>Recepción</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong>{event.reception.address && <p>{event.reception.address}</p>}{event.reception.mapsUrl && <a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a>}</article></section>
      <section className={`${styles.welcome} ${localStyles.gratitude}`} data-je-reveal><Heart /><span>Con mucho cariño</span><h2>Gracias por acompañarme</h2><p>A mis papás y padrinos, gracias por su amor, sus consejos y por guiarme a cada paso.<br /><br />A mi familia y amigos, gracias por ser parte de este día tan especial para mí.</p><div className={styles.signature}>Con cariño, Romina Jahori</div></section>

      {event.date && <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>{event.dateDisplay}</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>}
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>Me dará mucha alegría contar contigo. Por favor confirma tu asistencia.</p>{event.contacts.map(contact => <a key={contact.phone} href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {contact.phone}</a>)}<div>RJ</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required minLength={2} maxLength={100} placeholder="Escribe tu nombre" defaultValue={savedResponse?.data?.name || ""} /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required defaultChecked={savedResponse?.data?.attending === "yes"} /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required defaultChecked={savedResponse?.data?.attending === "no"} /> No podré asistir</label></fieldset><label>Comentarios o consideraciones<textarea name="notes" maxLength={500} defaultValue={savedResponse?.data?.allergies || ""} rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Romina Jahori<textarea name="message" maxLength={1000} defaultValue={savedResponse?.data?.message || ""} rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={floral} fill sizes="100vw" alt="Arreglo floral en tonos rosa pastel y dorado" /><div className={localStyles.closingShade} /><Heart /><span>Gracias por ser parte de</span><h2>mi día soñado.</h2><p>Romina Jahori</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>}
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); notify("No se pudo cargar la música. Intenta de nuevo."); }} />}
    {opened && event.music.enabled && <button type="button" className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Volume2 /> : <VolumeX />}<span>{playing ? "Pausar música" : "Escuchar música"}</span></button>}
    <dialog ref={photoDialog} className={localStyles.photoDialog} aria-label="Fotografía ampliada de Romina Jahori" onClose={() => setActivePhoto(null)} onClick={e => { if(e.target === e.currentTarget) photoDialog.current.close(); }}>{activePhoto !== null && <><button type="button" onClick={() => photoDialog.current.close()} aria-label="Cerrar fotografía"><X /></button><Image src={event.gallery[activePhoto].src} width={event.gallery[activePhoto].width} height={event.gallery[activePhoto].height} sizes="100vw" alt={event.gallery[activePhoto].alt} /></>}</dialog>
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
