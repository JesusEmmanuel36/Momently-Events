"use client";
import { Music2 } from "lucide-react";
import { useState } from "react";
import styles from "./JoannaRuben.module.css";
export function JoannaSongForm() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSaving(true); setError(""); setSuccess(false);
    try {
      const response = await fetch("/api/public/weddings/joanna-y-ruben/song-suggestions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: String(data.get("title") || "").trim(), artist: String(data.get("artist") || "").trim(), website: String(data.get("website") || "") }) });
      const body = response.status === 204 ? {} : await response.json();
      if (!response.ok || body.ok !== true || !body.suggestionId) throw new Error(body.error || "No fue posible enviar la canción. Intenta nuevamente.");
      setSuccess(true); form.reset();
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  }
  return <section className={styles.songSection} data-je-reveal aria-labelledby="song-heading"><Music2 aria-hidden="true" /><span>Ayúdanos con la música</span><div className={styles.songDivider} aria-hidden="true">◇</div><h2 id="song-heading">¿Qué canción no puede faltar?</h2><p>Esa canción que te hace levantarte de la silla tiene un lugar en nuestra celebración.</p><form onSubmit={submit}><label>Nombre de la canción<input name="title" required minLength={1} maxLength={120} placeholder="Nombre de la canción" /></label><label>Artista<input name="artist" maxLength={120} placeholder="Artista (opcional)" /></label><label className={styles.songHoneypot}>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>{error && <p className={styles.songError} role="alert">{error}</p>}{success && <p className={styles.songSuccess} role="status">¡Gracias! Recibimos tu sugerencia de canción.</p>}<button disabled={saving}>{saving ? "Enviando…" : "Sugerir canción"}</button></form></section>;
}
