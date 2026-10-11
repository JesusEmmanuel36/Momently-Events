"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui";

export function MarioJazminRSVP({ wedding }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleRSVPSubmit = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim(); const attendance = form.get("attendance"); const guests = attendance === "yes" ? 1 : 0;
    if (!name || !attendance || guests < 0) { setError("Por favor completa tu nombre y confirma si asistirás."); return; }
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
  return <section className="rsvp" id="rsvp"><div className="rsvp__aside"><span className="eyebrow">R S V P</span><h2>¿Nos acompañas?</h2><p>{wedding.rsvpDeadline ? <>Por favor confirma tu asistencia antes del <strong>{wedding.rsvpDeadline}</strong>.</> : "Por favor confirma tu asistencia para acompañarnos."}</p><p><strong>Esta invitación es válida para un máximo de 2 personas.</strong></p><div className="rsvp__initials">{brideInitial} {groomInitial && <><i>&</i> {groomInitial}</>}</div></div>
    <Reveal className="rsvp__form-wrap">{success ? <div className="success"><span><Check /></span><h3>¡Gracias, {success}!</h3><p>Tu respuesta ha sido registrada. Nos llena de alegría compartir este momento contigo.</p><button className="text-link" onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form className="form" onSubmit={handleRSVPSubmit} noValidate>
      <label>Nombre completo<input name="name" placeholder="Escribe tu nombre" required /></label>
      <fieldset><legend>¿Asistirás?</legend><div className="choice-row"><label><input type="radio" name="attendance" value="yes" /><span>Sí, ahí estaré</span></label><label><input type="radio" name="attendance" value="no" /><span>No podré asistir</span></label></div></fieldset>

      {wedding.rsvpSettings?.askAllergies !== false && <label>Alergias o comentarios<textarea name="notes" placeholder="Cuéntanos si debemos considerar algo" rows="3" /></label>}{wedding.rsvpSettings?.askMessage !== false && <label>{wedding.rsvpMessageLabel || "Mensaje para los novios"} <small>Opcional</small><textarea name="message" placeholder="Déjanos unas palabras para nuestro gran día…" rows="4" /></label>}
      {wedding.rsvpSettings?.askSongSuggestion && <div className="form__two"><label>Canción sugerida <small>Opcional</small><input name="songTitle" placeholder="Nombre de la canción" /></label><label>Artista<input name="artist" placeholder="Artista" /></label></div>}
      <label className="honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {error && <p className="form__error" role="alert">{error}</p>}<button className="button" type="submit" disabled={submitting}>{submitting ? "Guardando…" : "Confirmar asistencia"}</button><p className="form__privacy">Tu información será utilizada únicamente para la organización de este evento y será visible para sus organizadores.</p>
    </form>}</Reveal>
  </section>;
}

