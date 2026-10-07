"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { guestPhotos } from "@/lib/event-photos/config";
import styles from "./GuestPhotoGallery.module.css";

export function GuestPhotoGallery({ event = guestPhotos }) {
  const [photos, setPhotos] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState(null);
  const closeButton = useRef(null);
  const trigger = useRef(null);
  const inFlight = useRef(false);

  async function load(next = "") {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError("");
    try {
      const response = await fetch(event.apiPath + (next ? `?cursor=${encodeURIComponent(next)}` : ""));
      const result = await response.json();
      if (!response.ok || !Array.isArray(result.photos)) throw new Error(result.error || "No pudimos cargar las fotos.");
      setPhotos(current => next ? [...new Map([...current, ...result.photos].map(photo => [photo.id, photo])).values()] : result.photos);
      setCursor(result.nextCursor); setLoaded(true);
    } catch (failure) { setError(failure.message || "No pudimos cargar las fotos."); }
    finally { inFlight.current = false; setBusy(false); }
  }

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const key = event => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive(index => (index + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive(index => (index - 1 + photos.length) % photos.length);
      if (event.key === "Tab") {
        const buttons = [...closeButton.current.parentElement.querySelectorAll("button")];
        const index = buttons.indexOf(document.activeElement);
        event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length].focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); trigger.current?.focus(); };
  }, [active, photos.length]);

  return <div className={styles.gallery}>
    <h3>Las fotos de nuestros invitados</h3>
    <p>Los recuerdos que compartan aparecerán aquí.</p>
    <button type="button" disabled={busy} onClick={() => load()}>{busy ? "Cargando fotos…" : loaded ? "Actualizar galería" : "Ver fotos del evento"}</button>
    {error && <p role="alert">{error}</p>}
    {loaded && !photos.length && <p role="status">Aún no hay fotos compartidas. ¡Aquí reuniremos los recuerdos de nuestra boda!</p>}
    <div className={styles.grid}>{photos.map((photo, index) => <button type="button" key={photo.id} onClick={event => { trigger.current = event.currentTarget; setActive(index); }} aria-label={`Abrir foto de invitados ${index + 1}`}><Image src={photo.thumbnail} alt={`Recuerdo de la boda ${index + 1}`} fill unoptimized sizes="(max-width:600px) 45vw,240px" /></button>)}</div>
    {cursor && <button type="button" disabled={busy} onClick={() => load(cursor)}>Ver más fotos</button>}
    {active !== null && photos[active] && createPortal(<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Fotos de los invitados">
      <button ref={closeButton} type="button" onClick={() => setActive(null)} aria-label="Cerrar foto">✕</button>
      <button type="button" onClick={() => setActive((active - 1 + photos.length) % photos.length)} aria-label="Foto anterior">‹</button>
      <Image src={photos[active].url} alt={`Recuerdo de la boda ${active + 1}`} fill unoptimized sizes="100vw" />
      <button type="button" onClick={() => setActive((active + 1) % photos.length)} aria-label="Foto siguiente">›</button>
      <span>{active + 1} / {photos.length}</span>
    </div>, document.body)}
  </div>;
}
