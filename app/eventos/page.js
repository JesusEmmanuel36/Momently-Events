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
      <Link href="/eventos/miriam-y-jair" className={styles.card}>
        <Image src="/images/events/miriam-jair/envelope-closed.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Invitación de boda de Miriam y Jair" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Miriam & Jair</h2><p>Vino · Beige</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-valery-jatziry" className={styles.card}>
        <Image src="/images/events/xv-valery-jatziry/envelope-closed.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Valery Jatziry" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Valery Jatziry · XV</h2><p>Vaquera · Beige · Dorado</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/fernanda-y-alejandro" className={styles.card}>
        <Image src="/images/events/fernanda-alejandro/foto1.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Fernanda y Alejandro" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Fernanda & Alejandro</h2><p>Champaña · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/omar-y-liliana" className={styles.card}>
        <Image src="/images/events/omar-liliana/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Omar y Liliana" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Omar & Liliana</h2><p>Perlas · Champaña · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/jose-y-marcela" className={styles.card}>
        <Image src="/images/events/jose-marcela/envelope-closed-cream.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de José Bruno y Marcela" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>José Bruno & Marcela</h2><p>Crema · Verde</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-gabriela-elizabeth" className={styles.card}>
        <Image src="/images/events/gabriela-xv/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Gabriela Elizabeth" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Gabriela Elizabeth · XV</h2><p>Lila · Lavanda</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-danisha-jatziri" className={styles.card}>
        <Image src="/images/events/danisha-xv/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Danisha Jatziri" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Danisha Jatziri · XV</h2><p>Noche estrellada · Azul marino</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/bautizo-patricia-valentina" className={styles.card}>
        <Image src="/images/events/bautizo-patricia-valentina/foto-9.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación al bautizo de Patricia Valentina" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Patricia Valentina</h2><p>Bautizo · Café · Champaña · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/karina-y-daniel" className={styles.card}>
        <Image src="/images/events/karina-daniel/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Karina y Daniel" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Karina & Daniel</h2><p>Verde olivo · Plata · Blanco</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-mariana-joseline" className={styles.card}>
        <Image src="/images/events/marianajoseline-xv/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Mariana Joseline" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Mariana Joseline · XV</h2><p>Azul rey · Dorado · Champaña</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-amaday" className={styles.card}>
        <Image src="/images/events/amaday-xv/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Amaday Guadalupe" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Amaday Guadalupe · XV</h2><p>Rojo vino · Dorado · Champaña</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-keyla" className={styles.card}>
        <Image src="/images/events/keyla-xv/envelope-closed.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación disco de XV años de Keyla" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Keyla · XV</h2><p>Disco · Plata · Azul plumbago</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/erick-y-erika" className={styles.card}>
        <Image src="/images/events/erick-erika/foto-8.jpeg" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Erick y Erika" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Erick & Erika</h2><p>Verde salvia · Dorado · Beige</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-krystel" className={styles.card}>
        <Image src="/images/events/krystel-xv/hero-floral.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Krystel" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Krystel · XV</h2><p>Aqua apagado · Champagne · Dorado</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/margarita-y-mateo" className={styles.card}>
        <Image src="/images/events/margarita-mateo/foto-1.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Margarita y Mateo" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Margarita & Mateo</h2><p>Azul rey · Plata · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/sara-y-blase" className={styles.card}>
        <Image src="/images/events/sara-y-blase/foto-9.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de boda de Sara y Blase" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Sara & Blase</h2><p>Terracota · Marfil · Olivo</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/roxana-50" className={styles.card}>
        <Image src="/images/events/roxana-50/hero.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de cumpleaños de Roxana" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Roxana · 50</h2><p>Rose gold · Dorado · Negro</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-andrea-anahis" className={styles.card}>
        <Image src="/images/events/andrea-anahis/hero.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Invitación de XV años de Andrea Anahis" />
        <div className={styles.overlay} />
        <div className={styles.copy}><small>Invitación personalizada</small><h2>Andrea Anahis</h2><p>Rosa pastel · Champagne · Jardín</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
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
