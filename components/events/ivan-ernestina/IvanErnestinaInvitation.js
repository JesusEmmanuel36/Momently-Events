"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Church, Copy, ExternalLink, Gift, Heart, MapPin, Pause, Play, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./IvanErnestinaInvitation.module.css";

function getCountdown(date) {
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [
    ["Días", Math.floor(remaining / 86400000)],
    ["Horas", Math.floor((remaining / 3600000) % 24)],
    ["Minutos", Math.floor((remaining / 60000) % 60)],
    ["Segundos", Math.floor((remaining / 1000) % 60)],
  ];
}

export function IvanErnestinaInvitation({ wedding }) {
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

  useEffect(() => { const update = () => setCountdown(getCountdown(wedding.date)); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, [wedding.date]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.65;
  }, [wedding.music.url]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll("[data-je-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);
  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowLeft") setActivePhoto((current) => (current - 1 + wedding.gallery.length) % wedding.gallery.length);
      if (event.key === "ArrowRight") setActivePhoto((current) => (current + 1) % wedding.gallery.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.removeProperty("overflow"); };
  }, [activePhoto, wedding.gallery.length]);
  useEffect(() => {
    if (!opened) return;

    // La pantalla del sobre ocupa todo el viewport. Al retirarla, elimina
    // cualquier bloqueo de scroll que pudiera quedar en la página y espera a
    // que el contenido abierto ya esté maquetado antes de volver al inicio.
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");

    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [opened]);
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const startMusic = () => {
    if (!wedding.music.enabled || !audioRef.current) return;
    audioRef.current.play().catch(() => setPlaying(false));
  };
  const openInvitation = () => { if (opening) return; setOpening(true); startMusic(); window.setTimeout(() => setOpened(true), 2300); };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else audioRef.current.play().then(() => setPlaying(true)).catch(() => notify("La canción estará disponible próximamente")); };
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
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:20261230T190000Z", "DTEND:20261231T050000Z", "SUMMARY:Boda de Iván y Ernestina", `LOCATION:${wedding.ceremony.address}`, `DESCRIPTION:${wedding.hero.quote}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" })); const link = document.createElement("a"); link.href = url; link.download = "boda-ivan-y-ernestina.ics"; link.click(); URL.revokeObjectURL(url); notify("Fecha agregada a tu calendario");
  };
  const share = async () => { const data = { title: "Boda de Iván y Ernestina", text: wedding.hero.quote, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } } catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); } };

  return <div className={styles.wedding}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Jardín preparado para la boda" /></div>
      <div className={styles.introShade} />
      <div className={styles.introTitle}><span>Nuestra boda</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><Image src="/images/events/ivan-ernestina/floral.png" fill sizes="500px" alt="" aria-hidden="true" /><span>Nuestra boda</span><h2>Iván <i>y</i> Ernestina</h2><small>30 · 12 · 2026</small></div>
          <Image className={styles.envelopeOpenBack} src="/images/events/ivan-ernestina/envelope-open.png" fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre floral abierto" />
          <Image className={styles.envelopeOpenFront} src="/images/events/ivan-ernestina/envelope-open.png" fill priority sizes="(max-width: 700px) 96vw, 680px" alt="" aria-hidden="true" />
          <Image className={styles.envelopeClosed} src="/images/events/ivan-ernestina/envelope-closed.png" fill priority sizes="(max-width: 700px) 96vw, 680px" alt="Sobre floral cerrado con sello I y E" />
          <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación" />
        </div>
        <button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button>
      </div>
    </div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={styles.hero}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Celebración de Iván y Ernestina" /><div className={styles.heroShade} /><Image className={styles.heroFlower} src="/images/events/ivan-ernestina/floral.png" width={700} height={470} alt="" aria-hidden="true" /><div className={styles.heroCopy}><span>{wedding.hero.subtitle}</span><h1><b>Iván</b><i>y</i><b>Ernestina</b></h1><p>Miércoles · 30 de diciembre · 2026</p></div><a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a></section>

      <section className={styles.welcome} id="bienvenida" data-je-reveal><span>Con enorme alegría</span><h2>Queremos compartir contigo<br />el comienzo de nuestra historia.</h2><p>{wedding.hero.quote}</p><div className={styles.signature}>Iván <i>&</i> Ernestina</div></section>

      <section className={styles.countdown} data-je-reveal><span>Cada vez falta menos</span><h2>Para nuestro gran día</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy celebramos nuestro amor!</h3>}</section>

      <section className={styles.family} data-je-reveal><Image src="/images/events/ivan-ernestina/floral.png" width={560} height={373} alt="" aria-hidden="true" /><span>Con la bendición de nuestros padres y padrinos</span><div className={styles.familyGrid}><article><small>Padres</small>{wedding.families.parents.map((name) => <p key={name}>{name}</p>)}</article><i /><article><small>Padrinos</small>{wedding.families.godparents.map((name) => <p key={name}>{name}</p>)}</article></div></section>

      <section className={styles.photoGallery} data-je-reveal><span>Nuestros momentos</span><h2>Donde vive el amor</h2><p>Un vistazo a las memorias que nos trajeron hasta aquí.</p><div className={styles.photoGrid}>{wedding.gallery.map((photo, index) => <button key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={photo.src} fill sizes="(max-width: 700px) 50vw, 33vw" alt={photo.alt} /></button>)}</div></section>

      <section className={styles.location} data-je-reveal><div className={styles.locationImage}><Image src={wedding.ceremony.image} fill sizes="(max-width: 800px) 100vw, 55vw" alt={wedding.ceremony.name} /></div><article><Church /><span>Ceremonia religiosa</span><h2>{wedding.ceremony.name}</h2><strong>{wedding.ceremony.time}</strong><p>{wedding.ceremony.address}</p><a href={wedding.ceremony.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article></section>
      <section className={`${styles.location} ${styles.locationReverse}`} data-je-reveal><div className={styles.locationImage}><Image src={wedding.reception.image} fill sizes="(max-width: 800px) 100vw, 55vw" alt={wedding.reception.name} /></div><article><Sparkles /><span>Recepción</span><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>{wedding.reception.address}</p><a href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article></section>

      <section className={styles.timeline} data-je-reveal><span>30 de diciembre</span><h2>Nos vemos muy pronto</h2><div><article><time>1:00</time><small>p. m.</small><i /><h3>Misa</h3><p>Parroquia de la Santa Cruz</p></article><article><time>3:00</time><small>p. m.</small><i /><h3>Recepción</h3><p>Balneario San Fernando</p></article></div></section>

      <section className={styles.gifts} data-je-reveal><Gift /><span>Un detalle con cariño</span><h2>Su presencia es nuestro mejor regalo</h2><p>Si además desean tener un detalle con nosotros, hemos preparado una mesa de regalos en Liverpool. También tendremos lluvia de sobres durante la recepción.</p><a href={wedding.registry.url} target="_blank" rel="noreferrer">Ver mesa Liverpool <strong>Evento {wedding.registry.number}</strong></a><button onClick={() => { navigator.clipboard.writeText(wedding.registry.number); notify("Número de evento copiado"); }}><Copy /> Copiar número</button></section>

      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>30 de diciembre de 2026</h2><div className={styles.calendarActions}><button onClick={addCalendar}>Agregar a mi calendario</button><a href="/eventos/ivan-y-ernestina/imprimir">Versión para imprimir</a></div></section>

      <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Nos acompañas?</h2><p>Por favor confirma tu asistencia antes del 20 de diciembre.</p><div>I <i>&</i> E</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibimos tu respuesta. Nos dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Número de acompañantes<input name="companions" type="number" min="0" max={wedding.maxCompanions} defaultValue="0" /></label><label>Comentarios o consideraciones<textarea name="notes" rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para los novios<textarea name="message" rows="4" placeholder="Déjanos unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Confirmar asistencia"}</button></form>}</section>

      <section className={styles.closing} data-je-reveal><Image src={wedding.hero.image} fill sizes="100vw" alt="Jardín de la celebración" /><div /><Heart /><span>Gracias por ser parte de</span><h2>nuestra historia.</h2><p>Iván <i>&</i> Ernestina</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {opened && wedding.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : wedding.music.label}</span></button>}
    {activePhoto !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Galería de Iván y Ernestina" onClick={() => setActivePhoto(null)}><button className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar galería"><X /></button><button className={styles.lightboxPrevious} onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto - 1 + wedding.gallery.length) % wedding.gallery.length); }} aria-label="Fotografía anterior"><ChevronLeft /></button><div className={styles.lightboxImage} onClick={(event) => event.stopPropagation()}><Image src={wedding.gallery[activePhoto].src} fill sizes="95vw" alt={wedding.gallery[activePhoto].alt} /></div><button className={styles.lightboxNext} onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto + 1) % wedding.gallery.length); }} aria-label="Fotografía siguiente"><ChevronRight /></button><span>{String(activePhoto + 1).padStart(2, "0")} / {String(wedding.gallery.length).padStart(2, "0")}</span></div>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
