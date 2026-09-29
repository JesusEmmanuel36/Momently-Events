"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

export function RsvpRealtime({ eventId, initialRsvps }) {
  const [items, setItems] = useState(initialRsvps); const [error, setError] = useState(""); const [filter, setFilter] = useState("all"); const [search, setSearch] = useState(""); const [selected, setSelected] = useState(null); const [saving, setSaving] = useState(false);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`/api/panel/events/${eventId}/rsvps`, { credentials: "same-origin", cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "No fue posible actualizar las confirmaciones.");
      setItems(body.rsvps);
      setError("");
    } catch (cause) {
      setError(cause.message || "No fue posible actualizar las confirmaciones.");
    }
  }, [eventId]);
  useEffect(() => {
    setItems(initialRsvps);
    const timer = window.setInterval(refresh, 15000);
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("focus", refresh);
    window.addEventListener("momently:rsvp-refresh", refresh);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("momently:rsvp-refresh", refresh);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [initialRsvps, refresh]);
  const visible = useMemo(() => items.filter((item) => (filter === "all" || item.attending === filter) && item.name?.toLowerCase().includes(search.toLowerCase())), [items, filter, search]);
  const stats = useMemo(() => ({ responses: items.length, yes: items.filter((x) => x.attending === "yes").length, no: items.filter((x) => x.attending === "no").length, people: items.reduce((sum, x) => sum + Number(x.totalPeople || 0), 0), companions: items.reduce((sum, x) => sum + Number(x.companions || 0), 0) }), [items]);
  const update = async (event) => { event.preventDefault(); setSaving(true); const form = new FormData(event.currentTarget); const payload = { name: form.get("name"), attending: form.get("attending"), companions: Number(form.get("companions")), menuPreference: form.get("menuPreference"), allergies: form.get("allergies"), message: form.get("message"), songTitle: form.get("songTitle"), artist: form.get("artist") }; const response = await fetch(`/api/panel/events/${eventId}/rsvps/${selected.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); setSaving(false); if (!response.ok) { const body = await response.json(); return setError(body.error); } setSelected(null); await refresh(); };
  return <><div className="stats-grid stats-grid--five"><article><span>Respuestas</span><strong>{stats.responses}</strong></article><article><span>Confirmados</span><strong>{stats.yes}</strong></article><article><span>No asistirán</span><strong>{stats.no}</strong></article><article><span>Personas</span><strong>{stats.people}</strong></article><article><span>Acompañantes</span><strong>{stats.companions}</strong></article></div><section className="dashboard-card"><div className="dashboard-card__title"><div><h2>Confirmaciones</h2><p>Selecciona una respuesta para consultar o corregirla.</p></div><a className="button button--small" href={`/api/panel/events/${eventId}/export`}>Exportar CSV</a></div><div className="table-toolbar"><input placeholder="Buscar por nombre" value={search} onChange={(e) => setSearch(e.target.value)} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">Todos</option><option value="yes">Asistirán</option><option value="no">No asistirán</option></select></div>{error && <p className="form__error">{error}</p>}{visible.length ? <div className="responsive-table"><table><thead><tr><th>Nombre</th><th>Asistencia</th><th>Personas</th><th>Menú</th><th>Alergias</th><th>Mensaje</th><th>Fecha</th></tr></thead><tbody>{visible.map((item) => <tr className="clickable-row" key={item.id} onClick={() => setSelected(item)}><td><strong>{item.name}</strong></td><td><span className={`attendance attendance--${item.attending}`}>{item.attending === "yes" ? "Asistirá" : "No asistirá"}</span></td><td>{item.totalPeople} {item.totalPeople === 1 ? "persona" : "personas"}</td><td>{item.menuPreference || "—"}</td><td>{item.allergies || "—"}</td><td className="cell-message">{item.message || "—"}</td><td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("es-MX") : "—"}</td></tr>)}</tbody></table></div> : <div className="empty-state"><h3>Todavía no hay confirmaciones</h3><p>Cuando los invitados respondan, aparecerán aquí.</p></div>}</section>{selected && <div className="modal-backdrop" onMouseDown={() => setSelected(null)}><div className="modal-card panel-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-x" onClick={() => setSelected(null)}>×</button><span className="dashboard-eyebrow">Detalle RSVP</span><h2>{selected.name}</h2><form className="form" onSubmit={update}><label>Nombre<input name="name" defaultValue={selected.name} required /></label><div className="form__two"><label>Asistencia<select name="attending" defaultValue={selected.attending}><option value="yes">Sí asistirá</option><option value="no">No asistirá</option></select></label><label>Acompañantes<input name="companions" type="number" min="0" max="20" defaultValue={selected.companions} /></label></div><label>Menú<select name="menuPreference" defaultValue={selected.menuPreference || "normal"}><option value="normal">Normal</option><option value="vegetarian">Vegetariano</option><option value="child">Infantil</option></select></label><label>Alergias<textarea name="allergies" defaultValue={selected.allergies} /></label><label>Mensaje<textarea name="message" defaultValue={selected.message} /></label><div className="form__two"><label>Canción<input name="songTitle" defaultValue={selected.songSuggestion?.title || ""} /></label><label>Artista<input name="artist" defaultValue={selected.songSuggestion?.artist || ""} /></label></div><button className="button" disabled={saving}>{saving ? "Guardando…" : "Guardar cambios"}</button></form></div></div>}</>;
}
