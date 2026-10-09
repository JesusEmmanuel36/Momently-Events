"use client";
import { useState } from "react";
import styles from "./PersonalizedPass.module.css";

export function PersonalizedPass({ pass, token, slug = "alejandra-y-david" }) {
  const [attending, setAttending] = useState(pass.response?.attending || "yes");
  const [people, setPeople] = useState(pass.response?.totalPeople || pass.allowedSeats);
  const [message, setMessage] = useState(pass.response?.message || "");
  const [saved, setSaved] = useState(Boolean(pass.response));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/public/event-passes/${slug}/${token}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attending, totalPeople: attending === "yes" ? Number(people) : 0, message }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || !result.rsvpId) throw new Error(result.error || "No pudimos guardar tu respuesta. Intenta nuevamente.");
      setSaved(true);
    } catch (failure) { setError(failure.message || "Revisa tu conexión e intenta nuevamente."); }
    finally { setBusy(false); }
  }
  return <section className={styles.section} id="tu-pase">
    <span>Tu pase personal</span><h2>{pass.displayName}</h2>
    <p>Tenemos reservados <strong>{pass.allowedSeats} {pass.allowedSeats === 1 ? "lugar" : "lugares"}</strong> para ustedes.</p>
    <small>Los lugares incluyen a la persona titular del pase. Agradecemos respetar el número asignado.</small>
    {saved ? <div className={styles.success} role="status"><h3>¡Tu respuesta está guardada!</h3><p>{attending === "yes" ? `Nos acompañarán ${people} ${Number(people) === 1 ? "persona" : "personas"}. ¡Gracias por confirmar!` : "Gracias por avisarnos. Los llevamos en el corazón."}</p><button type="button" onClick={() => setSaved(false)}>Editar respuesta</button></div> : <form onSubmit={submit}>
      <fieldset disabled={busy}><legend>¿Nos acompañan?</legend><label><input type="radio" checked={attending === "yes"} onChange={() => setAttending("yes")} name="attendance" value="yes" /> Sí, asistiremos</label><label><input type="radio" checked={attending === "no"} onChange={() => setAttending("no")} name="attendance" value="no" /> No podremos asistir</label></fieldset>
      {attending === "yes" && <label>Personas que asistirán, en total<select value={people} onChange={event => setPeople(Number(event.target.value))} disabled={busy}>{Array.from({ length: pass.allowedSeats }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "persona" : "personas"}</option>)}</select></label>}
      <label>Mensaje para los novios<textarea rows={3} maxLength={1000} value={message} onChange={event => setMessage(event.target.value)} disabled={busy} /></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? "Guardando…" : "Confirmar asistencia"}</button>
    </form>}
  </section>;
}
