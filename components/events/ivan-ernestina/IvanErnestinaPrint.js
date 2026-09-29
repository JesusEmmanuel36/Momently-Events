"use client";

import Image from "next/image";
import { ArrowLeft, Download, Printer } from "lucide-react";
import styles from "./IvanErnestinaPrint.module.css";

const invitationImage = "/images/events/ivan-ernestina/invitacion-impresa-ia.png";

export function IvanErnestinaPrint() {
  return <main className={styles.page}>
    <div className={styles.toolbar}>
      <a href="/eventos/ivan-y-ernestina"><ArrowLeft /> Volver a la invitación</a>
      <a href={invitationImage} download="invitacion-ivan-y-ernestina.png"><Download /> Descargar PNG</a>
      <button onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</button>
    </div>

    <article className={styles.sheet} aria-label="Invitación impresa de Iván y Ernestina">
      <Image src={invitationImage} width={1060} height={1484} priority unoptimized alt="Invitación de boda de Iván y Ernestina lista para imprimir" />
    </article>

    <p className={styles.help}>Imprime en tamaño 5 × 7 pulgadas, orientación vertical, sin márgenes y con gráficos de fondo activados.</p>
  </main>;
}
