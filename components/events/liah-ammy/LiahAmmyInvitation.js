"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Church, ExternalLink, Heart, MapPin, Share2, Sparkles, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./LiahAmmyInvitation.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const floral = "/images/events/liah-y-ammy/floral.png";
const envelopeClosed = "/images/events/liah-y-ammy/envelope-closed.png";
const envelopeOpen = "/images/events/liah-y-ammy/envelope-open.png";
const theme = {
  "--coral": "#c88fa2", "--peach": "#efc8d2", "--olive": "#b77f93", "--dark": "#704654",
  "--gold": "#b99355", "--gold-soft": "#dbc39a", "--paper": "#fffaf9", "--ivory": "#f8e8ec",
  "--charcoal": "#55444a", "--muted": "#806d73", "--accent-light": "#f6dce3", "--floral-image": `url('${floral}')`,
  "--swatch-1": "#f7dce3", "--swatch-2": "#efc2cd", "--swatch-3": "#dda4b5", "--swatch-4": "#f4d2cb", "--swatch-5": "#c98ba0",
};

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function LiahAmmyInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const openingTimer = useRef(null);
  

  useEffect(() => { const update = () => setCountdown(getCountdown(event.date)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [event.date]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect();
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow"); document.body.style.removeProperty("overflow");
    let secondFrame; const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })); });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);
  useEffect(() => () => { if (openingTimer.current) clearTimeout(openingTimer.current); }, []);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const playMusic = () => {
    if (!event.music.enabled || !audioRef.current) return;
    audioRef.current.play().catch(() => { setToast("Toca el botón de música para escuchar la canción."); window.setTimeout(() => setToast(""), 3000); });
  };
  const toggleMusic = () => { if (audioRef.current?.paused) playMusic(); else audioRef.current?.pause(); };
  const openInvitation = () => { if (opening) return; setOpening(true); playMusic(); openingTimer.current = window.setTimeout(() => setOpened(true), 2300); };
  const submit = async (formEvent) => {
    formEvent.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(formEvent.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${event.slug}`; let stored = null; try { stored = JSON.parse(localStorage.getItem(key) || "null"); } catch {} const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${event.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? {} : await response.json(); if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      try { localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken || stored?.editToken, data: payload })); } catch {}
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    openGoogleCalendar({ title: "Bautizo de Liah Nicolle y Ammy Sophia", start: event.date, durationHours: 6, location: event.ceremony.address, details: event.hero.quote });
  };
  const share = async () => { const data = { title: "Bautizo de Liah Nicolle y Ammy Sophia", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setToast("No se pudo cargar la música. Intenta de nuevo."); window.setTimeout(() => setToast(""), 3000); }} />}
    {opened && event.music.enabled && <button className={styles.music} type="button" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Pausar música" : "Escuchar música"}</span></button>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><div className={styles.introBackdrop}><Image src={event.hero.image} fill priority sizes="100vw" alt="Decoración para el bautizo de Liah Nicolle y Ammy Sophia" /></div><div className={styles.introShade} /><div className={styles.introTitle}><span>Nuestro bautizo</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}><div className={styles.letter}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Nuestro bautizo</span><h2 className={localStyles.letterName}>Liah Nicolle<i>&</i>Ammy Sophia</h2><small>29 · 11 · 2026</small></div><Image className={styles.envelopeOpenBack} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rosa abierto" /><Image className={styles.envelopeOpenFront} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" /><Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rosa cerrado con sello de cruz" /><button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" /></div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div></div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de el bautizo de Liah Nicolle y Ammy Sophia" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><span>Nuestro bautizo</span><h1 className={localStyles.heroName}><b>Liah Nicolle</b><i>&</i><b>Ammy Sophia</b></h1><p>Domingo · 29 de noviembre · 2026</p><small className={localStyles.celebrationNote}>Liah Nicolle: bautizo y 2.º cumpleaños<br />Ammy Sophia: bautizo</small></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Heart /><span>Un día lleno de bendiciones</span><h2>Dos pequeñas sonrisas,<br />una gran celebración.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Liah Nicolle y Ammy Sophia</div></section>
      <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Llegó nuestro gran día!</h3>}</section>
      <section className={localStyles.companions} data-je-reveal><Image src={floral} width={700} height={470} alt="" aria-hidden="true" /><Heart /><span>Con el corazón lleno de gratitud</span><h2>Con el amor de nuestros papás y la compañía de quienes forman parte de nuestra vida.</h2><div className={localStyles.familyGrid}><article><h3>Papás</h3>{event.family.parents.map((name) => <p key={name}>{name}</p>)}</article><i /><article><h3>Padrinos de Nicolle</h3>{event.family.godparents.map((name) => <p key={name}>{name}</p>)}</article></div></section>
      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={event.ceremony.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Liah Nicolle y Ammy Sophia" /></div><article><Church /><span>Misa</span><h2>{event.ceremony.name}</h2><strong>{event.ceremony.time}</strong><p>{event.ceremony.address}</p><a href={event.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article></section>
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={styles.locationImage}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Liah Nicolle y Ammy Sophia" /></div><article><Sparkles /><span>Recepción</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>
      <section className={`${styles.timeline} ${localStyles.itinerary}`} data-je-reveal><span>29 de noviembre</span><h2>Un día para celebrar</h2><div>{event.itinerary.map(item => <article key={item.time}><time>{item.display}</time><small>{item.period}</small><i /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><p>{event.dressCode.text}</p></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>29 de noviembre de 2026</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Nos acompañas?</h2><p>Confirma tu asistencia para compartir con nosotros este día especial.</p><a href={event.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {event.contact.phone}</a><div>L <i>&</i> A</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Tu respuesta ha sido registrada. Nos dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes<input name="companions" type="number" min="0" max={event.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Liah Nicolle y Ammy Sophia<textarea name="message" rows="4" placeholder="Déjanos unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={event.hero.image} fill sizes="100vw" alt="Celebración de Liah Nicolle y Ammy Sophia" /><div /><Heart /><span>Gracias por ser parte de</span><h2>nuestro día especial.</h2><p>Liah Nicolle y Ammy Sophia</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
