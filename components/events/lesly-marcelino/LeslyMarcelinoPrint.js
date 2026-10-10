"use client";
import Link from "next/link";

import Image from "next/image";
import { ArrowLeft, Download, Printer } from "lucide-react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaPrint.module.css";

const invitationImage = "/images/events/lesly-marcelino/invitacion-impresa-ia.png";

export function LeslyMarcelinoPrint() {
  return <main className={styles.page}>
    <div className={styles.toolbar}>
      <Link href="/eventos/lesly-y-marcelino"><ArrowLeft /> Volver a la invitación</Link>
      <a href={invitationImage} download="invitacion-lesly-y-marcelino.png"><Download /> Descargar PNG</a>
      <button onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</button>
    </div>

    <article className={styles.sheet} aria-label="Invitación impresa de Lesly y Marcelino">
      <Image src={invitationImage} width={1060} height={1484} priority unoptimized alt="Invitación de boda de Lesly y Marcelino lista para imprimir" />
    </article>

    <p className={styles.help}>Imprime en tamaño 5 × 7 pulgadas, orientación vertical, sin márgenes y con gráficos de fondo activados.</p>
  </main>;
}
