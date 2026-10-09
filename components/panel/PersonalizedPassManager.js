"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./PersonalizedPassManager.module.css";

export function PersonalizedPassManager({ eventId, initialGuests, slug = "alejandra-y-david" }) {
  const router = useRouter();
  const [guests, setGuests] = useState(initialGuests);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copiedLink, setCopiedLink] = useState("");
  const endpoint = `/api/panel/events/${eventId}/passes`;
  const path = token => `/eventos/${slug}/pase/${token}`;
  async function save(event) {
    event.preventDefault(); if (busy) return;
    const formElement = event.currentTarget;
    const values = new FormData(formElement);
    const data = Object.fromEntries(values); data.allowedSeats = Number(data.allowedSeats);
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(editing ? `${endpoint}/${editing.id}` : endpoint, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok || !result.passToken) throw new Error(result.error || "No pudimos guardar el pase.");
      setGuests(current => editing ? current.map(item => item.id === editing.id ? result : item) : [result, ...current]);
      setEditing(null); formElement.reset(); setNotice("Pase guardado. Ya puedes copiar su enlace y enviarlo."); router.refresh();
    } catch (failure) { setError(failure.message || "Revisa tu conexión."); }
    finally { setBusy(false); }
  }
  async function generate(guest) {
    if (busy) return; setBusy(true); setError("");
    try {
      const response = await fetch(`${endpoint}/${guest.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName: guest.displayName, allowedSeats: guest.allowedSeats, phone: guest.phone || "", groupName: guest.groupName || "", notes: guest.notes || "" }) });
      const result = await response.json();
      if (!response.ok || !result.passToken) throw new Error(result.error || "No pudimos generar el enlace.");
      setGuests(current => current.map(item => item.id === guest.id ? result : item));setNotice("Enlace generado.");router.refresh();
    } catch (failure) { setError(failure.message); } finally { setBusy(false); }
  }
  async function copy(guest) {
    const link = new URL(path(guest.passToken), window.location.origin).href;
    setCopiedLink(link);
    try { await navigator.clipboard.writeText(link);setNotice(`Enlace copiado para ${guest.displayName}.`); }
    catch { setNotice("Puedes copiar manualmente el enlace de abajo."); }
  }
  async function remove(guest) {
    if (busy || !confirm(`¿Eliminar el pase de ${guest.displayName}? Su enlace dejará de funcionar; sus confirmaciones existentes se conservarán.`)) return;
    setBusy(true);setError("");
    try {
      const response = await fetch(`${endpoint}/${guest.id}`, { method: "DELETE" }); const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "No pudimos eliminar el pase.");
      setGuests(current => current.filter(item => item.id !== guest.id)); if (editing?.id === guest.id) setEditing(null); router.refresh();
    } catch (failure) { setError(failure.message); } finally { setBusy(false); }
  }
  return <div className={styles.layout}>
    <section className="dashboard-card"><h2>{editing ? "Editar pase" : "Crear pase personalizado"}</h2><p>Asigna el total de lugares, incluyendo a la persona titular. Puedes crear un pase por persona o familia.</p>
      <form className="form" key={editing?.id || "new"} onSubmit={save}>
        <label>Nombre que aparecerá en el pase<input name="displayName" minLength={2} maxLength={100} required defaultValue={editing?.displayName || ""} placeholder="Familia López" /></label>
        <label>Lugares asignados, en total<input name="allowedSeats" type="number" min={1} max={20} required defaultValue={editing?.allowedSeats || 1} /></label>
        <label>Teléfono (opcional)<input name="phone" maxLength={30} defaultValue={editing?.phone || ""} /></label>
        <label>Grupo o familia (opcional)<input name="groupName" maxLength={100} defaultValue={editing?.groupName || ""} /></label>
        <label>Notas privadas<textarea name="notes" maxLength={500} defaultValue={editing?.notes || ""} /></label>
        {error && <p className="form__error" role="alert">{error}</p>}
        <button className="button" disabled={busy}>{busy ? "Guardando…" : editing ? "Guardar cambios" : "Crear pase"}</button>
        {editing && <button type="button" className="button button--outline" onClick={() => setEditing(null)} disabled={busy}>Cancelar</button>}
      </form>
      {notice && <p role="status">{notice}</p>}
      {copiedLink && <label className={styles.link}>Enlace para enviar<input readOnly value={copiedLink} onFocus={event => event.target.select()} /></label>}
    </section>
    <section className="dashboard-card"><h2>Pases personalizados</h2><p>Cada enlace permite confirmar hasta los lugares asignados. Si vuelven a responder, se actualiza la misma confirmación.</p>
      {!guests.length && <div className="empty-state"><h3>Aún no hay pases</h3><p>Crea el primero con un nombre y sus lugares.</p></div>}
      <div className={styles.list}>{guests.map(guest => <article key={guest.id}><strong>{guest.displayName}</strong><p>{guest.allowedSeats} {guest.allowedSeats === 1 ? "lugar asignado" : "lugares asignados"}</p><div className={styles.actions}>
        {guest.passToken ? <><button type="button" className="button button--small" onClick={() => copy(guest)}>Copiar enlace</button><a className="button button--outline button--small" href={path(guest.passToken)} target="_blank" rel="noreferrer">Ver pase</a></> : <button type="button" className="button button--small" disabled={busy} onClick={() => generate(guest)}>Generar enlace</button>}
        <button type="button" className="button button--outline button--small" disabled={busy} onClick={() => { setEditing(guest);setError(""); }}>Editar</button><button type="button" className="button button--outline button--small" disabled={busy} onClick={() => remove(guest)}>Eliminar</button>
      </div></article>)}</div>
    </section>
  </div>;
}
