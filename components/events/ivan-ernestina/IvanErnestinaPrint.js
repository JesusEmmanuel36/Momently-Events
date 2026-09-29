"use client";

import { ArrowLeft, Printer } from "lucide-react";
import styles from "./IvanErnestinaPrint.module.css";

export function IvanErnestinaPrint() {
  return <main className={styles.page}>
    <div className={styles.toolbar}>
      <a href="/eventos/ivan-y-ernestina"><ArrowLeft /> Volver a la invitación</a>
      <button onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</button>
    </div>

    <article className={styles.sheet} aria-label="Invitación impresa de Iván y Ernestina">
      <div className={styles.content}>
        <header>
          <span>Nuestra boda</span>
          <h1>Iván <i>y</i> Ernestina</h1>
          <p>Sería una gran alegría para nosotros si pudieras acompañarnos en esta ocasión tan especial.</p>
        </header>

        <section className={styles.family}>
          <h2>Con la bendición de nuestros padres</h2>
          <div><p>Domingo Morales<br />Albertina Hernández</p><p>Ignacio Pérez Z.<br />Eva Romero V.</p></div>
          <h2>Padrinos</h2>
          <p>Ma. Angélica Zapata F. · Guillermo Hernández</p>
        </section>

        <div className={styles.date}><small>Miércoles</small><strong>30</strong><span>Diciembre · 2026</span></div>

        <section className={styles.places}>
          <article><span>Misa · 1:00 p. m.</span><h3>Parroquia de la Santa Cruz</h3><p>Calle 4 S/N, Industrial Aviación 1ra Sección,<br />78140 San Luis Potosí, S.L.P.</p></article>
          <i />
          <article><span>Recepción · 3:00 p. m.</span><h3>Balneario San Fernando</h3><p>Km 2, Puente Superior Vehicular Cerro Prieto,<br />Mexquitic de Carmona, S.L.P.</p></article>
        </section>

        <footer><strong>Su presencia es nuestro mejor regalo</strong><p>Mesa Liverpool · Evento 60037225<br />También tendremos lluvia de sobres.</p></footer>
      </div>
    </article>

    <p className={styles.help}>Tamaño recomendado: 5 × 7 pulgadas, orientación vertical, márgenes desactivados y gráficos de fondo activados.</p>
  </main>;
}
