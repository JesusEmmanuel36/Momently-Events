import Image from "next/image";
import Link from "next/link";
import styles from "./events.module.css";

export const metadata = {
  title: "Invitaciones para eventos",
  description: "Colección de invitaciones digitales premium de Momently Events.",
};

export default function EventsPage() {
  return <main className={styles.catalog}>
    <header className={styles.header}>
      <span>Momently Events</span>
      <h1>Invitaciones para celebrar lo inolvidable.</h1>
      <p>Una colección de experiencias digitales creadas para cada tipo de evento.</p>
    </header>
    <section className={styles.grid}>
      <Link href="/eventos/lesly-y-marcelino" className={styles.card}>
        <Image src="/images/events/lesly-marcelino/foto-pareja.jpg" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Lesly y Marcelino" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Lesly & Marcelino</h2><p>Lavanda · Azul cielo · Rosa pastel</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/ivan-y-ernestina" className={styles.card}>
        <Image src="/images/events/ivan-ernestina/hero.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Iván y Ernestina" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Iván & Ernestina</h2><p>Coral · Olivo · Dorado</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/quince-anos" className={styles.card}>
        <Image src="/images/events/quince-anos/hero.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación premium para quince años" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Nueva colección</small><h2>Mis XV</h2><p>Rosa empolvado · Champagne · Hacienda</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
    </section>
  </main>;
}
