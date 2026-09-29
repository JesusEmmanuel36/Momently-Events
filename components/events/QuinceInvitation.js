"use client";

import Image from "next/image";
import { CalendarDays, Check, ChevronDown, Church, Crown, ExternalLink, Gift, Heart, MapPin, Music2, Pause, Play, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./QuinceInvitation.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

const eventDate = "2027-06-12T18:00:00-06:00";
const schedule = [
  ["18:00", "Ceremonia", "Una bendición para comenzar esta nueva etapa"],
  ["20:00", "Recepción", "Bienvenida y fotografías"],
  ["21:00", "Cena", "Compartamos juntos la mesa"],
  ["22:30", "Vals", "El momento que siempre soñé"],
  ["23:00", "Fiesta", "Bailemos hasta que se apaguen las estrellas"],
];

function getCountdown() {
  const remaining = new Date(eventDate).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [
    ["Días", Math.floor(remaining / 86400000)],
    ["Horas", Math.floor((remaining / 3600000) % 24)],
    ["Min", Math.floor((remaining / 60000) % 60)],
    ["Seg", Math.floor((remaining / 1000) % 60)],
  ];
}

export function QuinceInvitation() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  const [confirmed, setConfirmed] = useState("");
  const audioRef = useRef(null);

  useEffect(() => { const update = () => setCountdown(getCountdown()); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, []);
  const open = () => { setOpening(true); window.setTimeout(() => { setOpened(true); window.scrollTo(0, 0); }, 1200); };
  const toggleAudio = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); };
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setConfirmed(String(data.get("name") || "Invitado").split(" ")[0]); };
  const addCalendar = () => {
    openGoogleCalendar({ title: "XV años de Isabella", start: eventDate, durationHours: 6, location: "Hacienda San Gabriel", details: "Acompáñame a celebrar mis XV años." });
  };
  const share = async () => { if (navigator.share) await navigator.share({ title: "Los XV de Isabella", text: "Acompáñame a celebrar mis XV años", url: window.location.href }); else await navigator.clipboard.writeText(window.location.href); };

  return <div className={styles.quince}>
    <audio ref={audioRef} loop preload="none" src="/audio/quince-song.mp3" />
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <Image src="/images/events/quince-anos/hero.png" fill priority sizes="100vw" alt="Isabella celebrando sus quince años" />
      <div className={styles.introShade} />
      <div className={styles.introFrame}><span /><i /><span /></div>
      <div className={styles.introContent}>
        <Crown />
        <small>Estás invitado a</small>
        <h1>Mis XV</h1>
        <div className={styles.monogram}>I</div>
        <p>Isabella</p>
        <button onClick={open} disabled={opening}>{opening ? "Preparando la magia…" : "Abrir invitación"}</button>
      </div>
    </div>}

    <main className={!opened ? styles.locked : ""}>
      <section className={styles.hero}>
        <Image src="/images/events/quince-anos/hero.png" fill priority sizes="100vw" alt="Isabella en su sesión de quince años" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}><span>Una noche para recordar</span><h1>Isabella</h1><p>Mis XV años</p><div><i />12 · 06 · 2027<i /></div></div>
        <a href="#mensaje" aria-label="Continuar"><ChevronDown /></a>
      </section>

      <section className={styles.message} id="mensaje"><Crown /><span>Con la bendición de Dios y el amor de mi familia</span><h2>Hoy comienza un capítulo<br />lleno de nuevos sueños.</h2><p>Hay momentos en la vida que imaginamos desde siempre. Me hará muy feliz que formes parte de esta noche tan especial y guardemos juntos un recuerdo para toda la vida.</p><strong>Isabella</strong></section>

      <section className={styles.countdown}><span>La espera casi termina</span><h2>Faltan</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Min", "Seg"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es el gran día!</h3>}</section>

      <section className={styles.locations}>
        <article><Church /><span>Ceremonia</span><h2>Parroquia del Sagrado Corazón</h2><strong>6:00 PM</strong><p>Av. de la Esperanza 150, Monterrey, N.L.</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">Ver ubicación <ExternalLink /></a></article>
        <article className={styles.venue}><Image src="/images/events/quince-anos/ballroom.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Salón preparado para la celebración" /></article>
        <article><Sparkles /><span>Recepción</span><h2>Hacienda San Gabriel</h2><strong>8:00 PM</strong><p>Camino de los Olivos 240, Santiago, N.L.</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a></article>
      </section>

      <section className={styles.schedule}><span>Una noche mágica</span><h2>Itinerario</h2><div>{schedule.map(([time, title, copy], index) => <article key={time}><small>0{index + 1}</small><time>{time}</time><i /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className={styles.gallery}><div className={styles.galleryMain}><Image src="/images/events/quince-anos/details.png" fill sizes="(max-width: 800px) 100vw, 58vw" alt="Corona y detalles de la quinceañera" /></div><div className={styles.galleryCopy}><span>Detalles que cuentan mi historia</span><h2>Un sueño<br />hecho realidad</h2><p>Cada flor, cada destello y cada canción fueron elegidos con ilusión para compartir esta noche contigo.</p><Heart /></div></section>

      <section className={styles.dress}><div><span>Dress code</span><h2>Formal</h2><p>Queremos verte increíble. Reservamos los tonos rosa empolvado y champagne para la quinceañera.</p><div className={styles.swatches}><i /><i /><i /><i /></div></div></section>

      <section className={styles.gifts}><Gift /><span>Mesa de regalos</span><h2>Tu presencia es mi mejor regalo</h2><p>Si deseas tener un detalle conmigo, habrá lluvia de sobres durante la recepción.</p></section>

      <section className={styles.calendar}><CalendarDays /><span>Reserva la fecha</span><h2>12 de junio de 2027</h2><button onClick={addCalendar}>Agregar a mi calendario</button></section>

      <section className={styles.rsvp}>
        <div><span>R S V P</span><h2>¿Me acompañas?</h2><p>Confirma tu asistencia antes del 20 de mayo de 2027.</p><div className={styles.bigInitial}>I</div></div>
        {confirmed ? <div className={styles.success}><Check /><h3>¡Gracias, {confirmed}!</h3><p>Tu respuesta quedó registrada en esta demostración.</p><button onClick={() => setConfirmed("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" required value="yes" /> Sí, ahí estaré</label><label><input type="radio" name="attendance" required value="no" /> No podré asistir</label></fieldset><label>Acompañantes<input name="guests" type="number" min="0" max="5" defaultValue="0" /></label><label>Mensaje para Isabella<textarea name="message" rows="4" placeholder="Déjame unas palabras…" /></label><button>Confirmar asistencia</button></form>}
      </section>

      <section className={styles.closing}><Image src="/images/events/quince-anos/ballroom.png" fill sizes="100vw" alt="Hacienda iluminada para los quince años" /><div /><Crown /><span>Gracias por ser parte de</span><h2>mi noche soñada.</h2><p>Isabella · 12.06.2027</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>
    {opened && <button className={styles.music} onClick={toggleAudio}>{playing ? <Pause /> : <Play />}<span><small>{playing ? "Reproduciendo" : "Escuchar"}</small><Music2 /> Mi canción</span></button>}
  </div>;
}
