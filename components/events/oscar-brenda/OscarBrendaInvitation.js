"use client";
import Image from "next/image";
import { ChevronDown, Heart, Mail, Church, MapPin, Pause, Play, Share2, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import { Reveal, SectionHeading } from "@/components/ui";

import { GallerySection } from "@/components/sections/Gallery";
import styles from "./OscarBrenda.module.css";
const images = "/images/events/oscar-y-brenda";
function WeddingCalendar({date}) {
  const [year,month,day]=date.split("T")[0].split("-").map(Number);
  const first=(new Date(Date.UTC(year,month-1,1)).getUTCDay()+6)%7;
  const days=new Date(Date.UTC(year,month,0)).getUTCDate();
  const cells=Array.from({length:Math.ceil((first+days)/7)*7},(_,i)=>i>=first&&i<first+days?i-first+1:null);
  const monthLabel=new Intl.DateTimeFormat("es-MX",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(year,month-1,1)));
  return <section className={`section ${styles.saveDate}`}><Reveal><h2>Guarda esta fecha</h2><p>Un día para celebrar nuestra historia contigo.</p><div className={styles.calendarCard}><div className={styles.calendarRings} aria-hidden="true"><i/><i/></div><p className={styles.calendarMonth}>{monthLabel}</p><table aria-label={`Calendario de ${monthLabel}. Nuestra boda es el día ${day}.`}><thead><tr>{['Lu','Ma','Mi','Ju','Vi','Sá','Do'].map((label,i)=><th key={i} scope="col">{label}</th>)}</tr></thead><tbody>{Array.from({length:cells.length/7},(_,week)=><tr key={week}>{cells.slice(week*7,week*7+7).map((value,i)=><td key={i}>{value&&<time dateTime={`${year}-${String(month).padStart(2,'0')}-${String(value).padStart(2,'0')}`} className={value===day?styles.calendarSelected:undefined} aria-label={value===day?`${day} de ${monthLabel}, nuestra boda`:undefined}>{value}{value===day&&<Heart size={13} aria-hidden="true"/>}</time>}</td>)}</tr>)}</tbody></table><span className={styles.calendarLegend}><Heart size={14} aria-hidden="true"/>Nuestro gran día</span></div></Reveal></section>;
}
export function OscarBrendaInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  useEffect(()=>{if(opened)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[opened]);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  const share = async () => { try { if (navigator.share) await navigator.share({title:wedding.eventTitle,text:wedding.hero.quote,url:window.location.href}); else { await navigator.clipboard.writeText(window.location.href); notify("Enlace copiado"); } } catch (error) { if (error.name !== "AbortError") notify("No fue posible compartir el enlace."); } };
  const view = {...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Óscar Oswaldo",groom:"Brenda Mitziry"},images:{hero:wedding.hero.image,gallery:wedding.gallery.map(photo=>photo.src)},galleryItems:wedding.gallery,dateLong:wedding.dateDisplay,rsvpMessageLabel:"Mensaje para Óscar Oswaldo y Brenda Mitziry",rsvpSettings:{askCompanions:false,maxCompanions:wedding.maxCompanions,askMenuPreference:false,askAllergies:false,askMessage:true}};
  return <div className={styles.invitation}>
    {wedding.music.enabled && <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" className={styles.introPhoto} alt="Óscar Oswaldo y Brenda Mitziry"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Nuestra boda</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Nuestra boda</span><h2><span>Óscar Oswaldo</span><i>&amp;</i><span>Brenda Mitziry</span></h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre blanco abierto con detalles dorados" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open.png`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} unoptimized fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre blanco con rosas y sello dorado O y B" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Óscar Oswaldo y Brenda Mitziry"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} unoptimized fill priority sizes="100vw" alt="Óscar Oswaldo y Brenda Mitziry" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Óscar Oswaldo</span><i>&amp;</i><span>Brenda Mitziry</span></h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">El comienzo de nuestra historia</span><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <section className={styles.familySection}><Reveal><SectionHeading eyebrow="Con cariño y gratitud" title="Nuestra familia"/><div className={styles.parentsGrid}><div><h3>Madre de la novia</h3>{wedding.family.brideParents.map(name=><p key={name}>{name}</p>)}</div><div><h3>Padres del novio</h3>{wedding.family.groomParents.map(name=><p key={name}>{name}</p>)}</div></div><h2>Nuestros padrinos</h2>{wedding.family.godparents.map(name=><p key={name}>{name}</p>)}</Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} unoptimized width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Arreglo de rosas blancas con follaje dorado"/></Reveal>
      <CountdownSection wedding={view}/>
      <WeddingCalendar date={wedding.date}/>
      <section className={`section ${styles.celebration}`}><Reveal><SectionHeading eyebrow="Celebra con nosotros" title="Nuestra celebración"/><div className={styles.venues}>{[[wedding.ceremony,'Ceremonia religiosa',Church],[wedding.reception,'Recepción',MapPin]].map(([place,label,Icon])=><article key={label}><Icon strokeWidth={1}/><span className="eyebrow">{label}</span><h3>{place.name}</h3>{place.time&&<strong>{place.time}</strong>}<p>{place.address}</p></article>)}</div></Reveal></section>

      <GallerySection wedding={view} fixedOverlay imageSizes="(max-width:700px) 90vw,33vw" heading={{eyebrow:"Nuestros momentos",title:"Recuerdos que nos unen",copy:"Instantes que forman parte de nuestra historia."}}/>
      {wedding.gifts.length>0&&<section className={`section ${styles.registry}`}><Reveal><Mail strokeWidth={1}/><SectionHeading eyebrow="Un detalle con cariño" title={wedding.gifts[0].name} copy={wedding.gifts[0].description}/></Reveal></section>}
      <section className={styles.confirmation}><MessageCircle size={32} strokeWidth={1}/><h2>¿Nos acompañas?</h2><p>Nos hará muy felices compartir este día contigo.</p><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a la boda de Óscar Oswaldo y Brenda Mitziry el 21 de noviembre de 2026.')}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/>Confirmar por WhatsApp</a></section>
      <section className="closing"><Image src={wedding.hero.image} unoptimized fill sizes="100vw" alt="Óscar Oswaldo y Brenda Mitziry" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por celebrar con nosotros</span><h2>nuestro amor.</h2><p className={styles.thankYou}>{wedding.closingMessage}</p><p>Óscar Oswaldo &amp; Brenda Mitziry</p><small>{wedding.dateDisplay}</small><button className="button" onClick={share}><Share2 size={16}/> Compartir invitación</button></Reveal></section>
    </main>{opened && wedding.music.enabled && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}

