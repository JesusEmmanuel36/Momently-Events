"use client";

import { Check, Gift, Heart, MessageCircle, Music2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";

export function GiftRegistrySection({ wedding }) {
  return <section className="section gifts"><Reveal><Gift strokeWidth={1} className="section-icon" /><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description} /></Reveal></section>;
}

export function RSVPSection({ wedding }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    try { const value = JSON.parse(localStorage.getItem(`momently:rsvp:${wedding.slug}`) || "null"); if (value?.rsvpId && value?.editToken) setSaved(value); } catch {}
  }, [wedding.slug]);
  const handleRSVPSubmit = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim(); const attendance = form.get("attendance");
    if (name.length < 2 || name.length > 100 || !["yes", "no"].includes(attendance)) { setError("Por favor completa tu nombre e indica si asistirás."); return; }
    const payload = { name, attending: attendance, companions: 0, allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: String(form.get("songTitle") ?? saved?.data?.songTitle ?? ""), artist: String(form.get("artist") ?? saved?.data?.artist ?? ""), website: String(form.get("website") || "") };
    setSubmitting(true); setError("");
    try {
      {
        const storageKey = `momently:rsvp:${wedding.slug}`; const stored = saved;
        try { const latest = JSON.parse(localStorage.getItem(storageKey) || "null"); if (latest?.rsvpId === stored?.rsvpId && latest?.data) { payload.songTitle = latest.data.songTitle || ""; payload.artist = latest.data.artist || ""; } } catch {}
        const isEditing = Boolean(stored?.rsvpId && stored?.editToken); const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: isEditing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(isEditing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(isEditing ? { rsvpId: stored.rsvpId } : {}) }) });
        const result = response.status === 204 ? {} : await response.json(); if (!response.ok || result.ok !== true || !result.rsvpId || (!isEditing && !result.editToken)) throw new Error(result.error || "No pudimos registrar tu respuesta.");
        const confirmation = { rsvpId: result.rsvpId, editToken: result.editToken || stored?.editToken, data: payload };
        setSaved(confirmation);
        try { localStorage.setItem(storageKey, JSON.stringify(confirmation)); } catch {}
      }
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSubmitting(false); }
  };
  const brideInitial = wedding.couple.bride.trim().charAt(0).toUpperCase(); const groomInitial = wedding.couple.groom.trim().charAt(0).toUpperCase();
  return <section className="rsvp" id="rsvp"><div className="rsvp__aside"><span className="eyebrow">R S V P</span><h2>¿Nos acompañas?</h2><p>Es muy importante que confirmes tu asistencia para acompañarnos en este día tan especial.</p><div className="rsvp__initials">{brideInitial} <i>&</i> {groomInitial}</div></div>
    <Reveal className="rsvp__form-wrap">{success ? <div className="success"><span><Check /></span><h3>¡Gracias, {success}!</h3><p>Tu respuesta ha sido registrada. Nos llena de alegría compartir este momento contigo.</p><button className="text-link" onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form className="form" onSubmit={handleRSVPSubmit} noValidate>
      <label>Nombre completo<input name="name" placeholder="Escribe tu nombre" defaultValue={saved?.data?.name || ""} maxLength={100} required /></label>
      <fieldset><legend>¿Asistirás?</legend><div className="choice-row"><label><input type="radio" name="attendance" value="yes" defaultChecked={saved?.data?.attending === "yes"} /><span>Sí, ahí estaré</span></label><label><input type="radio" name="attendance" value="no" defaultChecked={saved?.data?.attending === "no"} /><span>No podré asistir</span></label></div></fieldset>
      <label>Alergias o comentarios<textarea name="notes" defaultValue={saved?.data?.allergies || ""} maxLength={500} placeholder="Cuéntanos si debemos considerar algo" rows="3" /></label><label>Mensaje para los novios <small>Opcional</small><textarea name="message" defaultValue={saved?.data?.message || ""} maxLength={1000} placeholder="Déjanos unas palabras para nuestro gran día…" rows="4" /></label>
      {wedding.rsvpSettings?.askSongSuggestion && <div className="form__two"><label>Canción sugerida <small>Opcional</small><input name="songTitle" placeholder="Nombre de la canción" /></label><label>Artista<input name="artist" placeholder="Artista" /></label></div>}
      <label className="honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {error && <p className="form__error" role="alert">{error}</p>}<button className="button" type="submit" disabled={submitting}>{submitting ? "Guardando…" : "Confirmar asistencia"}</button><p className="form__privacy">Tu información será utilizada únicamente para la organización de este evento y será visible para sus organizadores.</p>
    </form>}</Reveal>
  </section>;
}

export function ShareContact({ wedding, onToast }) {
  const share = async () => {
    const data = { title: `Boda de ${wedding.couple.bride} y ${wedding.couple.groom}`, text: wedding.heroQuote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); onToast("Enlace copiado"); } } catch (error) { if (error?.name !== "AbortError") onToast("No fue posible compartir el enlace"); }
  };
  return <section className="share"><Reveal><Heart strokeWidth={1} /><h2>¿Tienes alguna duda?</h2><p>Estamos felices de ayudarte con cualquier detalle.</p><div className="button-row"><button className="button" onClick={share}><Share2 size={16} /> Compartir invitación</button>{wedding.whatsapp && <a className="text-link" href={wedding.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Contactar por WhatsApp</a>}</div></Reveal></section>;
}

export function SongSection({ wedding }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setError(""); setDone(false); setSaving(true);
    try {
      const key = `momently:rsvp:${wedding.slug}`;
      let stored;
      try { stored = JSON.parse(localStorage.getItem(key) || "null"); } catch {}
      if (!stored?.rsvpId || !stored?.editToken || !stored?.data) throw new Error("Primero confirma tu asistencia para sugerir una canción.");
      const songTitle = String(form.get("songTitle") || "").trim();
      const artist = String(form.get("artist") || "").trim();
      if (!songTitle || !artist) throw new Error("Escribe el nombre de la canción y el artista.");
      const data = { ...stored.data, songTitle, artist };
      const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, {
        method:"PATCH", headers:{"Content-Type":"application/json","X-RSVP-Edit-Token":stored.editToken},
        body:JSON.stringify({...data,rsvpId:stored.rsvpId}),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true || !result.rsvpId) throw new Error(result.error || "No pudimos guardar tu canción. Intenta de nuevo.");
      try { localStorage.setItem(key,JSON.stringify({...stored,data})); } catch {}
      setDone(true); formElement.reset();
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  return <section className="section song"><Reveal><Music2 strokeWidth={1} /><SectionHeading eyebrow="Ayúdanos con la música" title="¿Qué canción no puede faltar?" copy="Después de confirmar tu asistencia, comparte esa canción que te hace levantarte a bailar." /></Reveal><Reveal><form onSubmit={submit} className="song__form"><input name="songTitle" aria-label="Nombre de la canción" placeholder="Nombre de la canción" maxLength={120} required /><input name="artist" aria-label="Artista" placeholder="Artista" maxLength={120} required /><button className="button" disabled={saving}>{saving ? "Guardando…" : "Sugerir canción"}</button></form>{error && <p className="form__error" role="alert">{error}</p>}{done && <p className="inline-success" role="status"><Check size={16} /> ¡Guardamos tu sugerencia!</p>}</Reveal></section>;
}
