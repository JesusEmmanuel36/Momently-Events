"use client";
import Link from "next/link";

import Image from "next/image";
import { ArrowLeft, Download, Printer } from "lucide-react";
import styles from "./Roxana50Print.module.css";

const invitationImage = "/images/events/roxana-50/invitacion-impresa-ia.png";

export function Roxana50Print() {
  return <main className={styles.page}>
    <div className={styles.toolbar}>
      <Link href="/eventos/roxana-50"><ArrowLeft /> Volver a la invitación</Link>
      <a href={invitationImage} download="invitacion-roxana-50.png"><Download /> Descargar PNG</a>
      <button onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</button>
    </div>

    <article className={styles.sheet} aria-label="Invitación impresa de Roxana">
      <Image src={invitationImage} width={1060} height={1484} priority unoptimized alt="Invitación de los 50 años de Roxana lista para imprimir" />
    </article>

    <p className={styles.help}>Imprime en tamaño 5 × 7 pulgadas, orientación vertical, sin márgenes y con gráficos de fondo activados.</p>
  </main>;
}
