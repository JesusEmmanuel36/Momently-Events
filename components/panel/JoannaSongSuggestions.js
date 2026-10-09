"use client";
import { useCallback, useEffect, useState } from "react";
export function JoannaSongSuggestions({ eventId }) {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`/api/panel/events/${eventId}/song-suggestions`, { cache: "no-store", credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No fue posible cargar las canciones.");
      setSongs(data.songs); setError("");
    } catch (cause) { setError(cause.message); } finally { setLoading(false); }
  }, [eventId]);
  useEffect(() => { refresh(); const timer = setInterval(refresh, 20000); return () => clearInterval(timer); }, [refresh]);
  return <section className="dashboard-card"><div className="dashboard-card__title"><div><h2>Canciones sugeridas</h2><p>Recomendaciones enviadas desde la invitación, independientes de las confirmaciones.</p></div><button className="button button--small" onClick={refresh}>Actualizar</button></div>{error && <p className="form__error" role="alert">{error}</p>}{songs.length > 0 ? <div className="responsive-table"><table><thead><tr><th>Canción</th><th>Artista</th><th>Fecha</th></tr></thead><tbody>{songs.map((song) => <tr key={song.id}><td>{song.title}</td><td>{song.artist || "—"}</td><td>{song.createdAt ? new Date(song.createdAt).toLocaleDateString("es-MX") : "—"}</td></tr>)}</tbody></table></div> : <p>{loading ? "Cargando canciones…" : "Todavía no hay canciones sugeridas."}</p>}</section>;
}
