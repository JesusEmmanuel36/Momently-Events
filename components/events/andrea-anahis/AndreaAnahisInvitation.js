"use client";

import Image from "next/image";
import { Baby, CalendarDays, Check, ChevronDown, Church, Crown, ExternalLink, Gift, Heart, MapPin, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./AndreaAnahisInvitation.module.css";

const floral = "/images/events/andrea-anahis/floral.png";
const envelopeClosed = "/images/events/andrea-anahis/envelope-closed.png";
const envelopeOpen = "/images/events/andrea-anahis/envelope-open.png";
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

export function AndreaAnahisInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
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
  const openInvitation = () => { if (opening) return; setOpening(true); openingTimer.current = window.setTimeout(() => setOpened(true), 2300); };
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
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:20261115T000000Z", "DTEND:20261115T055900Z", "SUMMARY:XV años de Andrea Anahis", `LOCATION:${event.ceremony.address}`, `DESCRIPTION:${event.hero.quote}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" })); const link = document.createElement("a"); link.href = url; link.download = "xv-andrea-anahis.ics"; link.click(); URL.revokeObjectURL(url); notify("Fecha agregada a tu calendario");
  };
  const share = async () => { const data = { title: "XV años de Andrea Anahis", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><div className={styles.introBackdrop}><Image src={event.hero.image} fill priority sizes="100vw" alt="Decoración para los XV años de Andrea Anahis" /></div><div className={styles.introShade} /><div className={styles.introTitle}><span>Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}><div className={styles.letter}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Mis XV años</span><h2 className={localStyles.letterName}>Andrea Anahis</h2><small>14 · 11 · 2026</small></div><Image className={styles.envelopeOpenBack} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rosa abierto" /><Image className={styles.envelopeOpenFront} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" /><Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rosa cerrado con sello A" /><button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" /></div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div></div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" alt="Celebración de los XV años de Andrea Anahis" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><span>Mis XV años</span><h1 className={localStyles.heroName}><b>Andrea</b><i>✦</i><b>Anahis</b></h1><p>Sábado · 14 de noviembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Crown /><span>Una noche para recordar</span><h2>Hoy comienza un capítulo<br />lleno de nuevos sueños.</h2><p>{event.hero.quote}</p><div className={styles.signature}>Andrea Anahis</div></section>
      <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>
      <section className={localStyles.companions} data-je-reveal><Image src={floral} width={700} height={470} alt="" aria-hidden="true" /><Heart /><span>Con el corazón lleno de gratitud</span><h2>Acompañada por quienes han llenado mi camino de amor, consejos y momentos inolvidables.</h2><div className={localStyles.familyGrid}><article><h3>Papás</h3>{event.family.parents.map((name) => <p key={name}>{name}</p>)}</article><i /><article><h3>Padrinos</h3>{event.family.godparents.map((name) => <p key={name}>{name}</p>)}</article></div></section>
      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={event.ceremony.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Decoración de la celebración" /></div><article><Church /><span>Misa</span><h2>{event.ceremony.name}</h2><strong>{event.ceremony.time}</strong><p>{event.ceremony.address}</p><a href={event.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article></section>
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={styles.locationImage}><Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Jardín para la recepción" /></div><article><Sparkles /><span>Recepción</span><h2>{event.reception.name}</h2><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>
      <section className={styles.timeline} data-je-reveal><span>14 de noviembre</span><h2>Una tarde inolvidable</h2><div><article><time>6:00</time><small>p. m.</small><i /><h3>Misa</h3><p>Parroquia del Perpetuo Socorro</p></article><article><time>8:00</time><small>p. m.</small><i /><h3>Recepción</h3><p>Jardín Arias</p></article></div></section>
      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><p>{event.dressCode.text}</p></section>
      <section className={styles.gifts} data-je-reveal><Baby /><span>Con mucho cariño</span><h2>Celebración solo para adultos</h2><p>Para disfrutar plenamente de esta noche, hemos preparado una celebración sin niños. Agradecemos de corazón su comprensión.</p></section>
      <section className={styles.gifts} data-je-reveal><Gift /><span>Un detalle especial</span><h2>Tu presencia es mi mejor regalo</h2><p>Si además deseas tener un detalle conmigo, agradeceré mucho que sea en efectivo. Habrá un espacio discreto durante la recepción.</p></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>14 de noviembre de 2026</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>Por favor confirma tu asistencia antes del 7 de noviembre.</p><a href={event.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {event.contact.phone}</a><div>A</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir esta noche contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes adultos<input name="companions" type="number" min="0" max={event.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Andrea Anahis<textarea name="message" rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={event.hero.image} fill sizes="100vw" alt="Celebración de Andrea Anahis" /><div /><Heart /><span>Gracias por ser parte de</span><h2>mi noche soñada.</h2><p>Andrea Anahis</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
