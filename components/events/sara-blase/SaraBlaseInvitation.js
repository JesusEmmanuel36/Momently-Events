"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Church, ExternalLink, Heart, MapPin, MessageCircle, Pause, Play, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./SaraBlaseInvitation.module.css";

const floral = "/images/events/sara-y-blase/floral.png";
const envelopeClosed = "/images/events/sara-y-blase/envelope-closed.png";
const envelopeOpen = "/images/events/sara-y-blase/envelope-open.png";
const theme = {
  "--coral": "#b7654d", "--peach": "#df9a7e", "--olive": "#73785e", "--dark": "#432d27",
  "--gold": "#b48a4e", "--gold-soft": "#d9bc91", "--paper": "#fffaf4", "--ivory": "#f3e2d5",
  "--charcoal": "#4b3730", "--muted": "#7d6961", "--accent-light": "#f0c4ae", "--floral-image": `url('${floral}')`,
};

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function SaraBlaseInvitation({ wedding }) {
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
    }), { threshold: 0.12 });
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

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowLeft") setActivePhoto((current) => (current - 1 + wedding.gallery.length) % wedding.gallery.length);
      if (event.key === "ArrowRight") setActivePhoto((current) => (current + 1) % wedding.gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto, wedding.gallery.length]);

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
      const result = response.status === 204 ? { ok: true } : await response.json();
      if (!response.ok) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload }));
      else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:20261107T220000Z", "DTEND:20261108T060000Z", "SUMMARY:Boda de Sara y Blase", `LOCATION:${wedding.ceremony.name}`, `DESCRIPTION:${wedding.hero.quote}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
    const link = document.createElement("a"); link.href = url; link.download = "boda-sara-y-blase.ics"; link.click(); URL.revokeObjectURL(url); notify("Fecha agregada a tu calendario");
  };
  const share = async () => {
    const data = { title: "Boda de Sara y Blase", text: wedding.hero.quote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } }
    catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); }
  };

  return <div className={styles.wedding} style={theme}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Celebración de Sara y Blase" /></div><div className={styles.introShade} />
      <div className={styles.introTitle}><span>Nuestra boda</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={styles.letter}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Nuestra boda</span><h2 className={localStyles.letterName}>Sara <i>y</i> Blase</h2><small>07 · 11 · 2026</small></div>
        <Image className={styles.envelopeOpenBack} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre terracota abierto" />
        <Image className={styles.envelopeOpenFront} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="" aria-hidden="true" />
        <Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre terracota cerrado con sello S y B" />
        <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" />
      </div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div>
    </div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image className={localStyles.heroImage} src={wedding.hero.image} fill priority sizes="100vw" alt="Celebración de Sara y Blase" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopy}`}><span>{wedding.hero.subtitle}</span><h1 className={localStyles.heroName}><b>Sara</b><i>y</i><b>Blase</b></h1><p>Sábado · 7 de noviembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>

      <section className={styles.welcome} id="bienvenida" data-je-reveal><span>Con todo nuestro amor</span><h2>Queremos compartir contigo<br />el comienzo de nuestra historia.</h2><p>{wedding.hero.quote}</p><div className={styles.signature}>Sara <i>&</i> Blase</div></section>

      <section className={styles.countdown} data-je-reveal><span>Cada vez falta menos</span><h2>Para nuestro gran día</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy celebramos nuestro amor!</h3>}</section>

      {wedding.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Nuestros momentos</span><h2>Una historia en fotografías</h2><p>Recuerdos que nos trajeron hasta aquí.</p><div className={styles.photoGrid}>{wedding.gallery.map((photo, index) => <button key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={photo.src} fill sizes="(max-width: 600px) 50vw, 40vw" alt={photo.alt} /></button>)}</div></section>}

      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={wedding.ceremony.image} fill sizes="(max-width: 800px) 100vw, 55vw" alt={wedding.ceremony.name} /></div><article><Church /><span>Ceremonia religiosa</span><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><p>7 de noviembre de 2026</p><a href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article></section>
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={styles.locationImage}><Image src={wedding.reception.image} fill sizes="(max-width: 800px) 100vw, 55vw" alt={wedding.reception.name} /></div><article><Sparkles /><span>Recepción</span><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>Después de la ceremonia celebraremos juntos.</p><a href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>

      <section className={styles.timeline} data-je-reveal><span>7 de noviembre</span><h2>Nos vemos muy pronto</h2><div><article><time>4:00</time><small>p. m.</small><i /><h3>Ceremonia</h3><p>Parroquia del Señor del Salitre</p></article><article><time>6:00</time><small>p. m.</small><i /><h3>Recepción</h3><p>Salón Marbella</p></article></div></section>

      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>7 de noviembre de 2026</h2><div className={styles.calendarActions}><button onClick={addCalendar}>Agregar a mi calendario</button><a href={wedding.contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Contactar por WhatsApp</a></div></section>

      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Nos acompañas?</h2><p>Por favor confirma tu asistencia antes del 31 de octubre.</p><a href={wedding.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {wedding.contact.phone}</a><div>S <i>&</i> B</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibimos tu respuesta. Nos dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes<input name="companions" type="number" min="0" max={wedding.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para los novios<textarea name="message" rows="4" placeholder="Déjanos unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>

      <section className={styles.closing} data-je-reveal><Image src={wedding.hero.image} fill sizes="100vw" alt="Celebración de Sara y Blase" /><div /><Heart /><span>Gracias por ser parte de</span><h2>nuestra historia.</h2><p>Sara <i>&</i> Blase</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>

    {activePhoto !== null && wedding.gallery[activePhoto] && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Galería de Sara y Blase"><button className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar"><X /></button><button className={styles.lightboxPrevious} onClick={() => setActivePhoto((activePhoto - 1 + wedding.gallery.length) % wedding.gallery.length)} aria-label="Fotografía anterior"><ChevronLeft /></button><div className={styles.lightboxImage}><Image src={wedding.gallery[activePhoto].src} fill sizes="100vw" alt={wedding.gallery[activePhoto].alt} /></div><button className={styles.lightboxNext} onClick={() => setActivePhoto((activePhoto + 1) % wedding.gallery.length)} aria-label="Fotografía siguiente"><ChevronRight /></button><span>{activePhoto + 1} / {wedding.gallery.length}</span></div>}
    {opened && wedding.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : wedding.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
