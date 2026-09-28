"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";

export function GallerySection({ wedding }) {
  const [active, setActive] = useState(null);
  const touch = useRef(0);
  const move = useCallback((step) => setActive((current) => current === null ? null : (current + step + wedding.images.gallery.length) % wedding.images.gallery.length), [wedding.images.gallery.length]);
  useEffect(() => {
    const keys = (event) => { if (event.key === "Escape") setActive(null); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); };
    document.addEventListener("keydown", keys); return () => document.removeEventListener("keydown", keys);
  }, [move]);
  return <section className="section gallery"><Reveal><SectionHeading eyebrow="Nuestros momentos" title="Donde vive el amor" copy="Un vistazo a las memorias que nos trajeron hasta aquí." /></Reveal>
    <div className="gallery__grid">{wedding.images.gallery.map((src, index) => <Reveal className={`gallery__item gallery__item--${index + 1}`} key={`${src}-${index}`}>
      <button onClick={() => setActive(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={src} fill sizes="(max-width: 768px) 50vw, 33vw" alt={wedding.galleryItems?.[index]?.alt || `Momento de ${wedding.couple.bride} y ${wedding.couple.groom}`} className="cover" /></button>
    </Reveal>)}</div>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería de fotografías" onTouchStart={(e) => { touch.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1); }}>
      <button className="icon-button lightbox__close" onClick={() => setActive(null)} aria-label="Cerrar"><X /></button>
      <button className="icon-button lightbox__prev" onClick={() => move(-1)} aria-label="Anterior"><ChevronLeft /></button>
      <div className="lightbox__image"><Image src={wedding.images.gallery[active]} fill sizes="95vw" alt={wedding.galleryItems?.[active]?.alt || `Fotografía ${active + 1}`} className="contain" /></div>
      <button className="icon-button lightbox__next" onClick={() => move(1)} aria-label="Siguiente"><ChevronRight /></button>
      <span>{String(active + 1).padStart(2, "0")} / {String(wedding.images.gallery.length).padStart(2, "0")}</span>
    </div>}
  </section>;
}

export function VideoSection({ wedding }) {
  const [failed, setFailed] = useState(false);
  return <section className="section video-section"><Reveal><SectionHeading eyebrow="Un mensaje para ti" title="Guarda este momento" /></Reveal>
    <Reveal className="video-frame">{failed || !wedding.video?.url ? <div className="video-placeholder"><span>{wedding.couple.bride.charAt(0)} & {wedding.couple.groom.charAt(0)}</span><p>Próximamente compartiremos algo especial</p></div> : <video controls preload="metadata" poster={wedding.video.posterUrl || wedding.images.couple} onError={() => setFailed(true)}><source src={wedding.video.url} /></video>}</Reveal>
  </section>;
}
