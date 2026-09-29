"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Gift, Heart, MapPin, MessageCircle, Pause, Play, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./Roxana50Invitation.module.css";

const ornament = "/images/events/roxana-50/ornament.png";
const envelopeClosed = "/images/events/roxana-50/envelope-closed.png";
const envelopeOpen = "/images/events/roxana-50/envelope-open.png";
const decorativeHero = "/images/events/roxana-50/hero.png";
const theme = {
  "--coral": "#b76e79", "--peach": "#d8a39a", "--olive": "#33282b", "--dark": "#171415",
  "--gold": "#c9a55c", "--gold-soft": "#d7bd82", "--paper": "#fbf5eb", "--ivory": "#ead8c5",
  "--charcoal": "#2b2527", "--muted": "#796d68", "--accent-light": "#e8c3b6", "--floral-image": `url('${ornament}')`,
  "--swatch-1": "#080808", "--swatch-2": "#b76e79", "--swatch-3": "#c9a55c", "--swatch-4": "#d8c2a8", "--swatch-5": "#252022",
};

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function Roxana50Invitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => { const update = () => setCountdown(getCountdown(event.date)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [event.date]);
  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.65; }, [event.music.url]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect();
  }, [opened]);
  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === "Escape") setActivePhoto(null);
      if (keyboardEvent.key === "ArrowLeft") setActivePhoto((current) => (current - 1 + event.gallery.length) % event.gallery.length);
      if (keyboardEvent.key === "ArrowRight") setActivePhoto((current) => (current + 1) % event.gallery.length);
    };
    document.addEventListener("keydown", onKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.removeProperty("overflow"); };
  }, [activePhoto, event.gallery.length]);
  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow"); document.body.style.removeProperty("overflow");
    let secondFrame; const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })); });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); window.setTimeout(() => setOpened(true), 2300); };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => notify("Agrega el archivo de Unstoppable para reproducirla")); };
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
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART;VALUE=DATE:20261114", "DTEND;VALUE=DATE:20261115", "SUMMARY:50 años de Roxana", `LOCATION:${event.reception.address}`, `DESCRIPTION:${event.hero.quote}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" })); const link = document.createElement("a"); link.href = url; link.download = "cumpleanos-roxana-50.ics"; link.click(); URL.revokeObjectURL(url); notify("Fecha agregada a tu calendario");
  };
  const share = async () => { const data = { title: "Los 50 de Roxana", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    <audio ref={audioRef} src={event.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><div className={styles.introBackdrop}><Image src={decorativeHero} fill priority sizes="100vw" alt="Celebración de los 50 años de Roxana" /></div><div className={styles.introShade} /><div className={styles.introTitle}><span>Mis 50 años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}><div className={styles.letter}><Image src={ornament} fill sizes="500px" alt="" aria-hidden="true" /><span>Mis 50 años</span><h2>Roxana</h2><small>14 · 11 · 2026</small></div><Image className={`${styles.envelopeOpenBack} ${localStyles.envelopeOpenArt}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rose gold abierto" /><Image className={`${styles.envelopeOpenFront} ${localStyles.envelopeOpenArt}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" /><Image className={`${styles.envelopeClosed} ${localStyles.envelopeClosedArt}`} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre cerrado con sello R 50" /><button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" /></div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div></div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de Roxana" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={ornament} width={700} height={470} alt="" aria-hidden="true" /><div className={styles.heroCopy}><span>Mis 50 años</span><h1><b>Roxana</b><i className={localStyles.ageMark}>50</i></h1><p>Sábado · 14 de noviembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><span>Una vida para celebrar</span><h2>Los mejores momentos<br />se celebran en compañía.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Roxana <i>·</i> 50</div></section>
      <section className={styles.countdown} data-je-reveal><span>La celebración se acerca</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy celebramos!</h3>}</section>
      <section className={styles.photoGallery} data-je-reveal><span>50 años de momentos</span><h2>Una vida llena de historias</h2><p>Recuerdos, sonrisas y nuevas razones para celebrar.</p><div className={styles.photoGrid}>{event.gallery.map((photo, index) => <button key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={photo.src} fill sizes="(max-width:700px) 50vw,33vw" alt={photo.alt} /></button>)}</div></section>
      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt={event.reception.name} /></div><article><Sparkles /><span>Celebración</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin /></a></article></section>
      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><p>{event.dressCode.text}</p><div className={styles.swatches} aria-label="Paleta rose gold, dorada, beige y negra"><i /><i /><i /><i /><i /></div></section>
      <section className={styles.gifts} data-je-reveal><Gift /><span>Un detalle opcional</span><h2>Tu presencia es mi mejor regalo</h2><p>{event.gifts[0].description}</p></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>14 de noviembre de 2026</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>Confirmación</span><h2>¿Celebras conmigo?</h2><p>Confirma tu asistencia para preparar cada detalle de esta noche.</p><a className={localStyles.whatsapp} href={event.contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp: {event.contact.phone}</a><div>R <i>·</i> 50</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Tu respuesta quedó registrada. Me dará mucha alegría celebrar contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes<input name="companions" type="number" min="0" max={event.maxCompanions} defaultValue="0" /></label><label>Comentarios<textarea name="notes" rows="3" placeholder="Algo que debamos considerar" /></label><label>Mensaje para Roxana<textarea name="message" rows="4" placeholder="Déjale unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={event.hero.image} fill sizes="100vw" alt="Celebración de Roxana" /><div /><Heart /><span>Gracias por acompañarme a celebrar</span><h2>50 años de vida.</h2><p>Roxana</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {opened && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : event.music.label}</span></button>}
    {activePhoto !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Galería de Roxana" onClick={() => setActivePhoto(null)}><button className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar galería"><X /></button><button className={styles.lightboxPrevious} onClick={(clickEvent) => { clickEvent.stopPropagation(); setActivePhoto((activePhoto - 1 + event.gallery.length) % event.gallery.length); }} aria-label="Fotografía anterior"><ChevronLeft /></button><div className={styles.lightboxImage} onClick={(clickEvent) => clickEvent.stopPropagation()}><Image src={event.gallery[activePhoto].src} fill sizes="95vw" alt={event.gallery[activePhoto].alt} /></div><button className={styles.lightboxNext} onClick={(clickEvent) => { clickEvent.stopPropagation(); setActivePhoto((activePhoto + 1) % event.gallery.length); }} aria-label="Fotografía siguiente"><ChevronRight /></button><span>{String(activePhoto + 1).padStart(2, "0")} / {String(event.gallery.length).padStart(2, "0")}</span></div>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
