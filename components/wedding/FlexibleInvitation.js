"use client";
import Image from "next/image";
import { CalendarDays, Church, Gift, MapPin, MessageCircle, Pause, Play, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { FAQSection, RSVPSection, SongSection } from "@/components/sections/GuestActions";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./FlexibleInvitation.module.css";

function Flowers() { return <div className={styles.flowers} aria-hidden="true">{[0,1,2,3,4].map(i => <span className={styles.flower} key={i} style={{"--i":i}}>{[0,1,2,3,4,5].map(p => <i key={p} style={{"--p":p}} />)}<b /></span>)}{[0,1,2,3,4,5].map(i => <em key={i} style={{"--i":i}} />)}</div>; }
const time = value => { const m = /^(\d{2}):(\d{2})$/.exec(value || ""); return m ? `${Number(m[1])%12||12}:${m[2]} ${Number(m[1])>=12?"p. m.":"a. m."}` : value; };

export function FlexibleInvitation({ event, previewMode = false, previewEnvelope = false }) {
  const d = event.publicData || {}, sections = d.sections || {}, decoration = d.decorations || {};
  const visible = key => sections[key] !== false;
  const names = [d.couple?.partner1,d.couple?.partner2].filter(Boolean);
  const title = d.eventTitle || names.join(" & ") || "Una celebración especial";
  const initials = names.map(n => n.trim()[0]).join(" & ") || "M";
  const date = d.weddingDate?.iso;
  const dateLabel = date ? new Intl.DateTimeFormat("es-MX",{day:"numeric",month:"long",year:"numeric",timeZone:d.weddingDate?.timezone || "America/Monterrey"}).format(new Date(date)) : "";
  const [opened,setOpened] = useState((previewMode && !previewEnvelope) || decoration.envelope === false), [opening,setOpening] = useState(false), [playing,setPlaying] = useState(false), [active,setActive] = useState(null);
  const audio = useRef(null), timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current),[]);
  useEffect(() => { if(active === null) return; const key=e=>{if(e.key==="Escape")setActive(null);}; window.addEventListener("keydown",key); return()=>window.removeEventListener("keydown",key); },[active]);
  const open = () => { if(opening)return; setOpening(true); audio.current?.play().catch(()=>{}); timer.current=setTimeout(()=>{setOpened(true);if(!previewMode)window.scrollTo({top:0,behavior:"instant"});},window.matchMedia("(prefers-reduced-motion: reduce)").matches?50:1800); };
  const gallery = [...(d.gallery || [])].sort((a,b)=>a.order-b.order).filter(p=>p.url);
  const whatsapp = String(d.contact?.whatsapp || "").replace(/\D/g,"");
  const wedding = {rsvpMessageLabel:"Mensaje para los festejados",isLive:!previewMode,eventId:event.eventId,slug:event.slug,couple:{bride:names[0] || "",groom:names[1] || ""},date,rsvpSettings:event.rsvp || {},rsvpDeadline:event.rsvp?.deadline ? new Date(event.rsvp.deadline).toLocaleDateString("es-MX") : "",faqs:d.faqs || []};
  const vars = {"--coffee":d.theme?.primary,"--coffee-dark":d.theme?.dark,"--champagne":d.theme?.champagne,"--cream":d.theme?.cream,"--ivory":d.theme?.ivory,"--rose":d.theme?.rose,"--sage":d.theme?.sage,"--envelope":decoration.envelopeColor || d.theme?.rose,"--flower":decoration.flowerColor || d.theme?.rose,"--foliage":decoration.foliageColor || d.theme?.sage,"--seal":decoration.sealColor || d.theme?.champagne};
  const floral = decoration.flowers !== false;
  return <div className={styles.invitation} style={vars}>
    {d.music?.enabled && d.music.url && !previewMode && <audio ref={audio} src={d.music.url} loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening?styles.opening:""}`}><span>Una invitación para ti</span><div className={styles.envelopeScene}><div className={styles.flapBack}/><div className={styles.letter}>{floral&&<Flowers/>}<small>{d.hero?.subtitle}</small>{visible("names")&&<h2>{title}</h2>}{visible("date")&&<p>{dateLabel}</p>}</div><div className={styles.pocket}/><div className={styles.flap}/><button className={styles.seal} onClick={open} disabled={opening} aria-label="Abrir invitación">{initials}</button></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}</button></div>}
    {opened && <main>
      <section className={styles.hero}>{visible("hero")&&d.hero?.imageUrl&&<Image unoptimized src={d.hero.imageUrl} fill priority sizes="100vw" alt={title}/>}<div className={styles.heroShade}/>{floral&&<Flowers/>}<div className={styles.heroCopy}>{d.hero?.subtitle&&<span>{d.hero.subtitle}</span>}{visible("names")&&<h1>{names.length?names.map((name,i)=><span key={i}>{i>0&&<i>&</i>}{name}</span>):title}</h1>}{visible("date")&&dateLabel&&<p>{dateLabel}</p>}{d.hero?.quote&&<blockquote>{d.hero.quote}</blockquote>}</div></section>
      {visible("welcome")&&(d.welcome?.title||d.welcome?.text)&&<Reveal><section className={styles.section}>{floral&&<Flowers/>}<h2>{d.welcome.title}</h2><p>{d.welcome.text}</p></section></Reveal>}
      {visible("paragraphs")&&(d.paragraphs||[]).filter(p=>p.enabled!==false&&(p.title||p.text)).map((p,i)=><Reveal key={i}><section className={styles.section}><Sparkles/><h2>{p.title}</h2><p>{p.text}</p></section></Reveal>)}
      {visible("family")&&(d.family||[]).filter(g=>g.enabled!==false&&g.names).length>0&&<Reveal><section className={styles.section}>{floral&&<Flowers/>}{d.family.filter(g=>g.enabled!==false&&g.names).map((g,i)=><article className={styles.family} key={i}><h3>{g.title}</h3>{g.names.split("\n").filter(Boolean).map((n,j)=><p key={j}>{n}</p>)}</article>)}</section></Reveal>}
      {visible("countdown")&&date&&<CountdownSection wedding={wedding}/>}
      {visible("story")&&d.story?.length>0&&<Reveal><section className={styles.section}><h2>Nuestra historia</h2>{d.story.map((item,i)=><article className={styles.family} key={i}><small>{item.year}</small><h3>{item.title}</h3><p>{item.description}</p>{item.imageUrl&&<Image unoptimized className={styles.venuePhoto} src={item.imageUrl} width={1000} height={700} alt={item.title||"Un momento especial"}/>}</article>)}</section></Reveal>}
      {visible("gallery")&&gallery.length>0&&<Reveal><section className={styles.section}><h2>Momentos especiales</h2><div className={styles.gallery}>{gallery.map((p,i)=><button key={p.id||i} onClick={()=>setActive(i)} aria-label={`Abrir fotografía ${i+1}`}><Image unoptimized src={p.url} width={900} height={1000} sizes="(max-width:700px) 50vw,33vw" alt={p.alt||title}/></button>)}</div></section></Reveal>}
      {["ceremony","reception"].map(key=>{const p=d[key]; return p?.enabled&&(p.name||p.time||p.address||p.imageUrl)?<Reveal key={key}><section className={styles.section}>{p.imageUrl?<Image unoptimized className={styles.venuePhoto} src={p.imageUrl} width={1000} height={700} alt={p.name||"Lugar del evento"}/>:floral&&<Flowers/>}{key==="ceremony"?<Church/>:<Sparkles/>}<span>{key==="ceremony"?"Ceremonia":"Recepción"}</span><h2>{p.name}</h2>{p.time&&<strong>{time(p.time)}</strong>}<p>{p.address}</p><div className={styles.actions}>{p.mapsUrl&&<a href={p.mapsUrl} target="_blank" rel="noreferrer"><MapPin/>Ver ubicación</a>}{p.wazeUrl&&<a href={p.wazeUrl} target="_blank" rel="noreferrer">Abrir Waze</a>}</div></section></Reveal>:null;})}
      {visible("itinerary")&&d.itinerary?.length>0&&<Reveal><section className={styles.section}><h2>Itinerario</h2><div className={styles.timeline}>{d.itinerary.map((item,i)=><article key={i}><strong>{time(item.time)}</strong><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section></Reveal>}
      {d.dressCode?.enabled&&<Reveal><section className={styles.section}><span>Código de vestimenta</span><h2>{d.dressCode.title}</h2><p>{d.dressCode.text}</p><div className={styles.swatches}>{d.dressCode.colors?.map(c=><i key={c} style={{background:c}} aria-label={`Color ${c}`}/>)}</div></section></Reveal>}
      {visible("gifts")&&(d.gifts?.length>0||d.bank?.enabled)&&<Reveal><section className={styles.section}><Gift/><h2>Un detalle con cariño</h2>{d.gifts?.map((g,i)=><article key={i}><h3>{g.name}</h3><p>{g.description}</p>{g.url&&<a href={g.url} target="_blank" rel="noreferrer">Ver regalos</a>}</article>)}{d.bank?.enabled&&<dl className={styles.bank}>{[["Banco",d.bank.bank],["Titular",d.bank.holder],["CLABE",d.bank.clabe],["Cuenta",d.bank.account]].filter(([,v])=>v).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}</section></Reveal>}
      {visible("hotels")&&d.hotels?.length>0&&<Reveal><section className={styles.section}><h2>Hospedaje</h2>{d.hotels.map((h,i)=><article className={styles.family} key={i}><h3>{h.name}</h3><p>{h.detail}</p><p>{h.address}</p><div className={styles.actions}>{h.url&&<a href={h.url} target="_blank" rel="noreferrer">Ver hospedaje</a>}{h.mapsUrl&&<a href={h.mapsUrl} target="_blank" rel="noreferrer">Ubicación</a>}</div></article>)}</section></Reveal>}
      {visible("important")&&d.importantInfo?.length>0&&<Reveal><section className={styles.section}><h2>Avisos importantes</h2>{d.importantInfo.map((p,i)=><article key={i}><h3>{p.title}</h3><p>{p.description}</p></article>)}</section></Reveal>}
      {d.video?.enabled&&d.video.url&&<section className={styles.section}><video className={styles.video} controls src={d.video.url} poster={d.video.posterUrl||undefined}/></section>}
      {visible("calendar")&&date&&<Reveal><section className={styles.section}><CalendarDays/><h2>Reserva la fecha</h2><p>{dateLabel}</p><button onClick={()=>openGoogleCalendar({title,start:date,durationHours:6,location:d.reception?.address||d.ceremony?.address||"",details:d.hero?.quote||""})}>Agregar al calendario</button></section></Reveal>}
      {event.rsvp?.enabled&&<RSVPSection wedding={wedding}/>}
      {visible("songRequest")&&event.rsvp?.enabled&&event.rsvp?.askSongSuggestion&&<SongSection wedding={wedding}/>}
      {visible("faqs")&&d.faqs?.length>0&&<FAQSection wedding={wedding}/>}
      {visible("contact")&&whatsapp&&<Reveal><section className={styles.section}><MessageCircle/><h2>Te esperamos con cariño</h2><a href={`https://wa.me/${whatsapp.length===10?"52":""}${whatsapp}`} target="_blank" rel="noreferrer">{event.rsvp?.enabled?"Contactar por WhatsApp":"Confirmar por WhatsApp"}</a></section></Reveal>}
      {visible("closing")&&<section className={styles.section}>{floral&&<Flowers/>}<h2>Gracias por ser parte de este día</h2><p>{title}</p></section>}
    </main>}
    {active!==null&&<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Fotografía"><button autoFocus onClick={()=>setActive(null)} aria-label="Cerrar"><X/></button><Image unoptimized src={gallery[active].url} fill sizes="100vw" alt={gallery[active].alt||title}/></div>}
    {opened&&d.music?.enabled&&d.music.url&&!previewMode&&<button className={styles.music} onClick={()=>playing?audio.current?.pause():audio.current?.play().catch(()=>{})}>{playing?<Pause/>:<Play/>}{d.music.label||"Escuchar música"}</button>}
  </div>;
}
