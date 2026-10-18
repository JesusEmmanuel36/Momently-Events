"use client";
import Image from "next/image";
import Link from "next/link";
import { Camera, Download, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { yoatzinAldoPhotos, guestPhotosAreOpen } from "@/lib/event-photos/config";
import { GuestPhotoGallery } from "@/components/events/caleb-ciriam/photos/GuestPhotoGallery";
import { Reveal, SectionHeading } from "@/components/ui";
import styles from "./YoatzinAldoAlbum.module.css";
export function YoatzinAldoAlbum() {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  useEffect(() => {
    const check = () => { setOpen(guestPhotosAreOpen(Date.now(), yoatzinAldoPhotos)); setGalleryOpen(Date.now() >= Date.parse(yoatzinAldoPhotos.opensAt)); };
    check(); const timer = window.setInterval(check, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <section className={styles.album} style={yoatzinAldoPhotos.photoTheme} id="album"><Reveal><Camera strokeWidth={1}/><SectionHeading eyebrow="Recuerdos compartidos" title="Nuestra boda, a través de tus ojos" copy="Escanea este código o toca el botón para compartir las fotos que tomes durante la celebración."/><Image src="/eventos/yoatzin-y-aldo/fotos/qr" width={210} height={210} unoptimized alt="Código QR para subir fotos de la boda de Yoatzin y Aldo"/><p className={styles.notice}>{open ? "¡Ya puedes compartir tus recuerdos!" : <><LockKeyhole size={18}/> La carga de fotos estará disponible solo el 19 de diciembre de 2026.</>}</p><div className={styles.actions}><Link className="button" href={yoatzinAldoPhotos.path}><Camera size={18}/>{open ? "Subir fotos" : "Ver álbum"}</Link><a className="button button--outline" href="/eventos/yoatzin-y-aldo/fotos/qr?download=1" download><Download size={18}/> Descargar QR del álbum</a></div>{galleryOpen ? <GuestPhotoGallery event={yoatzinAldoPhotos}/> : <p>Los recuerdos de mis invitados aparecerán aquí el día de la celebración.</p>}</Reveal></section>;
}
