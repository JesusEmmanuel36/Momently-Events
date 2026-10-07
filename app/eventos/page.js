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
<Link href="/eventos/xv-fergie" className={styles.card}><Image src="/images/events/xv-fergie/hero.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Fergie"/><div className={styles.overlay}/><div className={styles.copy}><small>Mis XV años</small><h2>Fergie</h2><p>Verde salvia · Negro · Dorado</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/luis-y-irma" className={styles.card}><Image src="/images/events/luisyirma/image copy.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Luis Enrique e Irma"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Luis Enrique &amp; Irma</h2><p>Champaña · Dorado · Blanco</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/alejandra-y-david" className={styles.card}><Image src="/images/events/alejandra-y-david/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Alejandra y David"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Alejandra & David</h2><p>Champaña · Dorado · Blanco</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/luis-manuel-y-nancy" className={styles.card}><Image src="/images/events/luis-manuel-y-nancy/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Luis Manuel y Nancy"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Luis Manuel & Nancy</h2><p>Perla · Guinda</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/lu-y-juan" className={styles.card}><Image src="/images/events/lu-y-juan/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Lu y Juan"/><div className={styles.overlay}/><div className={styles.copy}><small>Boda civil</small><h2>Lu & Juan</h2><p>Estilo mexicano · Crema y fucsia</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/fatima-y-javier" className={styles.card}><Image src="/images/events/faitima-y-javier/image copy 3.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Fátima y Javier"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Fátima & Javier</h2><p>Tradición mexicana · Flores y color</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/adamaris-y-guillermo" className={styles.card}><Image src="/images/adamaris-y-guillermo/image copy 3.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Adamaris y Guillermo"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Adamaris & Guillermo</h2><p>Blanco · Dorado</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/homero-y-norma" className={styles.card}><Image src="/images/events/homero-y-norma/8275b49c-5079-46a4-87f7-2460087c27b9.jpeg" fill sizes="(max-width:800px) 100vw,50vw" alt="Homero y Norma"/><div className={styles.overlay}/><div className={styles.copy}><small>Bodas de rubí</small><h2>Homero & Norma</h2><p>40 años de amor</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/armando-y-yamilet" className={styles.card}><Image src="/images/events/armando-y-yamilet/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Armando y Yamilet"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda civil</small><h2>Armando & Yamilet</h2><p>Azul claro · Elegante</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/xv-zuky-adali" className={styles.card}><Image src="/images/events/zuky-adali-xv/image copy 6.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Zuky Adali"/><div className={styles.overlay}/><div className={styles.copy}><small>Mis XV años</small><h2>Zuky Adali</h2><p>Vaquero mexicano · Rojo</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/romina-comunion" className={styles.card}><Image src="/images/events/romina-comunion/hero.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Primera comunión de Romina Jahori"/><div className={styles.overlay}/><div className={styles.copy}><small>Mi primera comunión</small><h2>Romina Jahori</h2><p>Rosa pastel · Dorado · Beige</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/caleb-y-ciriam" className={styles.card}><Image src="/images/events/caleb-y-ciriam/image copy.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Caleb y Ciriam"/><div className={styles.overlay}/><div className={styles.copy}><small>Enlace matrimonial</small><h2>Caleb & Ciriam</h2><p>Verde olivo · Champaña</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/andrea-y-arturo" className={styles.card}><Image src="/images/events/andrea-y-arturo/hero.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Andrea y Arturo"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Andrea & Arturo</h2><p>Verde olivo · Champaña</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/xv-mayra-yaneli" className={styles.card}><Image src="/images/events/mayra-yaneli-xv/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Mayra Yaneli"/><div className={styles.overlay}/><div className={styles.copy}><small>Mis XV años</small><h2>Mayra Yaneli</h2><p>Rosa gold</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/fabiola-y-daniel" className={styles.card}><Image src="/images/events/fabiola-y-daniel/image copy.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Fabiola y Daniel"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Fabiola & Daniel</h2><p>Beige · Champaña · Dorado</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/bautizo-ana-paula" className={styles.card}><Image src="/images/events/bautizmo-ana-paula/portada.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Ana Paula"/><div className={styles.overlay}/><div className={styles.copy}><small>Mi bautizo</small><h2>Ana Paula</h2><p>Café · Champaña</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/alejandro-y-katya" className={styles.card}><Image src="/images/events/alejandro-y-katya/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Alejandro y Katya"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Alejandro & Katya</h2><p>Verde olivo · Beige</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/xv-hans-tadeo" className={styles.card}><Image src="/images/events/xv-hans-tadeo/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Hans Tadeo"/><div className={styles.overlay}/><div className={styles.copy}><small>Mis XV años</small><h2>Hans Tadeo</h2><p>Negro · Plata</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/xv-camila-zoe" className={styles.card}><Image src="/images/events/xv-camila-zoe/hero.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Camila Zoe"/><div className={styles.overlay}/><div className={styles.copy}><small>Mis XV años</small><h2>Camila Zoe</h2><p>Azul marino · Plata</p><strong>Ver invitación <span>→</span></strong></div></Link>
<Link href="/eventos/carlos-comunion" className={styles.card}><Image src="/images/events/carlos-comunion/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Primera comunión de Carlos"/><div className={styles.overlay}/><div className={styles.copy}><small>Primera comunión</small><h2>Carlos</h2><p>Dorado · Marfil</p><strong>Ver invitación <span>→</span></strong></div></Link>
 <Link href="/eventos/adriana-y-francisco" className={styles.card}><Image src="/images/events/adriana-y-francisco/FOTOPRINCIPAL.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Adriana y Francisco"/><div className={styles.overlay}/><div className={styles.copy}><small>Nuestra boda</small><h2>Adriana & Francisco</h2><p>Vino · Dorado · Rosas</p><strong>Ver invitación <span>→</span></strong></div></Link>
      <Link href="/eventos/xv-galilea-perez" className={styles.card}>
        <Image src="/images/events/xv-galilea-perez/image copy.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Galilea Pérez Díaz" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Mis XV años</small><h2>Galilea Pérez Díaz</h2><p>Verde salvia · Verde bosque</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/eufra-y-lety" className={styles.card}>
        <Image src="/images/events/eufra-y-lety/foto1.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Eufra y Lety" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Eufra & Lety</h2><p>Azul marino · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/liah-y-ammy" className={styles.card}>
        <Image src="/images/events/liah-y-ammy/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Liah Nicolle y Ammy Sophia" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Bautizo y cumpleaños</small><h2>Liah Nicolle & Ammy Sophia</h2><p>Rosa pastel · Champaña</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/sarai-y-erick" className={styles.card}>
        <Image src="/images/events/sarai-y-erick/image.png" fill sizes="(max-width:800px) 100vw,50vw" alt="Boda de Erick y Sarai" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Erick & Sarai</h2><p>Café · Champaña · Marfil</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
      <Link href="/eventos/xv-geraldine" className={styles.card}>
        <Image src="/images/events/geraldine-xv/envelope-closed.png" fill sizes="(max-width:800px) 100vw,50vw" alt="XV años de Geraldine" />
        <div className={styles.overlay} /><div className={styles.copy}><small>Invitación personalizada</small><h2>Geraldine · XV</h2><p>Rojo · Champaña</p><strong>Ver invitación <span>→</span></strong></div>
      </Link>
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
