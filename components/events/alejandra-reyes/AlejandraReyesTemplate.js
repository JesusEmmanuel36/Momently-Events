"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Church, Waves, Crown, Mail, MessageCircle, Pause, Play, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import customStyles from "./AlejandraReyes.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const defaultAssets = {
  floral: "/images/events/xv-alejandra-reyes/floral.png",
  envelopeClosed: "/images/events/xv-alejandra-reyes/envelope-closed-blue-white.png",
  envelopeOpen: "/images/events/xv-alejandra-reyes/envelope-open-blue-white.png",
};
const defaultTheme = {
  "--coral":"#85aaff", "--peach":"#85aaff", "--olive":"#2864ed", "--dark":"#070b13",
  "--gold":"#85aaff", "--gold-soft":"#345490", "--paper":"#152139", "--ivory":"#0d1422",
  "--charcoal":"#f2f5ff", "--muted":"#c6d2e8", "--accent-light":"#a9c2ff"
};

function getCountdown(date) {
  if (!date) return undefined;
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function AlejandraReyesTemplate({ wedding, assets = defaultAssets, customTheme = {}, nameClassName = "", heroFramed = false }) {
  const floral = assets.floral;
  const envelopeClosed = assets.envelopeClosed;
  const envelopeOpen = assets.envelopeOpen;
  const theme = { ...defaultTheme, ...customTheme, "--floral-image": `url('${floral}')` };
  const names = wedding.couple.partner1;
  const whatsappContacts = wedding.contact?.whatsapps?.length
    ? wedding.contact.whatsapps
    : wedding.contact?.whatsapp
      ? [{ phone: wedding.contact.phone, whatsapp: wedding.contact.whatsapp }]
      : [];
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdown(wedding.date));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [wedding.date]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.65; }, [wedding.music.url]);

  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); }
    }), { threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    audioRef.current?.play().catch(() => setPlaying(false));
    window.setTimeout(() => setOpened(true), 2300);
  };
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => notify("Agrega el archivo de la canción para reproducirla"));
  };
  const submit = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), menuPreference: "normal", allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${wedding.slug}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? {} : await response.json();
      if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload }));
      else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    if (!wedding.date) return;
    openGoogleCalendar({ title: `XV años de ${names}`, start: wedding.date, end: wedding.endDate, durationHours: 8, location: wedding.reception.address, details: wedding.hero.quote });
  };
  const share = async () => {
    const data = { title: `XV años de ${names}`, text: wedding.hero.quote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } }
    catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); }
  };

  return <div className={`${styles.wedding} ${customStyles.invitation}`} style={theme}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="" aria-hidden="true" /></div><div className={styles.introShade} />
      <div className={styles.introTitle}><span>Mis XV · Pool party urbana</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={`${styles.letter} ${customStyles.letter}`}><Image src={wedding.hero.image} fill sizes="500px" alt="" aria-hidden="true" /><span>Mis XV años</span><h2>Alejandra</h2><small>{wedding.dateStamp}</small></div>
        <Image className={`${styles.envelopeOpenBack} ${customStyles.openEnvelope}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre abierto de Alejandra" />
        <Image className={`${styles.envelopeOpenFront} ${customStyles.openEnvelope} ${customStyles.openFront}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" />
        <Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre cerrado de Alejandra" />
        <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"></button>
      </div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div>
    </div>}
    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={customStyles.hero}><span className={customStyles.eyebrow}>Pool party urbana</span><Image className={customStyles.graffiti} src={wedding.hero.image} width={1024} height={1536} priority sizes="(max-width:600px) 90vw,580px" alt="Mis XV años, Ale, graffiti azul y blanco" /><div className={customStyles.heroCopy}><h1>Alejandra<br /><small>Reyes Hernández</small></h1><p>{wedding.dateDisplay}</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={customStyles.welcome} id="bienvenida" data-je-reveal><span className={customStyles.eyebrow}>Mis quince, mi estilo</span><h2>Una noche con toda la actitud</h2><p>{wedding.hero.quote}</p><Image src={floral} width={720} height={480} sizes="(max-width:600px) 80vw,400px" alt="Tenis urbanos negros y azules con detalles blancos" /></section>
      <section className={customStyles.countdown} data-je-reveal><span className={customStyles.eyebrow}>Cuenta regresiva</span><h2>¡Ya casi es la fiesta!</h2>{countdown ? <div className={styles.numbers}>{countdown.map(([label,value]) => <div key={label}><strong>{String(value).padStart(2,"0")}</strong><small>{label}</small></div>)}</div> : <p>{countdown === null ? "¡Llegó mi gran día!" : "Preparando la cuenta regresiva…"}</p>}</section>
      <section className={customStyles.venues} data-je-reveal><span className={customStyles.eyebrow}>El plan</span><h2>Nos vemos aquí</h2><div><article><Church aria-hidden="true" /><span>Misa</span><h3>{wedding.ceremony.name}</h3><strong>{wedding.ceremony.time}</strong><p>{wedding.ceremony.address}</p></article><article><Waves aria-hidden="true" /><span>Pool party · Recepción</span><h3>{wedding.reception.name}</h3><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p></article></div></section>
      <section className={customStyles.streetwear} data-je-reveal><Crown aria-hidden="true" /><span className={customStyles.eyebrow}>La vibra</span><h2>Urban streetwear</h2><p>Trae tu mejor look urbano y toda la actitud para celebrar conmigo.</p></section>
      {wedding.gifts?.length > 0 && <section className={customStyles.gifts} data-je-reveal><Mail aria-hidden="true" /><span className={customStyles.eyebrow}>{wedding.gifts[0].title}</span><h2>Tu presencia es el mejor regalo</h2><p>Si deseas obsequiarme algo,<br />habrá un sobre blanco para tu regalo.</p></section>}
      <section className={`${styles.calendar} ${customStyles.calendar}`} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>{wedding.calendarDate}</h2><div className={styles.calendarActions}><button onClick={addCalendar}>Agregar a mi calendario</button></div></section>
      <section className={`${styles.rsvp} ${customStyles.rsvp}`} data-je-reveal><div className={styles.rsvpIntro}><span>Confirma tu asistencia</span><h2>¿Te unes a la fiesta?</h2><p>Me encantará celebrar contigo.</p>{whatsappContacts.map(contact => <a key={contact.whatsapp} href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Dudas por WhatsApp</a>)}</div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibimos tu respuesta.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" minLength={2} maxLength={100} required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required/> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required/> No podré asistir</label></fieldset><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={customStyles.closing} data-je-reveal><span className={customStyles.eyebrow}>Nos vemos en la pool party</span><h2>¡Vamos a hacer<br />historia!</h2><p>Alejandra · XV</p><button onClick={share}><Share2 size={18}/> Compartir invitación</button></section>
    </main>
    {opened && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : "Mi canción"}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
