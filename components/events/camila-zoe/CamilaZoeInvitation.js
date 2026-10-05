"use client";

import Image from "next/image";
import { Check, ChevronDown, Crown, Gift, X, Heart, Volume2, VolumeX, MapPin, Share2, Sparkles } from "lucide-react";
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
    const payload = { name, attending: form.get("attendance"), companions: form.get("attendance") === "yes" ? Number(form.get("totalPeople") || 1) - 1 : 0, allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    if (!Number.isInteger(payload.companions) || payload.companions < 0 || payload.companions > event.maxCompanions) { setError("Selecciona de una a cinco personas."); setSaving(false); return; }
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

      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><div className={localStyles.reservedColor}><i/><span>Azul marino</span></div><p>{event.dressCode.text}</p></section>
      <section className={`${styles.welcome} ${localStyles.gifts}`} data-je-reveal><Gift/><span>Un detalle para mi futuro</span><h2>Fondo de sueños</h2><p>{event.gifts[0].description}</p><small>Lluvia de sobres</small></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>Me dará mucha alegría contar contigo. Por favor confirma tu asistencia.</p>{event.contacts.map(contact => <a key={contact.phone} href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {contact.phone}</a>)}<div>CZ</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required minLength={2} maxLength={100} placeholder="Escribe tu nombre" defaultValue={savedResponse?.data?.name || ""} /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required defaultChecked={savedResponse?.data?.attending === "yes"} /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required defaultChecked={savedResponse?.data?.attending === "no"} /> No podré asistir</label></fieldset><label>Personas que asistirán, incluyéndote<select name="totalPeople" defaultValue={(savedResponse?.data?.companions ?? 0) + 1}>{[1,2,3,4,5].map(total => <option key={total} value={total}>{total} {total === 1 ? "persona" : "personas"}</option>)}</select><small>Máximo cinco personas por confirmación, contando al invitado.</small></label><label>Comentarios o consideraciones<textarea name="notes" maxLength={500} defaultValue={savedResponse?.data?.allergies || ""} rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Camila Zoe<textarea name="message" maxLength={1000} defaultValue={savedResponse?.data?.message || ""} rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={floral} fill sizes="100vw" alt="Arreglo floral en tonos azul marino" /><div className={localStyles.closingShade} /><Heart /><span>Gracias por ser parte de</span><h2>mi día soñado.</h2><p>Camila Zoe</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>}
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); notify("No se pudo cargar la música. Intenta de nuevo."); }} />}
    {opened && event.music.enabled && <button type="button" className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Volume2 /> : <VolumeX />}<span>{playing ? "Pausar música" : "Escuchar música"}</span></button>}
    <dialog ref={photoDialog} className={localStyles.photoDialog} aria-label="Fotografía ampliada de Camila Zoe" onClose={() => setActivePhoto(null)} onClick={e => { if(e.target === e.currentTarget) photoDialog.current.close(); }}>{activePhoto !== null && <><button type="button" onClick={() => photoDialog.current.close()} aria-label="Cerrar fotografía"><X /></button><Image src={event.gallery[activePhoto].src} width={event.gallery[activePhoto].width} height={event.gallery[activePhoto].height} sizes="100vw" alt={event.gallery[activePhoto].alt} /></>}</dialog>
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
