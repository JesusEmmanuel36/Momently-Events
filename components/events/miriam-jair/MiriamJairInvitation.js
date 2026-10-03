"use client";

import Image from "next/image";
import { MapPin, Volume2, VolumeX, X, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/sections/IntroHero";
import { Botanical, Reveal, SectionHeading } from "@/components/ui";
import styles from "./MiriamJairInvitation.module.css";

const folder = "/images/events/miriam-jair";
const floral = `${folder}/floral.png`;
function LocationBlock({ title, location, reverse }) {
  const [mapVisible, setMapVisible] = useState(false);
  return <article className={`location ${reverse ? "location--reverse" : ""}`}>
    <div className={`location__image ${styles.locationArtwork}`}><Image src={floral} fill sizes="(max-width:768px) 100vw,50vw" alt="Arreglo floral vino y beige" /></div>
    <Reveal className="location__content"><span className="eyebrow">{title}</span><MapPin className="location__icon" strokeWidth={1} /><h2>{location.name}</h2><strong>{location.time}</strong><p>{location.address}</p>
      <div className="button-row"><a className="button" href={location.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin size={15} /></a><button className="text-link" type="button" onClick={() => setMapVisible(!mapVisible)} aria-expanded={mapVisible}>{mapVisible ? "Ocultar mapa" : "Ver mapa"}</button></div>
      {mapVisible && <iframe className={styles.map} src={location.mapEmbedUrl} title={`Mapa de ${title.toLowerCase()}`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />}
    </Reveal>
  </article>;
}

export function MiriamJairInvitation({ event }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const openingTimer = useRef(null);
  const audioRef = useRef(null);
  const dialogRef = useRef(null);
  const gallery = event.gallery.slice(0, 2);

  useEffect(() => () => clearTimeout(openingTimer.current), []);
  useEffect(() => {
    if (!opened) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [opened]);
  useEffect(() => {
    if (activePhoto === null) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activePhoto]);

  const play = () => {
    if (!event.music.enabled) return;
    setMusicError("");
    audioRef.current?.play().catch(() => setMusicError("Toca el botón de música para escuchar la canción."));
  };
  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    play();
    openingTimer.current = window.setTimeout(() => setOpened(true), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1900);
  };
  const toggleMusic = () => { if (audioRef.current?.paused) play(); else audioRef.current?.pause(); };

  const pageData = { couple: { bride: event.couple.partner1, groom: event.couple.partner2 }, images: { hero: event.hero.image || floral }, heroSubtitle: "Nuestra boda", dateLong: "19 de diciembre de 2026", heroQuote: event.hero.quote };
  return <div className={styles.invitation}>
    {!opened && <div className={`intro ${opening ? "intro--leaving" : ""}`}>
      <Image src={floral} fill priority sizes="100vw" alt="Arreglo floral vino y beige" className={`cover ${styles.introBackground}`} />
      <div className="intro__overlay" /><Botanical className="intro__branch intro__branch--left" /><Botanical className="intro__branch intro__branch--right" />
      <div className="intro__content"><span className="eyebrow">Nuestra boda</span><h1 className="intro__heading">Una invitación para ti</h1>
        <div className="envelope-scene" aria-live="polite"><div className="envelope envelope--photoreal">
          <div className="envelope__letter"><span className="envelope__monogram">M <i>&</i> J</span><strong>Miriam & Jair</strong><small>{event.dateStamp}</small><Heart size={14} fill="currentColor" /></div>
          <Image className={`envelope__asset envelope__asset--open-back ${styles.openEnvelope}`} src={`${folder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre de boda abierto" />
          <Image className={`envelope__asset envelope__asset--open-front ${styles.openEnvelope}`} src={`${folder}/envelope-open.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="" aria-hidden="true" />
          <Image className="envelope__asset envelope__asset--closed" src={`${folder}/envelope-closed.png`} fill priority draggable={false} sizes="(max-width:600px) 96vw,590px" alt="Sobre vino y beige con sello MJ" />
          <button className="envelope__seal" onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"><span>Abrir invitación</span></button>
        </div></div><p className="intro__hint">Toca el sello para abrir</p>
      </div>
    </div>}

    {opened && <main className="invitation">
      <div className={gallery.length ? "" : styles.heroWithoutPhoto}><HeroSection wedding={pageData} /></div>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Con la bendición de nuestras familias</span><p>{event.hero.quote}</p><div className={styles.fullNames}>{event.fullNames.bride}<i>&</i>{event.fullNames.groom}</div><div className={styles.familyGrid}>
        <article><h3>Papás de la novia</h3>{event.family.brideParents.map(name => <p key={name}>{name}</p>)}</article>
        <article><h3>Papás del novio</h3>{event.family.groomParents.map(name => <p key={name}>{name}</p>)}</article>
        <article><h3>Padrinos</h3>{event.family.godparents.map(name => <p key={name}>{name}</p>)}</article>
      </div></Reveal></section>
      {gallery.length > 0 && <section className={styles.photos} aria-label="Nuestras fotografías">{gallery.map((photo, index) => <button key={photo.src} type="button" onClick={() => setActivePhoto(index)} aria-label={`Ampliar fotografía ${index + 1}`}><Image src={photo.src} width={photo.width} height={photo.height} sizes="(max-width:600px) 90vw,450px" alt={photo.alt} /></button>)}</section>}
      <section className="locations" aria-label="Ubicaciones de la boda">
        <LocationBlock title="Ceremonia religiosa" location={event.ceremony} />
        <LocationBlock title="Recepción" location={event.reception} reverse />
      </section>
      <section className="dress"><div className="dress__panel"><Reveal><SectionHeading eyebrow="Código de vestimenta" title={event.dressCode.title} light /></Reveal><Reveal className={styles.swatches}>{event.dressCode.colors.map(color => <div key={color.name}><i style={{ background: color.color }} /><span>{color.name}</span></div>)}</Reveal><Reveal><p className="dress__note">{event.dressCode.text}</p>{event.contact.whatsapp && <a className="button button--ivory" href={event.contact.whatsapp} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a>}<div className={styles.signature}>Miriam <i>&</i> Jair</div></Reveal></div></section>
    </main>}
    {event.music.enabled && <><audio ref={audioRef} src={event.music.url} preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setMusicError("No se pudo cargar la música. Intenta de nuevo."); }} />{opened && <button className={styles.music} type="button" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>}</>}
    {musicError && <p className={styles.musicError} role="status">{musicError}</p>}
    <dialog ref={dialogRef} className={styles.dialog} aria-label="Fotografía ampliada" onClose={() => setActivePhoto(null)} onClick={e => { if (e.target === e.currentTarget) dialogRef.current.close(); }}>{activePhoto !== null && <><button type="button" onClick={() => dialogRef.current.close()} aria-label="Cerrar fotografía"><X /></button><Image src={gallery[activePhoto].src} width={gallery[activePhoto].width} height={gallery[activePhoto].height} sizes="100vw" alt={gallery[activePhoto].alt} /></>}</dialog>
  </div>;
}
