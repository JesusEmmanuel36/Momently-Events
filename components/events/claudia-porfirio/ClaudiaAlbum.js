"use client";
import Image from "next/image";
import Link from "next/link";
import { Camera, Download, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { claudiaPorfirioPhotos, guestPhotosAreOpen } from "@/lib/event-photos/config";
import { GuestPhotoGallery } from "@/components/events/caleb-ciriam/photos/GuestPhotoGallery";
import { Reveal, SectionHeading } from "@/components/ui";
import styles from "./ClaudiaAlbum.module.css";
export function ClaudiaAlbum() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setOpen(guestPhotosAreOpen(Date.now(), claudiaPorfirioPhotos));
    check(); const timer = window.setInterval(check, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <section className={styles.album} style={claudiaPorfirioPhotos.photoTheme} id="album"><Reveal><Camera strokeWidth={1}/><SectionHeading eyebrow="Recuerdos compartidos" title="Nuestra boda, a través de tus ojos" copy="Escanea este código o toca el botón para compartir las fotos que tomes durante la celebración."/><Image src="/eventos/claudia-y-porfirio/fotos/qr" width={210} height={210} unoptimized alt="Código QR para subir fotos de la boda de Claudia y Porfirio"/><p className={styles.notice}>{open ? "¡Ya puedes compartir tus recuerdos!" : <><LockKeyhole size={18}/> La subida y la galería se habilitan el 7 de noviembre de 2026.</>}</p><div className={styles.actions}><Link className="button" href={claudiaPorfirioPhotos.path}><Camera size={18}/>{open ? "Subir fotos" : "Ver álbum"}</Link><a className="button button--outline" href="/eventos/claudia-y-porfirio/fotos/qr?download=1" download><Download size={18}/> Descargar QR del álbum</a></div>{open ? <GuestPhotoGallery event={claudiaPorfirioPhotos}/> : <p>Los recuerdos de nuestros invitados aparecerán aquí el día de la celebración.</p>}</Reveal></section>;
}
