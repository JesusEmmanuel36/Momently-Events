"use client";

import Image from "next/image";
import { CalendarDays, CandyCane, Check, Clock3, Gift, MapPin, Music, Snowflake, Sparkles, Star, Trees } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./posada.module.css";

const eventDate = new Date("2026-12-19T18:30:00-06:00");

function getCountdown() {
  const distance = eventDate.getTime() - Date.now();
  if (distance <= 0) return null;
  return [
    ["Días", Math.floor(distance / 86400000)],
    ["Horas", Math.floor((distance / 3600000) % 24)],
    ["Min", Math.floor((distance / 60000) % 60)],
    ["Seg", Math.floor((distance / 1000) % 60)],
  ];
}

export function PosadaInvitation() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setOpened(true), 2200);
  };

  return <main className={styles.page}>
    {!opened && <section className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.snow} aria-hidden="true" />
      <div className={styles.introCopy}><Snowflake /><span>Tienes una invitación</span><h1>Una noche llena de magia</h1></div>
      <div className={styles.envelopeScene}>
        <div className={styles.envelopeStage}>
          <div className={styles.letter}><Snowflake /><span>Posada</span><strong>19 · 12 · 2026</strong></div>
          <Image className={styles.envelopeOpen} src="/images/events/posada-navidad/sobre-abierto.png" fill priority sizes="(max-width:700px) 94vw,720px" alt="Sobre navideño abierto" />
          <Image className={styles.envelopeClosed} src="/images/events/posada-navidad/sobre-navideno.png" fill priority sizes="(max-width:700px) 94vw,720px" alt="Sobre navideño con moño rojo, acebo y sello dorado" />
          <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Abrir invitación de la posada" />
        </div>
        <button className={styles.openButton} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button>
      </div>
    </section>}

    <div className={opened ? styles.visible : styles.hidden}>
      <section className={styles.hero}>
        <div className={styles.snow} aria-hidden="true" />
        <Image className={styles.heroGarland} src="/images/events/posada-navidad/guirnalda.png" width={1200} height={400} alt="" aria-hidden="true" />
        <div className={styles.heroDecor} aria-hidden="true"><span>✦</span><b>❄</b><i>✦</i></div>
        <p>La familia Ramírez Salazar te invita a su</p>
        <h1><small>POSADA</small><span className={styles.heroScript}>Bajo las estrellas</span></h1>
        <div className={styles.divider}><Trees /><Star /><Trees /></div>
        <strong>Sábado 19 de diciembre · 2026</strong>
        <span>6:30 p. m.</span>
      </section>

      <section className={styles.message}>
        <Image className={styles.messageDecor} src="/images/events/posada-navidad/bota-regalos.png" width={430} height={645} alt="" aria-hidden="true" />
        <Snowflake />
        <span>Tiempo de compartir</span>
        <h2>Que la alegría de la Navidad nos encuentre juntos.</h2>
        <p>Acompáñanos a celebrar una noche de luces, tradición, música y buenos deseos. Habrá ponche, cena, piñata y muchas sorpresas.</p>
      </section>

      <section className={styles.countdown}>
        <Image className={styles.countdownGarland} src="/images/events/posada-navidad/guirnalda.png" width={1000} height={334} alt="" aria-hidden="true" />
        <span>La magia comienza en</span><h2>Cuenta regresiva</h2>
        {countdown === undefined ? <div>{["Días", "Horas", "Min", "Seg"].map((label) => <article key={label}><strong>--</strong><small>{label}</small></article>)}</div> : countdown ? <div>{countdown.map(([label, value]) => <article key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></article>)}</div> : <h3>¡La posada es hoy!</h3>}
      </section>

      <section className={styles.details}>
        <Image className={styles.detailsDecor} src="/images/events/posada-navidad/bota-regalos.png" width={360} height={540} alt="" aria-hidden="true" />
        <header><span>Todo para la celebración</span><h2>Una noche muy especial</h2></header>
        <div>
          <article><MapPin /><span>Lugar</span><h3>Hacienda Los Pinos</h3><p>Av. Paseo del Roble 1840<br />Santiago, Nuevo León</p><a href="https://www.google.com/maps/search/?api=1&query=Av.+Paseo+del+Roble+1840+Santiago+Nuevo+Leon" target="_blank" rel="noreferrer">Ver ubicación</a></article>
          <article><Clock3 /><span>Horario</span><h3>6:30 p. m.</h3><p>Recepción desde las 6:00 p. m.<br />Finaliza a la 1:00 a. m.</p><button onClick={() => window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=Posada+bajo+las+estrellas&dates=20261220T003000Z/20261220T070000Z&location=Hacienda+Los+Pinos,+Santiago,+Nuevo+Leon", "_blank")}>Agregar al calendario</button></article>
          <article><Gift /><span>Intercambio</span><h3>Un detalle con cariño</h3><p>Trae un regalo unisex con valor sugerido de $300 MXN.</p><strong>Envuelto y sin nombre</strong></article>
        </div>
      </section>

      <section className={styles.schedule}>
        <span>Programa</span><h2>Nuestra noche navideña</h2>
        <div>
          <article><Clock3 /><time>6:30</time><h3>Bienvenida</h3><p>Ponche caliente y bocadillos</p></article>
          <article><CandyCane /><time>7:30</time><h3>Posada y piñata</h3><p>Letanía, dulces y tradición</p></article>
          <article><Music /><time>9:00</time><h3>Cena y música</h3><p>Brindis, intercambio y baile</p></article>
        </div>
      </section>

      <section className={styles.dress}>
        <Sparkles /><span>Código de vestimenta</span><h2>Navideño elegante</h2><p>Rojo, verde pino, dorado, negro o tonos invernales. Lleva algo abrigador para disfrutar el jardín.</p>
        <div><i /><i /><i /><i /></div>
      </section>

      <section className={styles.rsvp}>
        {confirmed ? <div className={styles.success}><Check /><h2>¡Nos vemos en la posada!</h2><p>Tu asistencia quedó registrada para esta demostración.</p><button onClick={() => setConfirmed(false)}>Cambiar respuesta</button></div> : <form onSubmit={(event) => { event.preventDefault(); setConfirmed(true); }}><CalendarDays /><span>Confirma tu asistencia</span><h2>¿Nos acompañas?</h2><label>Nombre completo<input required placeholder="Escribe tu nombre" /></label><label>Número de acompañantes<select defaultValue="0"><option value="0">Solo yo</option><option value="1">1 acompañante</option><option value="2">2 acompañantes</option><option value="3">3 acompañantes</option></select></label><label>Mensaje<textarea rows="3" placeholder="Déjanos un mensaje navideño" /></label><button>Confirmar asistencia</button></form>}
      </section>

      <footer className={styles.footer}><Image className={styles.footerGarland} src="/images/events/posada-navidad/guirnalda.png" width={1100} height={367} alt="" aria-hidden="true" /><Snowflake /><p>Con cariño</p><h2>Familia Ramírez Salazar</h2><span>¡Felices fiestas!</span></footer>
    </div>
  </main>;
}
