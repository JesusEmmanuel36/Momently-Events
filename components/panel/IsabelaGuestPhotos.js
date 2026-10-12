"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./IsabelaGuestPhotos.module.css";
export function IsabelaGuestPhotos({ eventId, opensDateLabel = "14 de marzo de 2027" }) {
  const [photos, setPhotos] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  async function load(next = "") {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/panel/events/${encodeURIComponent(eventId)}/photos${next ? `?cursor=${encodeURIComponent(next)}` : ""}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok || !Array.isArray(result.photos)) throw new Error(result.error || "No pudimos cargar las fotos.");
      setPhotos(current => next ? [...new Map([...current, ...result.photos].map(photo => [photo.id, photo])).values()] : result.photos);
      setCursor(result.nextCursor); setLoaded(true);
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return <section className={styles.section}><h2>Fotos de mis invitados</h2><p>Las fotografías compartidas en tu invitación aparecerán aquí. Puedes descargar cada una en tu celular.</p><button className="button button--small" disabled={busy} onClick={() => load()}>{busy ? "Cargando…" : loaded ? "Actualizar fotos" : "Ver fotos"}</button>{error && <p role="alert">{error}</p>}{loaded && !photos.length && <p>Aún no hay fotos compartidas. La subida estará disponible el {opensDateLabel}.</p>}<div className={styles.grid}>{photos.map((photo,index) => <article key={photo.id}><a href={photo.url} target="_blank" rel="noreferrer"><Image src={photo.thumbnail} width={500} height={500} unoptimized alt={`Foto compartida ${index + 1}`}/></a><a className="button button--small" href={photo.download} download>Descargar foto</a></article>)}</div>{cursor && <button className="button button--small" disabled={busy} onClick={() => load(cursor)}>Ver más fotos</button>}</section>;
}
