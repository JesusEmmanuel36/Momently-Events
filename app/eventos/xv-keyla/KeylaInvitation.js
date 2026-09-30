"use client";

import Image from "next/image";
import { Car, Check, ChevronDown, Church, Disc3, ExternalLink, Gift, Heart, MapPin, MessageCircle, Music2, Pause, Play, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./keyla.module.css";

const eventDate = new Date("2026-12-05T18:00:00-06:00");
const assets = {
  closed: "/images/events/keyla-xv/envelope-closed.png",
  open: "/images/events/keyla-xv/envelope-open.png",
  disco: "/images/events/keyla-xv/disco-decoration.png",
};

function getCountdown() {
  const distance = eventDate.getTime() - Date.now();
  if (distance <= 0) return null;
  return [["Días", Math.floor(distance / 86400000)], ["Horas", Math.floor((distance / 3600000) % 24)], ["Min", Math.floor((distance / 60000) % 60)], ["Seg", Math.floor((distance / 1000) % 60)]];
}

export function KeylaInvitation() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [confirmed, setConfirmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => { setCountdown(getCountdown()); const timer = window.setInterval(() => setCountdown(getCountdown()), 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    audioRef.current?.play().catch(() => setPlaying(false));
    timerRef.current = window.setTimeout(() => setOpened(true), 2300);
  };
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => setPlaying(false));
  };

  return <main className={styles.page}>
    <audio ref={audioRef} src="/audio/keyla-dancing-queen.mp3" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!opened && <section className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.sparkles} aria-hidden="true" />
      <div className={styles.introTitle}><span>Una invitación especial</span><h1>Mis XV años</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><Disc3 /><span>Mis XV</span><h2>Keyla</h2><small>05 · 12 · 2026</small></div>
          <Image className={styles.envelopeOpen} src={assets.open} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre disco abierto" />
          <Image className={styles.envelopeClosed} src={assets.closed} fill priority sizes="(max-width:700px) 96vw,680px" alt="Sobre negro y azul plumbago con sello K" />
          <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Abrir invitación" />
        </div>
        <button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button>
      </div>
    </section>}

    <div className={opened ? styles.visible : styles.hidden}>
      <section className={styles.hero}>
        <div className={styles.sparkles} aria-hidden="true" />
        <Image className={styles.heroPhoto} src="/images/events/keyla-xv/foto-2.webp" fill priority sizes="100vw" alt="Keyla celebrando sus quince años en la playa" />
        <div className={styles.heroShade} />
        <Image className={styles.heroDisco} src={assets.disco} width={850} height={690} priority alt="" aria-hidden="true" />
        <div className={styles.heroCopy}><span>Sábado · 5 de diciembre · 2026</span><h1><small>Mis XV</small>Keyla</h1><p>Una noche para brillar, bailar y celebrar juntos.</p></div>
        <a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a>
      </section>

      <section className={styles.welcome} id="bienvenida"><Disc3 /><span>La pista está lista</span><h2>La vida es una fiesta y quiero compartir la mía contigo.</h2><p>Con mucha alegría te invito a celebrar mis quince años, una noche llena de luz, música y recuerdos inolvidables.</p></section>

      <section className={styles.countdown}><span>Cuenta regresiva</span><h2>Falta muy poco para brillar</h2>{countdown === undefined ? <div>{["Días", "Horas", "Min", "Seg"].map((label) => <article key={label}><strong>--</strong><small>{label}</small></article>)}</div> : countdown ? <div>{countdown.map(([label, value]) => <article key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></article>)}</div> : <h3>¡Hoy es el gran día!</h3>}</section>

      <section className={styles.family}><Image src={assets.disco} width={520} height={422} alt="" aria-hidden="true" /><span>Con el amor y la bendición de</span><h2>Mi familia</h2><div><article><Heart /><small>Mis papás</small><p>Rafael López</p><p>Nadia López</p></article><i /><article><Star /><small>Mis padrinos</small><p>Rodrigo Morales</p><p>Patricia López</p></article></div></section>

      <section className={styles.gallery}><span>Mis momentos</span><h2>Una etapa para recordar</h2><div>{[1, 2, 3, 4, 5].map((number) => <figure key={number}><Image src={`/images/events/keyla-xv/foto-${number}.webp`} fill sizes="(max-width:720px) 50vw, 33vw" alt={`Sesión de quince años de Keyla, fotografía ${number}`} /></figure>)}</div></section>

      <section className={styles.locations}>
        <header><span>Los momentos de mi celebración</span><h2>Misa y recepción</h2></header>
        <div className={styles.locationGrid}>
          <article><div className={styles.locationPhoto}><Image src="/images/events/keyla-xv/foto-4.webp" fill sizes="(max-width:720px) 100vw,50vw" alt="Keyla junto a una decoración de quince años" /></div><div className={styles.locationCopy}><Church /><span>Misa</span><h3>San Francisco de Almoloyan</h3><strong>6:00 p. m.</strong><p>Esquina Maclovio Herrera y Av. de los Maestros s/n, Colima, Col.</p><a href="https://www.google.com/maps/search/?api=1&query=San+Francisco+de+Almoloyan+Maclovio+Herrera+Avenida+de+los+Maestros+Colima" target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></div></article>
          <article><div className={styles.locationPhoto}><Image src="/images/events/keyla-xv/foto-5.webp" fill sizes="(max-width:720px) 100vw,50vw" alt="Keyla frente a un espejo con flores azules" /></div><div className={styles.locationCopy}><Sparkles /><span>Recepción</span><h3>Terraza Potrillos</h3><strong>8:00 p. m.</strong><p>Lib. Pte. Colima–Manzanillo km 1.2, Prados del Sur, Colima, Col.</p><a href="https://www.google.com/maps/search/?api=1&query=Terraza+Potrillos+Libramiento+Poniente+Colima+Manzanillo+km+1.2" target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></div></article>
        </div>
        <aside><Car /><div><span>Estacionamiento</span><p>Acceso por calle A y calle 2, Zona Industrial, Colima, Col.</p></div></aside>
      </section>

      <section className={styles.timeline}><span>Programa</span><h2>Una noche para recordar</h2><div><article><time>6:00</time><small>p. m.</small><h3>Misa</h3></article><article><time>8:00</time><small>p. m.</small><h3>Recepción</h3></article><article><time>9:00</time><small>p. m.</small><h3>Cena</h3></article><article><time>10:00</time><small>p. m.</small><h3>Baile</h3></article></div></section>

      <section className={styles.dress}><Sparkles /><span>Código de vestimenta</span><h2>Formal / elegante</h2><p>El color azul está reservado para la quinceañera y el beige para las damas. Gracias por elegir otros tonos para tu vestimenta.</p><div><i /><i /><i /><i /></div></section>

      <section className={styles.gifts}><Gift /><span>El mejor regalo</span><h2>Tu presencia hará brillar mi noche</h2><p>Lo más importante para mí es compartir este momento contigo.</p><div><Music2 /><strong>Dancing Queen</strong><small>ABBA · Canción elegida</small></div></section>

      <section className={styles.rsvp}>
        {confirmed ? <div className={styles.success}><Check /><h2>¡Gracias!</h2><p>Tu respuesta quedó registrada en esta vista previa.</p><button onClick={() => setConfirmed(false)}>Cambiar respuesta</button></div> : <form onSubmit={(event) => { event.preventDefault(); setConfirmed(true); }}><MessageCircle /><span>Confirmación de asistencia</span><h2>¿Me acompañas?</h2><label>Nombre completo<input required placeholder="Escribe tu nombre" /></label><label>¿Asistirás?<select defaultValue="Sí, ahí estaré"><option>Sí, ahí estaré</option><option>No podré asistir</option></select></label><label>Acompañantes<select defaultValue="0"><option value="0">Solo yo</option><option value="1">1 acompañante</option><option value="2">2 acompañantes</option><option value="3">3 acompañantes</option></select></label><button>Confirmar asistencia</button><a href="https://wa.me/523122002067" target="_blank" rel="noreferrer">Confirmar por WhatsApp · 312 200 2067</a></form>}
      </section>

      <section className={styles.closing}><Image src={assets.disco} width={750} height={609} alt="" aria-hidden="true" /><Disc3 /><span>Nos vemos en la pista</span><h2>Keyla</h2><p>05 · 12 · 2026</p></section>
    </div>

    {opened && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>Dancing Queen</span></button>}

  </main>;
}
