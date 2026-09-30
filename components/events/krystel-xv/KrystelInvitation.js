"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Church, Crown, ExternalLink, Gift, Heart, MapPin, Pause, Play, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./KrystelInvitation.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const floral = "/images/events/krystel-xv/floral.png";
const envelopeClosed = "/images/events/krystel-xv/envelope-closed.png";
const envelopeOpen = "/images/events/krystel-xv/envelope-open.png";
const theme = {
  "--coral": "#b59045", "--peach": "#d8c3a5", "--olive": "#78b8ca", "--dark": "#3f7180",
  "--gold": "#b59045", "--gold-soft": "#dfc98d", "--paper": "#fffdf9", "--ivory": "#eef8fa",
  "--charcoal": "#40545a", "--muted": "#71878d", "--accent-light": "#eadcc5", "--floral-image": `url('${floral}')`,
};

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function KrystelInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const openingTimer = useRef(null);
  const audioRef = useRef(null);

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
  const openInvitation = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); openingTimer.current = window.setTimeout(() => setOpened(true), 2300); };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => notify("La canción estará disponible próximamente")); };
  const submit = async (formEvent) => {
    formEvent.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(formEvent.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), menuPreference: "normal", allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${event.slug}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${event.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? { ok: true } : await response.json(); if (!response.ok) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload })); else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    openGoogleCalendar({ title: "XV años de Krystel", start: event.date, end: event.endDate, location: event.ceremony.address, details: event.hero.quote });
  };
  const share = async () => { const data = { title: "XV años de Krystel", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? `${styles.opening} ${localStyles.opening}` : ""}`}><div className={styles.introBackdrop}><Image src={event.hero.image} fill priority sizes="100vw" alt="Decoración para los XV años de Krystel" /></div><div className={styles.introShade} /><div className={styles.introTitle}><span>Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={`${styles.envelopeStage} ${localStyles.envelopeStage}`}><div className={`${styles.letter} ${localStyles.letter}`}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Mis XV años</span><h2 className={localStyles.letterName}>Krystel</h2><small>27 · 12 · 2026</small></div><Image className={`${styles.envelopeOpenBack} ${localStyles.envelopeOpenBack}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre verde azulado abierto" /><Image className={`${styles.envelopeOpenFront} ${localStyles.envelopeOpenFront}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" /><Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre verde azulado cerrado con sello K" /><button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" /></div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div></div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de los XV años de Krystel" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><span>Mis XV años</span><h1 className={localStyles.heroName}><b>Krystel</b><i>XV</i></h1><p>Domingo · 27 de diciembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Crown /><span>Una noche para recordar</span><h2>Hoy comienza un capítulo<br />lleno de nuevos sueños.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Krystel</div></section>
      <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>
      <section className={localStyles.companions} data-je-reveal><Image src={floral} width={700} height={470} alt="" aria-hidden="true" /><Heart /><span>Con el corazón lleno de gratitud</span><h2>Acompañada por quienes han llenado mi camino de amor, consejos y momentos inolvidables.</h2><div className={`${localStyles.familyGrid} ${localStyles.familyGridSingle}`}><article><h3>Mis papás</h3>{event.family.parents.map((name) => <p key={name}>{name}</p>)}</article></div></section>
      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={event.ceremony.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Decoración de la celebración" /></div><article><Church /><span>Misa</span><h2>{event.ceremony.name}</h2><strong>{event.ceremony.time}</strong><p>{event.ceremony.address}</p><a href={event.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article></section>
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={styles.locationImage}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Jardín para la recepción" /></div><article><Sparkles /><span>Recepción</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>
      <section className={`${styles.timeline} ${localStyles.timeline}`} data-je-reveal><span>27 de diciembre</span><h2>Una noche inolvidable</h2><div><article><time>5:00</time><small>p. m.</small><i /><h3>Ceremonia</h3><p>Santa María Magdalena</p></article><article><time>6:30</time><small>p. m.</small><i /><h3>Cena</h3><p>Hasta las 8:30 p. m.</p></article><article><time>9:00</time><small>p. m.</small><i /><h3>Baile</h3><p>Hasta las 2:00 a. m.</p></article></div></section>
      <section className={styles.dress} data-je-reveal><span>Colores reservados</span><h2>Aqua, champagne y dorado</h2><p>Estos colores están reservados para la quinceañera y los detalles especiales de su celebración. Gracias por elegir otros tonos para tu vestimenta.</p></section>
      <section className={styles.gifts} data-je-reveal><Gift /><span>Un detalle especial</span><h2>Tu presencia es mi mejor regalo</h2><p>Si además deseas tener un detalle conmigo, puedes obsequiar un regalo o un sobre. Lo recibiré con mucho cariño, sin que sea una obligación.</p></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>27 de diciembre de 2026</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>Por favor confirma tu asistencia antes del 20 de diciembre.</p><a href={event.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {event.contact.phone}</a><div>K</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir esta noche contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes adultos<input name="companions" type="number" min="0" max={event.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Krystel<textarea name="message" rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={event.hero.image} fill sizes="100vw" alt="Celebración de Krystel" /><div /><Heart /><span>Gracias por ser parte de</span><h2>mi noche soñada.</h2><p>Krystel</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {opened && event.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : event.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
