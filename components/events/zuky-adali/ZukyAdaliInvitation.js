"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, X, Church, Crown, ExternalLink, Heart, Pause, Play, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "./ZukyAdaliInvitation.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const floral = "/images/events/zuky-adali-xv/floral.png";
const envelopeClosed = "/images/events/zuky-adali-xv/envelope-closed.png";
const envelopeOpen = "/images/events/zuky-adali-xv/envelope-open.png";
const theme = {
  "--coral": "#b32638", "--peach": "#dfbf8d", "--olive": "#8f1829", "--dark": "#48141d",
  "--gold": "#b32638", "--gold-soft": "#dfbf8d", "--paper": "#fff7ec", "--ivory": "#f5e6d5",
  "--charcoal": "#48141d", "--muted": "#886570", "--accent-light": "#efd0d2", "--floral-image": `url('${floral}')`,
};

function getCountdown(date) {
  if (!date) return undefined;
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

export function ZukyAdaliInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const galleryDialog = useRef(null);
  const galleryOpen = activePhoto !== null;
  const openingTimer = useRef(null);
  const audioRef = useRef(null);

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
    if (!galleryOpen) return;
    const dialog = galleryDialog.current;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
  }, [galleryOpen]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openInvitation = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); openingTimer.current = window.setTimeout(() => setOpened(true), 2300); };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => notify("No se pudo reproducir el audio. Toca el botón para intentarlo de nuevo.")); };
  const submit = async (formEvent) => {
    formEvent.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(formEvent.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), menuPreference: "normal", allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${event.slug}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${event.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? {} : await response.json();
      if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible guardar tu confirmación. Inténtalo de nuevo.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload })); else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    if (!event.date) return;
    openGoogleCalendar({ title: "XV años de Zuky Adali", start: event.date, end: event.endDate, location: event.ceremony.address, details: event.hero.quote });
  };
  const share = async () => { const data = { title: "XV años de Zuky Adali", text: event.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding} style={theme}>
    {event.music.enabled && <audio ref={audioRef} src={event.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? `${styles.opening} ${localStyles.opening}` : ""}`}><div className={`${styles.introBackdrop} ${!event.hero.image ? localStyles.introFallback : ""}`}>{event.hero.image && <Image src={event.hero.image} fill priority sizes="100vw" alt="Retrato de Zuky Adali" />}</div><div className={styles.introShade} /><div className={styles.introTitle}><span>Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={`${styles.envelopeStage} ${localStyles.envelopeStage}`}><div className={`${styles.letter} ${localStyles.letter}`}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>Mis XV años</span><h2 className={localStyles.letterName}>Zuky Adali</h2><small>{event.dateShort}</small></div><Image className={`${styles.envelopeOpenBack} ${localStyles.envelopeOpenBack}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rojo abierto" /><Image className={`${styles.envelopeOpenFront} ${localStyles.envelopeOpenFront}`} src={envelopeOpen} fill priority sizes="(max-width:700px) 96vw,680px" alt="" aria-hidden="true" /><Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre rojo cerrado con sello ZA" /><button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" /></div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div></div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={`${styles.hero} ${!event.hero.image ? localStyles.heroFallback : ""}`}>{event.hero.image && <Image src={event.hero.image} fill priority sizes="100vw" alt="XV años de Zuky Adali" />}<div className={styles.heroShade} /><Image className={styles.heroFlower} src={floral} width={700} height={470} alt="" aria-hidden="true" /><div className={`${styles.heroCopy} ${localStyles.heroCopyCentered}`}><span>Mis XV años</span><h1 className={localStyles.heroName}><b>Zuky<span className={localStyles.secondName}>Adali</span></b></h1><p>{event.dateDisplay}</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>
      <section className={styles.welcome} id="bienvenida" data-je-reveal><Crown /><span>Un día lleno de amor</span><h2>Con amor y alegría<br />celebramos mis quince años.</h2><p>{event.hero.quote}</p><div className={styles.signature}>{event.couple.partner1}</div></section>
      <section className={styles.countdown} data-je-reveal><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</section>
      <section className={styles.welcome} data-je-reveal><span>Con el amor de mi familia</span><h2>Quienes me acompañan</h2><div className={localStyles.familyGrid}><article><h3>Mis padres</h3>{event.family.parents.map(name => <p key={name}>{name}</p>)}</article><i aria-hidden="true"/><article><h3>Mis padrinos</h3>{event.family.godparents.map(name => <p key={name}>{name}</p>)}</article></div></section>
      {event.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Mis momentos</span><h2>Un sueño que comienza</h2><p>Recuerdos de una etapa que guardaré siempre en el corazón.</p><div className={localStyles.photoGridStatic}>{event.gallery.map((photo, index) => <button type="button" key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1} de Zuky Adali`}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width: 600px) 100vw, 33vw" alt={photo.alt} /></button>)}</div></section>}
      <section className={localStyles.eventDetails} data-je-reveal>
        <header><span>Los momentos de mi celebración</span><h2>Misa y recepción</h2><p>Estos son los lugares y horarios para acompañarme en este día tan especial.</p></header>
        <div className={localStyles.eventDetailsGrid}>
          <article className={localStyles.eventCard}>
            <div className={`${localStyles.eventCardImage} ${!event.ceremony.image ? localStyles.locationFallback : ""}`}>{event.ceremony.image && <Image src={event.ceremony.image} fill sizes="(max-width:800px) 100vw,50vw" alt="Decoración floral para el XV años de Zuky Adali" />}</div>
            <div className={localStyles.eventCardCopy}><Church /><span>Misa</span><h3>{event.ceremony.name}</h3><strong>{event.ceremony.time}</strong><p>{event.ceremony.address}</p><a href={event.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></div>
          </article>
          <article className={`${localStyles.eventCard} ${localStyles.eventCardReverse}`}>
            <div className={`${localStyles.eventCardImage} ${!event.reception.image ? localStyles.locationFallback : ""}`}>{event.reception.image && <Image src={event.reception.image} fill sizes="(max-width:800px) 100vw,50vw" alt="Decoración floral para la celebración" />}</div>
            <div className={localStyles.eventCardCopy}><Sparkles /><span>Celebración</span><h3>{event.reception.name}</h3><strong>{event.reception.time}</strong><p>{event.reception.address}</p><a href={event.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <ExternalLink /></a></div>
          </article>
        </div>
      </section>
      <section className={`${styles.timeline} ${localStyles.timeline}`} data-je-reveal><span>{event.dateDisplay}</span><h2>Los momentos de mi celebración</h2><div><article><time>12:00</time><small>p. m.</small><i /><h3>Ceremonia religiosa</h3><p>{event.ceremony.name}</p></article><article><time>{event.reception.time}</time><i /><h3>Recepción</h3><p>{event.reception.name}</p></article></div></section>
      <section className={styles.welcome} data-je-reveal><span>Código de vestimenta</span><h2>{event.dressCode.title}</h2><p>{event.dressCode.text}</p><figure className={localStyles.reservedColor}><span style={{backgroundColor:event.dressCode.color}} role="img" aria-label={event.dressCode.reservedColor}/><figcaption>{event.dressCode.reservedColor}</figcaption></figure></section>
      <section className={styles.welcome} data-je-reveal><Heart/><span>Un detalle con cariño</span><h2>Tu presencia es mi mejor regalo</h2><p>{event.gifts[0].description}</p></section>
      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>{event.dateDisplay}</h2><button onClick={addCalendar} disabled={!event.date}>Agregar a mi calendario</button></section>
      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañas?</h2><p>Confirma tu asistencia para compartir conmigo este día especial.</p>{event.contact.whatsapp && <a href={event.contact.whatsapp} target="_blank" rel="noreferrer">Dudas por WhatsApp: {event.contact.phone}</a>}<div>ZA</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" minLength={2} maxLength={100} required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Comentarios o consideraciones<textarea name="notes" maxLength={500} rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para Zuky Adali<textarea name="message" maxLength={1000} rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>
      <section className={`${styles.closing} ${!event.hero.image ? localStyles.closingFallback : ""}`} data-je-reveal>{event.hero.image && <Image src={event.hero.image} fill sizes="100vw" alt="Celebración de Zuky Adali" />}<div /><Heart /><span>Gracias por ser parte de</span><h2>este día tan especial.</h2><p>Zuky Adali</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {activePhoto !== null && <dialog ref={galleryDialog} className={`${styles.lightbox} ${localStyles.galleryDialog}`} aria-label="Galería de Zuky Adali" onCancel={() => setActivePhoto(null)} onClose={() => setActivePhoto(null)} onClick={(e) => { if (e.target === e.currentTarget) setActivePhoto(null); }} onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); setActivePhoto((activePhoto - 1 + event.gallery.length) % event.gallery.length); } if (e.key === "ArrowRight") { e.preventDefault(); setActivePhoto((activePhoto + 1) % event.gallery.length); } }}>
      <button type="button" className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar galería" autoFocus><X /></button>
      <button type="button" className={styles.lightboxPrevious} onClick={() => setActivePhoto((activePhoto - 1 + event.gallery.length) % event.gallery.length)} aria-label="Fotografía anterior"><ChevronLeft /></button>
      <div className={styles.lightboxImage}><Image src={event.gallery[activePhoto].src} fill sizes="95vw" alt={event.gallery[activePhoto].alt} /></div>
      <button type="button" className={styles.lightboxNext} onClick={() => setActivePhoto((activePhoto + 1) % event.gallery.length)} aria-label="Fotografía siguiente"><ChevronRight /></button>
      <span>{activePhoto + 1} / {event.gallery.length}</span>
    </dialog>}
    {opened && event.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : event.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
