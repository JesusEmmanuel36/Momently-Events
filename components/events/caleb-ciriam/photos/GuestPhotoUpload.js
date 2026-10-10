"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Check, ImagePlus, LoaderCircle, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { guestPhotos, guestPhotosAreOpen } from "@/lib/event-photos/config";
import { preparePhoto } from "./prepare-photo";
import styles from "./GuestPhotoUpload.module.css";

export function GuestPhotoUpload({ initialNow, event = guestPhotos }) {
  const [now, setNow] = useState(initialNow);
  const isOpen = guestPhotosAreOpen(now, event);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const [photos, setPhotos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const urls = useRef(new Set());
  const activeRequest = useRef(null);
  useEffect(() => {
    const previews = urls.current;
    return () => { previews.forEach(url => URL.revokeObjectURL(url)); activeRequest.current?.abort(); };
  }, []);

  function selectPhotos(files) {
    if (busy || !isOpen) return;
    const incoming = Array.from(files);
    const available = event.maxBatch - photos.length;
    if (!available) { setMessage("Puedes seleccionar hasta cinco fotos. Retira alguna o comienza un nuevo envío."); return; }
    setMessage(incoming.length > available ? `Agregamos las primeras ${available} fotos. Puedes enviar más después.` : "");
    const next = incoming.slice(0, available).map(file => {
      const preview = URL.createObjectURL(file);
      urls.current.add(preview);
      return { id: crypto.randomUUID(), file, preview, status: "ready", error: "" };
    });
    setPhotos(current => [...current, ...next]);
  }

  function removePhoto(id) {
    const photo = photos.find(item => item.id === id);
    if (photo) { URL.revokeObjectURL(photo.preview); urls.current.delete(photo.preview); }
    setPhotos(current => current.filter(item => item.id !== id));
  }

  function reset() {
    photos.forEach(photo => { URL.revokeObjectURL(photo.preview); urls.current.delete(photo.preview); });
    setPhotos([]); setMessage(""); setProgress({ current: 0, total: 0 });
  }

  async function sendPhotos(submitEvent) {
    submitEvent.preventDefault();
    if (busy || !isOpen) return;
    const pending = photos.filter(photo => photo.status !== "done");
    if (!pending.length) return;
    setBusy(true); setMessage(""); setProgress({ current: 0, total: pending.length });
    let sent = 0;
    for (const [index, photo] of pending.entries()) {
      setProgress({ current: index + 1, total: pending.length });
      setPhotos(current => current.map(item => item.id === photo.id ? { ...item, status: "uploading", error: "" } : item));
      let timer;
      try {
        const prepared = await preparePhoto(photo.file, event);
        const form = new FormData();
        form.set("file", prepared, "foto.jpg");
        // Reuse this UUID on retries so a interrupted response cannot duplicate a photo.
        form.set("uploadId", photo.id);
        const controller = new AbortController();
        activeRequest.current = controller;
        timer = window.setTimeout(() => controller.abort(), 60_000);
        const response = await fetch(event.apiPath, { method: "POST", body: form, signal: controller.signal });
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.ok !== true || !result.id) throw new Error(result?.error || "No pudimos guardar esta foto. Intenta nuevamente.");
        sent += 1;
        setPhotos(current => current.map(item => item.id === photo.id ? { ...item, status: "done" } : item));
      } catch (error) {
        const detail = error.name === "AbortError" ? "La conexión tardó demasiado. Puedes volver a intentar." : error.message || "No pudimos enviar esta foto. Revisa tu conexión.";
        setPhotos(current => current.map(item => item.id === photo.id ? { ...item, status: "error", error: detail } : item));
      } finally { window.clearTimeout(timer); activeRequest.current = null; }
    }
    setBusy(false);
    setMessage(sent === pending.length ? `¡Gracias! ${sent === 1 ? "Tu foto quedó guardada" : `Tus ${sent} fotos quedaron guardadas`} para ${event.names}.` : `${sent} de ${pending.length} fotos guardadas. Puedes volver a intentar con las pendientes; las guardadas no se enviarán otra vez.`);
  }

  const pendingCount = photos.filter(photo => photo.status !== "done").length;
  return <main className={styles.page} style={event.photoTheme}>
    <div className={styles.card}>
      <Link className={styles.back} href={`/eventos/${event.slug}`}>← Ver invitación</Link>
      <Image className={styles.flowers} src={event.floral} width={560} height={373} alt="" aria-hidden="true" />
      <Camera className={styles.camera} aria-hidden="true" />
      <span className={styles.eyebrow}>{event.uploadEyebrow || "Recuerdos de nuestra boda"}</span>
      <h1>{event.partner1}{event.partner2 && <> <i>&</i> {event.partner2}</>}</h1>
      <p className={styles.intro}>{event.uploadIntro || "Comparte las fotos que tomaste y ayúdanos a guardar cada momento de este día."}</p>
      {!isOpen && <p className={styles.message} role="status">Aún no es la fecha del evento. Podrás compartir tus fotos a partir del <strong>{event.opensDateLabel}</strong>. ¡Vuelve ese día para guardar tus recuerdos con nosotros!</p>}
      {isOpen && <form onSubmit={sendPhotos}>
        <label className={styles.choose} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); selectPhotos(event.dataTransfer.files); }}>
          <ImagePlus aria-hidden="true" /><strong>Seleccionar fotos</strong><span>Hasta cinco por envío · JPG, PNG o WebP</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple disabled={busy} onChange={event => { selectPhotos(event.target.files || []); event.target.value = ""; }} />
        </label>
        {photos.length > 0 && <ul className={styles.photos}>{photos.map(photo => <li key={photo.id}>
          <div className={styles.preview}><Image src={photo.preview} fill unoptimized sizes="(max-width:600px) 45vw,200px" alt={`Vista previa: ${photo.file.name}`} />{!busy && photo.status !== "done" && <button type="button" className={styles.remove} onClick={() => removePhoto(photo.id)} aria-label={`Quitar ${photo.file.name}`}><X size={16} /></button>}</div>
          <span className={styles.filename}>{photo.file.name}</span>
          {photo.status === "done" && <span className={styles.done}><Check size={16} /> Guardada</span>}
          {photo.status === "uploading" && <span className={styles.uploading}><LoaderCircle size={16} /> Enviando…</span>}
          {photo.error && <p className={styles.error}>{photo.error}</p>}
        </li>)}</ul>}
        {busy && <div className={styles.progress} role="status"><span>Enviando foto {progress.current} de {progress.total}…</span><progress value={progress.current - 1} max={progress.total} /><small>Mantén esta página abierta mientras se envían.</small></div>}
        {message && <p className={styles.message} role="status">{message}</p>}
        {pendingCount > 0 && <button className={styles.send} disabled={busy} type="submit"><Upload size={18} />{busy ? "Enviando fotos…" : photos.some(photo => photo.status === "error") ? "Reintentar fotos pendientes" : `Enviar ${pendingCount === 1 ? "foto" : `${pendingCount} fotos`}`}</button>}
        {!busy && photos.length > 0 && pendingCount === 0 && <button type="button" className={styles.send} onClick={reset}><ImagePlus size={18} /> Subir más fotos</button>}
      </form>}
      <p className={styles.thanks}>Con cariño, {event.names}</p>
    </div>
  </main>;
}
