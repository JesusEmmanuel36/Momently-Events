"use client";
import Image from "next/image";
import { CalendarDays, Church, MessageCircle, MapPin, ChevronDown, Heart, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";



import { CountdownSection } from "@/components/sections/CountdownStory";
import { openGoogleCalendar } from "@/lib/calendar";
import { Reveal, SectionHeading } from "@/components/ui";


import styles from "./BrendaXv.module.css";
const images = "/images/events/xv-brenda-estefani";
export function BrendaXvInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null); const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  useEffect(() => {
    if (!opened) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let frame = 0;
    let stopped = false;
    let previousTime = null;
    let position = window.scrollY;
    const stop = () => {
      stopped = true;
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(frame);
    };
    const onKey = event => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Tab"].includes(event.key)) stop();
    };
    const tick = time => {
      if (stopped) return;
      if (document.hidden) previousTime = null;
      else {
        const elapsed = previousTime === null ? 0 : Math.min(time - previousTime, 100);
        previousTime = time;
        const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        position = Math.min(bottom, position + elapsed * 0.018);
        window.scrollTo({ top: position, behavior: "instant" });
        if (position >= bottom) return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    // Let the cover and its text appear before moving at 18 pixels per second.
    const startTimer = window.setTimeout(() => {
      if (stopped) return;
      position = window.scrollY;
      frame = window.requestAnimationFrame(tick);
    }, 3000);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", onKey);
    motion.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", stop);
    };
  }, [opened]);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(""),2600); };
  const open = () => { if (opening) return; setOpening(true); audioRef.current?.play().catch(() => setPlaying(false)); timerRef.current = window.setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5000); };
  const toggleMusic = () => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => notify("Toca de nuevo para escuchar nuestra canción.")); else audioRef.current.pause(); };
  return <div className={styles.invitation}>
    <audio ref={audioRef} src={wedding.music.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}><Image src={wedding.hero.image} fill priority sizes="100vw" className={styles.introPhoto} alt="Brenda Stephanie"/><div className={styles.introShade}/><div className={styles.introHeading}><span className="eyebrow">Mis XV años</span><h1>Una invitación para ti</h1></div><div className={styles.envelopeScene}><div className={styles.envelopeStage}>
      <div className={styles.letter}><span className="eyebrow">Mis XV años</span><h2>Brenda Stephanie</h2><small>{wedding.dateStamp}</small><Heart size={18}/></div>
      <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${images}/envelope-open-v2.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="Sobre abierto marfil y verde cemento" priority/></div><div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${images}/envelope-open-v2.png`} width={1536} height={1024} sizes="(max-width:700px) 90vw,650px" className={styles.openEnvelopeArtwork} alt="" priority/></div><Image src={`${images}/envelope-closed.png`} fill sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre marfil con lazo verde cemento y sello B en verde cemento" priority/><button className={styles.sealButton} onClick={open} disabled={opening} aria-label="Abrir invitación de Brenda Stephanie"/>
    </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ChevronDown size={16}/></button></div></div>}
    <main className={`invitation ${opened ? styles.heroEntered : "invitation--locked"}`}>
      <section className="hero" id="inicio"><div className="hero__image"><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Brenda Stephanie" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Mis XV años</span><h1>Brenda Stephanie</h1><div className="hero__rule"><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir invitación"><ChevronDown/></a></Reveal></section>
      <section className="section welcome" id="bienvenida"><Reveal><span className="script">Un día para soñar</span><p>{wedding.hero.quote}</p><div className="signature">Brenda Stephanie</div></Reveal></section>
      <section className={`section ${styles.family}`} aria-label="Mis papás y padrinos"><Reveal><SectionHeading eyebrow="Con amor y gratitud" title="Mi familia"/><div className={styles.familyGrid}>{wedding.family.map(group=><article key={group.title}><h3>{group.title}</h3>{group.names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
      <Reveal className={styles.floralBlessing}><Image src={`${images}/floral.png`} width={1536} height={1024} sizes="(max-width:800px) 90vw,550px" alt="Rosas marfil y verde cemento con follaje de eucalipto"/></Reveal>
      
      <CountdownSection wedding={{...wedding,date:wedding.date,couple:{bride:"Brenda Stephanie",groom:""}}}/>
      <section className="section"><Reveal><SectionHeading eyebrow="Un día muy especial" title="Mi ceremonia y celebración"/></Reveal><div className={styles.placeGrid}>{[wedding.ceremony,wedding.reception].map((place,i)=><Reveal className={styles.placeCard} key={i}>{i===0?<Church strokeWidth={1}/>:<MapPin strokeWidth={1}/>}<span className="eyebrow">{i===0?"Ceremonia religiosa":"Recepción"}</span><h2>{place.name}</h2><strong>{place.time}</strong>{place.address&&<p>{place.address}</p>}{place.mapsUrl&&<a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación</a>}</Reveal>)}</div></section>
      <section className="section dress"><Reveal><SectionHeading eyebrow="Código de vestimenta" title="Formal" copy="Te agradezco reservar el color verde cemento exclusivamente para la quinceañera."/><div className="dress__colors"><span style={{background:'#87968B',width:48,height:48,borderRadius:'50%'}} aria-label="Verde cemento reservado para la quinceañera"/></div></Reveal></section>
      <section className="calendar"><Reveal><CalendarDays/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><p>Misa · 1:00 p. m.<br/>Recepción · 2:30 p. m.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.reception.name+", "+wedding.reception.address,details:`Misa a la 1:00 p. m. en ${wedding.ceremony.name}, ${wedding.ceremony.address}. ${wedding.ceremony.mapsUrl} Recepción a las 2:30 p. m. en ${wedding.reception.name}. ${wedding.reception.mapsUrl}`})}>Agregar al calendario</button></Reveal></section>
      <section className="section"><Reveal><MessageCircle/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Me acompañas?" copy="Me hará muy feliz celebrar este día contigo."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a los XV años de Brenda Stephanie el 26 de diciembre.')}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>
      <section className="closing"><Image src={wedding.hero.image} fill sizes="100vw" alt="Brenda Stephanie" className="cover"/><div className="closing__overlay"/><Reveal><span className="script">Gracias por ser parte de</span><h2>mi historia.</h2><p>{wedding.couple.partner1}</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>{opened && <button className="music-player" onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause/> : <Play/>}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span></button>}<div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
