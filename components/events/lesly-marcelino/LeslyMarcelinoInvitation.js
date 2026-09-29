"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Heart, MapPin, Pause, Play, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./LeslyMarcelinoInvitation.module.css";

const floral = "/images/events/lesly-marcelino/floral.png";
const envelopeClosed = "/images/events/lesly-marcelino/envelope-closed.png";
const envelopeOpen = "/images/events/lesly-marcelino/envelope-open.png";
const theme = {
  "--coral": "#b494c5", "--peach": "#efcbd4", "--olive": "#7f91ae", "--dark": "#5d607d",
  "--gold": "#b89a68", "--gold-soft": "#d8c5a5", "--paper": "#fffdfb", "--ivory": "#f7f2f8",
  "--charcoal": "#514d5b", "--muted": "#777080", "--accent-light": "#f3dce8", "--floral-image": `url('${floral}')`,
};

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function LeslyMarcelinoInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);

  useEffect(() => { const update = () => setCountdown(getCountdown(wedding.date)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [wedding.date]);
  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.65; }, [wedding.music.url]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow"); document.documentElement.style.removeProperty("overflow-y"); document.body.style.removeProperty("overflow"); document.body.style.removeProperty("overflow-y");
    let secondFrame; const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })); });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); window.setTimeout(() => setOpened(true), 2300); };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => notify("Agrega el archivo de la canción para reproducirla")); };
  const submit = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), menuPreference: "normal", allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${wedding.slug}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? { ok: true } : await response.json(); if (!response.ok) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload })); else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:20261228T010000Z", "DTEND:20261228T070000Z", "SUMMARY:Boda de Lesly y Marcelino", `LOCATION:${wedding.reception.address}`, `DESCRIPTION:${wedding.hero.quote}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" })); const link = document.createElement("a"); link.href = url; link.download = "boda-lesly-y-marcelino.ics"; link.click(); URL.revokeObjectURL(url); notify("Fecha agregada a tu calendario");
  };
  const share = async () => { const data = { title: "Boda de Lesly y Marcelino", text: wedding.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Lesly y Marcelino" /></div><div className={styles.introShade} />
      <div className={styles.introTitle}><span>Nuestra boda</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={styles.letter}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Nuestra boda</span><h2 className={localStyles.letterName}>Lesly <i>y</i> Marcelino</h2><small>27 · 12 · 2026</small></div>
        <Image className={styles.envelopeOpenBack} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre pastel abierto" />
        <Image className={styles.envelopeOpenFront} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="" aria-hidden="true" />
        <Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre pastel cerrado con sello L y M" />
        <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" />
      </div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div>
    </div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Lesly y Marcelino" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopy}`}><span>{wedding.hero.subtitle}</span><h1 className={localStyles.heroName}><b>Lesly</b><i>y</i><b>Marcelino</b></h1><p>Domingo · 27 de diciembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><span>Nuestra historia</span><h2>Nos conocimos, nos enamoramos<br />y nos casaremos.</h2><p>A ustedes los conocemos y los queremos con nosotros en nuestro gran día.</p><div className={styles.signature}>Lesly <i>&</i> Marcelino</div></section>
      <section className={styles.family} data-je-reveal><Image src={floral} width={560} height={373} alt="" aria-hidden="true" /><span>Con la bendición de nuestros padres</span><div className={styles.familyGrid}><article><small>Padres de la novia</small>{wedding.family.brideParents.map((name) => <p key={name}>{name}</p>)}</article><i /><article><small>Padres del novio</small>{wedding.family.groomParents.map((name) => <p key={name}>{name}</p>)}</article></div><div className={localStyles.familyMessage}><h2>{wedding.family.announcement}</h2><p>{wedding.family.invitation}</p></div></section>
      <section className={styles.countdown} data-je-reveal><span>Cada vez falta menos</span><h2>Para nuestro gran día</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy celebramos nuestro amor!</h3>}</section>
      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={wedding.hero.image} fill sizes="(max-width: 800px) 100vw, 55vw" alt="Lesly y Marcelino" /></div><article><Sparkles /><span>Recepción</span><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>27 de diciembre de 2026</p><a href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>
      <section className={styles.dress} data-je-reveal><span>Código de vestimenta</span><h2>{wedding.dressCode.title}</h2><p>{wedding.dressCode.text}</p><div className={styles.swatches} aria-label="Paleta pastel sugerida"><i /><i /><i /><i /><i /></div></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>27 de diciembre de 2026</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Nos acompañas?</h2><p>Por favor confirma tu asistencia antes del 20 de diciembre.</p><a href={wedding.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {wedding.contact.phone}</a><div>L <i>&</i> M</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibimos tu respuesta. Nos dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes<input name="companions" type="number" min="0" max={wedding.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para los novios<textarea name="message" rows="4" placeholder="Déjanos unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={styles.closing} data-je-reveal><Image src={wedding.hero.image} fill sizes="100vw" alt="Lesly y Marcelino" /><div /><Heart /><span>Gracias, de todo corazón</span><h2 className={localStyles.farewell}>{wedding.farewell}</h2><p>Lesly <i>&</i> Marcelino</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {opened && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : wedding.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
