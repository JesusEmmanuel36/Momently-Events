"use client";

import Image from "next/image";
import { Check, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Heart, MapPin, MessageCircle, Pause, Play, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "@/components/events/sara-blase/SaraBlaseInvitation.module.css";
import customStyles from "./Liliana53.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const defaultAssets = {
  floral: "/images/events/liliana-53/floral.png",
  envelopeClosed: "/images/events/liliana-53/envelope-closed.png",
  envelopeOpen: "/images/events/liliana-53/envelope-open.png",
};
const defaultTheme = {
  "--coral": "#b7654d", "--peach": "#df9a7e", "--olive": "#73785e", "--dark": "#432d27",
  "--gold": "#b48a4e", "--gold-soft": "#d9bc91", "--paper": "#fffaf4", "--ivory": "#f3e2d5",
  "--charcoal": "#4b3730", "--muted": "#7d6961", "--accent-light": "#f0c4ae",
};

function getCountdown(date) {
  if (!date) return undefined;
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

function displayTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value || "")) return [value || "Por confirmar", ""];
  const [hours, minutes] = value.split(":").map(Number);
  return [`${hours % 12 || 12}:${String(minutes).padStart(2, "0")}`, hours >= 12 ? "p. m." : "a. m."];
}

export function Liliana53Template({ wedding, assets = defaultAssets, customTheme = {}, nameClassName = "", heroFramed = false }) {
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
      const result = response.status === 204 ? {} : await response.json();
      if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload }));
      else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    if (!wedding.date) return;
    openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, end: wedding.endDate, durationHours: 8, location: wedding.reception.address || wedding.reception.name, details: wedding.hero.quote });
  };
  const share = async () => {
    const data = { title: wedding.eventTitle, text: wedding.hero.quote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } }
    catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); }
  };

  return <div className={`${styles.wedding} ${customStyles.invitation}`} style={theme}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt={`Celebración de ${names}`} /></div><div className={styles.introShade} />
      <div className={styles.introTitle}><span>{wedding.hero.subtitle}</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={`${styles.letter} ${customStyles.letter}`}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>{wedding.hero.subtitle}</span><h2 className={`${localStyles.letterName} ${nameClassName}`}>{wedding.couple.partner1}</h2><small>{wedding.dateStamp || "28 · 11 · 2026"}</small></div>
        <Image className={`${styles.envelopeOpenBack} ${customStyles.openEnvelope}`} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt={`Sobre abierto de ${names}`} />
        <Image className={`${styles.envelopeOpenFront} ${customStyles.openEnvelope} ${customStyles.openFront}`} src={envelopeOpen} fill priority sizes="(max-width: 700px) 96vw, 680px" alt="" aria-hidden="true" />
        <Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width: 700px) 96vw, 680px" alt={`Sobre cerrado de ${names}`} />
        <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"></button>
      </div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div>
    </div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={`${styles.hero} ${customStyles.hero} ${heroFramed ? localStyles.heroFramed : ""}`}><Image className={`${localStyles.heroImage} ${customStyles.heroImage}`} src={wedding.hero.image} fill priority sizes="100vw" alt={`Celebración de ${names}`} /><div className={`${styles.heroShade} ${customStyles.heroShade}`} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopy} ${customStyles.heroCopy}`}><h1 className={`${localStyles.heroName} ${nameClassName}`}><b>{wedding.displayNames.partner1}</b></h1><strong className={customStyles.age}><span>53</span><small>años</small></strong><p>{wedding.dateDisplay || "Sábado · 28 de noviembre · 2026"}</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>

      <section className={styles.welcome} id="bienvenida" data-je-reveal><span>Celebremos juntos</span><h2>53 años de vida,<br />recuerdos y alegría.</h2><p>{wedding.hero.quote}</p><div className={`${styles.signature} ${customStyles.fullNames}`}>{wedding.couple.partner1}</div></section>

      {wedding.featuredPhoto && <section className={customStyles.featuredPhoto} data-je-reveal aria-label="Un recuerdo de Alejandra y David"><Image src={wedding.featuredPhoto.src} width={wedding.featuredPhoto.width} height={wedding.featuredPhoto.height} sizes="(max-width: 800px) 90vw, 800px" alt={wedding.featuredPhoto.alt} /></section>}

      {wedding.thought && <section className={localStyles.thought} data-je-reveal><Image src={floral} width={680} height={453} alt="" aria-hidden="true" /><span>Un pensamiento de amor</span><blockquote>{wedding.thought.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote><div>L</div></section>}

      {wedding.bibleVerse && <section className={localStyles.verse} data-je-reveal><span>{wedding.bibleVerse.reference}</span><p>“{wedding.bibleVerse.text}”</p></section>}

      <section className={styles.countdown} data-je-reveal><span>Cada vez falta menos</span><h2>Para mi gran día</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>

      {wedding.family && <section className={styles.family} data-je-reveal><Image src={floral} width={560} height={373} alt="" aria-hidden="true" /><span>Con la bendición y el amor de</span><h2>Nuestros padres y padrinos</h2>{wedding.family.groups ? <div className={localStyles.familyGroups}>{wedding.family.groups.map((group) => <article key={group.title}><small>{group.title}</small>{group.names.map((name) => <p key={name}>{name}</p>)}</article>)}</div> : <div className={styles.familyGrid}><article>{wedding.family.brideParents ? <><div className={localStyles.parentGroup}><small>Padres de la novia</small>{wedding.family.brideParents.map((name) => <p key={name}>{name}</p>)}</div><div className={localStyles.parentGroup}><small>Padres del novio</small>{wedding.family.groomParents.map((name) => <p key={name}>{name}</p>)}</div></> : <><small>Nuestros padres</small>{wedding.family.parents.map((name) => <p key={name}>{name}</p>)}</>}</article><i /><article><small>Nuestros padrinos</small>{wedding.family.godparents.map((name) => <p key={name}>{name}</p>)}</article></div>}{wedding.family.memorial && <p className={localStyles.memorial}>{wedding.family.memorial}</p>}</section>}

      {wedding.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Mis recuerdos</span><h2>Una historia en fotografías</h2><p>Pequeños momentos llenos de cariño.</p><div className={`${styles.photoGrid} ${customStyles.photoGrid}`}>{wedding.gallery.map((photo, index) => <button key={photo.src} style={{aspectRatio:`${photo.width}/${photo.height}`}} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={photo.src} fill sizes="(max-width: 600px) 50vw, 40vw" alt={photo.alt} /></button>)}</div></section>}


      {wedding.reception.enabled && <section className={styles.location} data-je-reveal><div className={`${styles.locationImage} ${customStyles.venueArtwork}`}><Image src={wedding.reception.image} fill sizes="(max-width:800px) 100vw,55vw" alt="Arreglo floral para la recepción" /></div><article><Sparkles /><span>Mi fiesta</span><h2>{wedding.reception.name}</h2>{wedding.reception.time && <strong>{wedding.reception.time}</strong>}{wedding.reception.address && <p>{wedding.reception.address}</p>}{wedding.reception.mapsUrl && <a href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a>}</article></section>}

      {wedding.itinerary.length > 0 && <section className={styles.timeline} data-je-reveal><span>{wedding.timelineDate || "28 de noviembre"}</span><h2>Los momentos de mi celebración</h2><div>{wedding.itinerary.map((item) => { const [time, period] = displayTime(item.time); return <article key={`${item.time}-${item.title}`}><time>{time}</time><small>{period}</small><i /><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></section>}

      {wedding.nextDayEvent && <section className={localStyles.nextDay} data-je-reveal><Image src={floral} width={760} height={507} alt="" aria-hidden="true" /><span>La celebración continúa</span><h2>{wedding.nextDayEvent.title}</h2><strong>{wedding.nextDayEvent.date}</strong><p>A partir de las {wedding.nextDayEvent.time}</p><small>{wedding.nextDayEvent.place}</small><a href={wedding.nextDayEvent.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin /></a></section>}

      {wedding.gifts?.length > 0 && <section className={styles.gifts} data-je-reveal><Heart /><span>Un detalle con cariño</span><h2>Tu presencia es mi mejor regalo</h2><p>{wedding.gifts[0].description}</p>{wedding.bank?.enabled && <div className={customStyles.bankDetails}><h3>Datos para transferencia</h3><dl>{wedding.bank.bank && <div><dt>Banco</dt><dd>{wedding.bank.bank}</dd></div>}<div><dt>A nombre de</dt><dd>{wedding.bank.holder}</dd></div>{[["Cuenta", wedding.bank.account], ["CLABE", wedding.bank.clabe]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd className={customStyles.bankNumber}>{value}</dd><button type="button" aria-label={`Copiar ${label}`} onClick={async () => { try { await navigator.clipboard.writeText(value); notify(`${label} copiada`); } catch { notify("No fue posible copiar. Puedes seleccionar el número."); } }}>Copiar</button></div>)}</dl></div>}</section>}

      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>{wedding.calendarDate || "28 de noviembre de 2026"}</h2><div className={styles.calendarActions}><button onClick={addCalendar} disabled={!wedding.date}>Agregar a mi calendario</button>{whatsappContacts.map((contact) => <a key={contact.whatsapp} href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp {contact.phone}</a>)}</div></section>

      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>{wedding.rsvpDeadlineDisplay ? `Por favor confirma tu asistencia antes del ${wedding.rsvpDeadlineDisplay}.` : "Confirma tu asistencia para acompañarme en este día tan especial."}</p>{whatsappContacts.map((contact) => <a key={contact.whatsapp} href={contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {contact.phone}</a>)}<div>L</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" minLength={2} maxLength={100} required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Comentarios o consideraciones<textarea name="notes" maxLength={500} rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Liliana<textarea name="message" maxLength={1000} rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>

      <section className={styles.closing} data-je-reveal><Image src={wedding.closingImage || wedding.hero.image} fill sizes="100vw" alt={`Celebración de ${names}`} /><div /><Heart /><span>Gracias por ser parte de</span><h2>mi historia.</h2><p className={customStyles.fullNames}>{wedding.couple.partner1}</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>

    {activePhoto !== null && wedding.gallery[activePhoto] && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`Galería de ${names}`}><button className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar"><X /></button><button className={styles.lightboxPrevious} onClick={() => setActivePhoto((activePhoto - 1 + wedding.gallery.length) % wedding.gallery.length)} aria-label="Fotografía anterior"><ChevronLeft /></button><div className={styles.lightboxImage}><Image src={wedding.gallery[activePhoto].src} fill sizes="100vw" alt={wedding.gallery[activePhoto].alt} /></div><button className={styles.lightboxNext} onClick={() => setActivePhoto((activePhoto + 1) % wedding.gallery.length)} aria-label="Fotografía siguiente"><ChevronRight /></button><span>{activePhoto + 1} / {wedding.gallery.length}</span></div>}
    {opened && wedding.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : wedding.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
