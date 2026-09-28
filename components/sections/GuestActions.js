"use client";

import { Check, ChevronDown, Copy, Gift, Heart, MessageCircle, Music2, Share2 } from "lucide-react";
import { useState } from "react";
import { Modal, Reveal, SectionHeading } from "@/components/ui";

export function GiftRegistrySection({ wedding, onToast }) {
  const [bankOpen, setBankOpen] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(wedding.bank.clabe.replaceAll(" ", "")); onToast("CLABE copiada"); };
  return <section className="section gifts"><Reveal><Gift strokeWidth={1} className="section-icon" /><SectionHeading eyebrow="Mesa de regalos" title="Tu presencia es nuestro mejor regalo" copy="Pero si deseas tener un detalle con nosotros, hemos preparado las siguientes opciones." /></Reveal>
    <Reveal className="gifts__links">{wedding.gifts.map((gift) => <a href={gift.url} target="_blank" rel="noreferrer" key={gift.name}>{gift.name}<span>↗</span></a>)}{wedding.bank.enabled && <button onClick={() => setBankOpen(true)}>Transferencia <span>＋</span></button>}</Reveal>
    {wedding.bank.enabled && <Modal open={bankOpen} onClose={() => setBankOpen(false)} label="Datos para transferencia"><span className="eyebrow">Transferencia</span><h2>Gracias por tu cariño</h2><dl className="bank-data"><div><dt>Banco</dt><dd>{wedding.bank.bank}</dd></div><div><dt>Titular</dt><dd>{wedding.bank.holder}</dd></div><div><dt>CLABE</dt><dd>{wedding.bank.clabe}</dd></div><div><dt>Cuenta</dt><dd>{wedding.bank.account}</dd></div></dl><button className="button" onClick={copy}><Copy size={16} /> Copiar CLABE</button></Modal>}
  </section>;
}

export function RSVPSection({ wedding }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleRSVPSubmit = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim(); const attendance = form.get("attendance"); const guests = Number(form.get("guests"));
    if (!name || !attendance || guests < 0) { setError("Por favor completa tu nombre, asistencia y número de acompañantes."); return; }
    const payload = { name, attending: attendance, companions: guests, menuPreference: form.get("menu"), allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: String(form.get("songTitle") || ""), artist: String(form.get("artist") || ""), website: String(form.get("website") || "") };
    setSubmitting(true); setError("");
    try {
      if (wedding.isLive) {
        const storageKey = `momently:rsvp:${wedding.eventId}`; const stored = JSON.parse(localStorage.getItem(storageKey) || "null"); const isEditing = Boolean(stored?.rsvpId && stored?.editToken); const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: isEditing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(isEditing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(isEditing ? { rsvpId: stored.rsvpId } : {}) }) });
        const result = response.status === 204 ? {} : await response.json(); if (!response.ok) throw new Error(result.error || "No pudimos registrar tu respuesta.");
        localStorage.setItem(storageKey, JSON.stringify({ rsvpId: result.rsvpId || stored.rsvpId, editToken: result.editToken || stored.editToken, data: payload }));
      }
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSubmitting(false); }
  };
  const brideInitial = wedding.couple.bride.trim().charAt(0).toUpperCase(); const groomInitial = wedding.couple.groom.trim().charAt(0).toUpperCase();
  return <section className="rsvp" id="rsvp"><div className="rsvp__aside"><span className="eyebrow">R S V P</span><h2>¿Nos acompañas?</h2><p>Por favor confirma tu asistencia antes del <strong>{wedding.rsvpDeadline}</strong>.</p><div className="rsvp__initials">{brideInitial} <i>&</i> {groomInitial}</div></div>
    <Reveal className="rsvp__form-wrap">{success ? <div className="success"><span><Check /></span><h3>¡Gracias, {success}!</h3><p>Tu respuesta ha sido registrada. Nos llena de alegría compartir este momento contigo.</p><button className="text-link" onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form className="form" onSubmit={handleRSVPSubmit} noValidate>
      <label>Nombre completo<input name="name" placeholder="Escribe tu nombre" required /></label>
      <fieldset><legend>¿Asistirás?</legend><div className="choice-row"><label><input type="radio" name="attendance" value="yes" /><span>Sí, ahí estaré</span></label><label><input type="radio" name="attendance" value="no" /><span>No podré asistir</span></label></div></fieldset>
      <div className="form__two"><label>Número de acompañantes<input type="number" name="guests" min="0" max={wedding.rsvpSettings?.maxCompanions ?? 5} defaultValue="0" /></label><label>Preferencia de menú<select name="menu" defaultValue="normal"><option value="normal">Normal</option><option value="vegetarian">Vegetariano</option><option value="child">Infantil</option></select></label></div>
      <label>Alergias o comentarios<textarea name="notes" placeholder="Cuéntanos si debemos considerar algo" rows="3" /></label><label>Mensaje para los novios <small>Opcional</small><textarea name="message" placeholder="Déjanos unas palabras para nuestro gran día…" rows="4" /></label>
      {wedding.rsvpSettings?.askSongSuggestion && <div className="form__two"><label>Canción sugerida <small>Opcional</small><input name="songTitle" placeholder="Nombre de la canción" /></label><label>Artista<input name="artist" placeholder="Artista" /></label></div>}
      <label className="honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {error && <p className="form__error" role="alert">{error}</p>}<button className="button" type="submit" disabled={submitting}>{submitting ? "Guardando…" : "Confirmar asistencia"}</button><p className="form__privacy">Tu información será utilizada únicamente para la organización de este evento y será visible para sus organizadores.</p>
    </form>}</Reveal>
  </section>;
}

export function SongSection({ wedding }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => { event.preventDefault(); setError(""); const form = new FormData(event.currentTarget); try { if (wedding?.isLive) { const key = `momently:rsvp:${wedding.eventId}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); if (!stored?.rsvpId || !stored?.editToken || !stored?.data) throw new Error("Primero confirma tu asistencia para agregar una canción."); const payload = { ...stored.data, songTitle: String(form.get("songTitle")), artist: String(form.get("artist")), rsvpId: stored.rsvpId }; const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: "PATCH", headers: { "Content-Type": "application/json", "X-RSVP-Edit-Token": stored.editToken }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); localStorage.setItem(key, JSON.stringify({ ...stored, data: payload })); } setDone(true); event.currentTarget.reset(); setTimeout(() => setDone(false), 4000); } catch (cause) { setError(cause.message); } };
  return <section className="section song"><Reveal><Music2 strokeWidth={1} /><SectionHeading eyebrow="Ayúdanos con la música" title="¿Qué canción no puede faltar?" copy="Esa canción que te hace levantarte de la silla tiene un lugar en nuestra celebración." /></Reveal><Reveal><form onSubmit={submit} className="song__form"><input name="songTitle" aria-label="Nombre de canción" placeholder="Nombre de la canción" required /><input name="artist" aria-label="Artista" placeholder="Artista" required /><button className="button">Sugerir canción</button></form>{error && <p className="form__error">{error}</p>}{done && <p className="inline-success"><Check size={16} /> ¡Agregada a nuestra playlist de deseos!</p>}</Reveal></section>;
}

export function FAQSection({ wedding }) {
  const [open, setOpen] = useState(0);
  return <section className="section faq"><Reveal><SectionHeading eyebrow="Antes del gran día" title="Preguntas frecuentes" /></Reveal><div className="faq__list">{wedding.faqs.map((faq, index) => <Reveal key={faq.question}><button className={open === index ? "is-open" : ""} onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{faq.question}</span><ChevronDown /></button><div className={`faq__answer ${open === index ? "is-open" : ""}`}><p>{faq.answer}</p></div></Reveal>)}</div></section>;
}

export function ShareContact({ wedding, onToast }) {
  const share = async () => {
    const data = { title: `Boda de ${wedding.couple.bride} y ${wedding.couple.groom}`, text: wedding.heroQuote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); onToast("Enlace copiado"); } } catch (error) { if (error?.name !== "AbortError") onToast("No fue posible compartir el enlace"); }
  };
  return <section className="share"><Reveal><Heart strokeWidth={1} /><h2>¿Tienes alguna duda?</h2><p>Estamos felices de ayudarte con cualquier detalle.</p><div className="button-row"><button className="button" onClick={share}><Share2 size={16} /> Compartir invitación</button>{wedding.whatsapp && <a className="text-link" href={wedding.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Contactar por WhatsApp</a>}</div></Reveal></section>;
}
