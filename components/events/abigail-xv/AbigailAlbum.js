"use client";
import Image from "next/image";
import Link from "next/link";
import { Camera, Download, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { abigailPhotos, guestPhotosAreOpen } from "@/lib/event-photos/config";
import { GuestPhotoGallery } from "@/components/events/caleb-ciriam/photos/GuestPhotoGallery";
import { Reveal, SectionHeading } from "@/components/ui";
import styles from "./AbigailAlbum.module.css";
export function AbigailAlbum() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setOpen(guestPhotosAreOpen(Date.now(), abigailPhotos));
    check(); const timer = window.setInterval(check, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <section className={styles.album} style={abigailPhotos.photoTheme} id="album"><Reveal><Camera strokeWidth={1}/><SectionHeading eyebrow="Recuerdos compartidos" title="Mis XV años, a través de tus ojos" copy="Escanea este código o toca el botón para compartir las fotos que tomes durante la celebración."/><Image src="/eventos/xv-abigail/fotos/qr" width={210} height={210} unoptimized alt="Código QR para subir fotos de los XV años de Abigail"/><p className={styles.notice}>{open ? "¡Ya puedes compartir tus recuerdos!" : <><LockKeyhole size={18}/> La subida y la galería se habilitan el 12 de diciembre de 2026.</>}</p><div className={styles.actions}><Link className="button" href={abigailPhotos.path}><Camera size={18}/>{open ? "Subir fotos" : "Ver álbum"}</Link><a className="button button--outline" href="/eventos/xv-abigail/fotos/qr?download=1" download><Download size={18}/> Descargar QR del álbum</a></div>{open ? <GuestPhotoGallery event={abigailPhotos}/> : <p>Los recuerdos de mis invitados aparecerán aquí el día de la celebración.</p>}</Reveal></section>;
}
