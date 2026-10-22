"use client";
import {invitationBackgrounds,introBackgroundSettings} from "@/lib/wedding/backgrounds";
import {InvitationSection} from "./InvitationSection";
import {typographyStyle} from "@/lib/wedding/typography";
import {heroTextStyle} from "@/lib/wedding/hero-typography";
import {CreatorPass} from "./CreatorPass";
import Image from "next/image";
import {CoverBackground} from "./CoverBackground";
import {CssEnvelope} from "@/components/envelope/CssEnvelope";
import {CssFloralArrangement} from "@/components/floral/CssFloralArrangement";
import { CalendarDays, Church, ChevronDown, MapPin, MessageCircle, Pause, Play, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { FAQSection, RSVPSection, SongSection } from "@/components/sections/GuestActions";
import { openGoogleCalendar } from "@/lib/calendar";
import {GiftContent} from "./GiftContent";
import {DEFAULT_GIFT_MESSAGE} from "@/lib/wedding/creator-settings";
import styles from "./FlexibleInvitation.module.css";

const time = value => { const m = /^(\d{2}):(\d{2})$/.exec(value || ""); return m ? `${Number(m[1])%12||12}:${m[2]} ${Number(m[1])>=12?"p. m.":"a. m."}` : value; };

export function FlexibleInvitation({ event, previewMode = false, previewEnvelope = false, pass = null, passToken = null }) {
  const d = event.publicData || {}, sections = d.sections || {}, decoration = d.decorations || {};
  const backgrounds=invitationBackgrounds(d);
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
  const open = () => { setOpening(true); audio.current?.play().catch(()=>{}); };
  const finishOpening = () => { setOpened(true); if(!previewMode)window.scrollTo({top:0,behavior:"instant"}); };
  const gallery = [...(d.gallery || [])].sort((a,b)=>a.order-b.order).filter(p=>p.url);
  const whatsapp = String(d.contact?.whatsapp || "").replace(/\D/g,"");
  const wedding = {rsvpMessageLabel:"Mensaje para los festejados",isLive:!previewMode,eventId:event.eventId,slug:event.slug,couple:{bride:names[0] || "",groom:names[1] || ""},date,rsvpSettings:event.rsvp || {},rsvpDeadline:event.rsvp?.deadline ? new Date(event.rsvp.deadline).toLocaleDateString("es-MX") : "",faqs:d.faqs || []};
  const vars = {...typographyStyle(d.typography),"--text":d.theme?.dark,"--text-soft":d.theme?.dark,"--coffee":d.theme?.primary,"--coffee-dark":d.theme?.dark,"--champagne":d.theme?.champagne,"--cream":d.theme?.cream,"--ivory":d.theme?.ivory,"--rose":d.theme?.rose,"--sage":d.theme?.sage,"--envelope":decoration.envelopeColor || d.theme?.rose,"--flower":decoration.flowerColor || d.theme?.rose,"--foliage":decoration.foliageColor || d.theme?.sage,"--seal":decoration.sealColor || d.theme?.champagne};
  const materialColors = {paper:decoration.paperColor || d.theme?.ivory,ribbon:decoration.envelopeColor || d.theme?.rose,seal:decoration.sealColor || d.theme?.champagne,flowers:decoration.lightFlowerColor || d.theme?.ivory,accentFlowers:decoration.flowerColor || d.theme?.rose,leaves:decoration.foliageColor || d.theme?.sage};
  const Flowers = () => <div className={styles.floralArrangement} aria-hidden="true"><CssFloralArrangement lightweight colors={materialColors}/></div>;
  const floral = decoration.flowers !== false;
  return <div className={styles.invitation} style={vars}>
    {d.music?.enabled && d.music.url && !previewMode && <audio ref={audio} src={d.music.url} loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} />}
    {!opened && <InvitationSection name="intro" data={d}><div className={`${styles.intro} ${backgrounds.intro ? styles.photoIntro : ""}`}>{backgrounds.intro&&<CoverBackground src={backgrounds.intro} theme={d.theme} settings={introBackgroundSettings(d)}/>}<span>Una invitación para ti</span><div className={styles.cssEnvelope}><CssEnvelope variant={decoration.envelopeVariant} showBow={decoration.envelopeBow !== false} colors={{...materialColors,letter:decoration.letterColor,sealText:decoration.sealTextColor}} monogram={decoration.monogram || initials} open={opening} onOpenChange={open} onOpened={finishOpening} showFlowers={floral && d.sectionAppearance?.intro?.flowers !== false} letter={{eyebrow:d.hero?.subtitle || "Una invitación para ti",title:visible("names")?title:"",message:visible("date")?dateLabel:"",footer:"Con todo nuestro cariño"}}/></div><button className={styles.openButton} onClick={open} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}</button></div></InvitationSection>}
    {opened && <main className={d.hero?.animated === false ? styles.noEntrance : undefined}>
      <InvitationSection name="hero" data={d}><section style={heroTextStyle(d.hero)} className={`${styles.hero} ${visible("hero")&&backgrounds.hero ? styles.photoHero : ""} ${d.hero?.animated !== false ? styles.animatedHero : ""}`}>{visible("hero")&&backgrounds.hero&&<CoverBackground src={backgrounds.hero} theme={d.theme} settings={d.hero}/>}{!(visible("hero")&&backgrounds.hero)&&<div className={styles.heroShade}/>}{floral&&(d.sectionAppearance?.hero?.flowers ?? d.hero?.flowers) !== false&&<Flowers/>}<div className={styles.heroCopy}>{d.hero?.subtitle&&<span>{d.hero.subtitle}</span>}{visible("names")&&<h1>{names.length?names.map((name,i)=><span key={i}>{i>0&&<i>&</i>}{name}</span>):title}</h1>}{visible("date")&&dateLabel&&<p>{dateLabel}</p>}{d.hero?.quote&&<blockquote>{d.hero.quote}</blockquote>}</div><a className={styles.scrollHint} href="#invitation-content" aria-label="Descubrir invitación"><ChevronDown size={24}/></a></section></InvitationSection><div id="invitation-content"/>
      {visible("welcome")&&(d.welcome?.title||d.welcome?.text)&&<Reveal><InvitationSection name="welcome" data={d} defaultFlowers><section className={styles.section}><h2>{d.welcome.title}</h2><p>{d.welcome.text}</p></section></InvitationSection></Reveal>}
      {visible("paragraphs")&&(d.paragraphs||[]).filter(p=>p.enabled!==false&&(p.title||p.text)).map((p,i)=><Reveal key={i}><InvitationSection name="paragraphs" data={d}><section className={styles.section}><Sparkles/><h2>{p.title}</h2><p>{p.text}</p></section></InvitationSection></Reveal>)}
      {visible("family")&&(d.family||[]).filter(g=>g.enabled!==false&&g.names).length>0&&<Reveal><InvitationSection name="family" data={d} defaultFlowers><section className={styles.section}>{d.family.filter(g=>g.enabled!==false&&g.names).map((g,i)=><article className={styles.family} key={i}><h3>{g.title}</h3>{g.names.split("\n").filter(Boolean).map((n,j)=><p key={j}>{n}</p>)}</article>)}</section></InvitationSection></Reveal>}
      {visible("countdown")&&date&&<InvitationSection name="countdown" data={d}><CountdownSection wedding={wedding}/></InvitationSection>}
      {visible("story")&&d.story?.length>0&&<Reveal><InvitationSection name="story" data={d}><section className={styles.section}><h2>Nuestra historia</h2>{d.story.map((item,i)=><article className={styles.family} key={i}><small>{item.year}</small><h3>{item.title}</h3><p>{item.description}</p>{item.imageUrl&&<Image unoptimized className={styles.venuePhoto} src={item.imageUrl} width={1000} height={700} alt={item.title||"Un momento especial"}/>}</article>)}</section></InvitationSection></Reveal>}
      {visible("gallery")&&gallery.length>0&&<Reveal><InvitationSection name="gallery" data={d}><section className={styles.section}><h2>Momentos especiales</h2><div className={`${styles.gallery} ${d.galleryLayout === "collage" ? styles.collage : ""}`}>{gallery.map((p,i)=><Reveal key={p.id||i} className={styles.galleryItem}><button onClick={()=>setActive(i)} aria-label={`Abrir fotografía ${i+1}`}><Image unoptimized src={p.url} width={900} height={1000} sizes="(max-width:700px) 50vw,33vw" alt={p.alt||title}/></button></Reveal>)}</div></section></InvitationSection></Reveal>}
      {["ceremony","reception"].map(key=>{const p=d[key]; return p?.enabled&&(p.name||p.time||p.address||p.imageUrl)?<Reveal key={key}><InvitationSection name={key} data={d} defaultFlowers><section className={styles.section}>{p.imageUrl?<Image unoptimized className={styles.venuePhoto} src={p.imageUrl} width={1000} height={700} alt={p.name||"Lugar del evento"}/>:null}{key==="ceremony"?<Church/>:<Sparkles/>}<span>{key==="ceremony"?"Ceremonia":"Recepción"}</span><h2>{p.name}</h2>{p.time&&<strong>{time(p.time)}</strong>}<p>{p.address}</p><div className={styles.actions}>{p.mapsUrl&&<a href={p.mapsUrl} target="_blank" rel="noreferrer"><MapPin/>Ver ubicación</a>}{p.wazeUrl&&<a href={p.wazeUrl} target="_blank" rel="noreferrer">Abrir Waze</a>}</div></section></InvitationSection></Reveal>:null;})}
      {visible("itinerary")&&d.itinerary?.length>0&&<Reveal><InvitationSection name="itinerary" data={d}><section className={styles.section}><h2>Itinerario</h2><div className={styles.timeline}>{d.itinerary.map((item,i)=><article key={i}><strong>{time(item.time)}</strong><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section></InvitationSection></Reveal>}
      {d.dressCode?.enabled&&<Reveal><InvitationSection name="dressCode" data={d}><section className={styles.section}><span>Código de vestimenta</span><h2>{d.dressCode.title}</h2><p>{d.dressCode.text}</p><div className={styles.swatches}>{d.dressCode.colors?.map(c=><i key={c} style={{background:c}} aria-label={`Color ${c}`}/>)}</div></section></InvitationSection></Reveal>}
      {visible("gifts")&&<Reveal><InvitationSection name="gifts" data={d}><section className={styles.section}><GiftContent message={d.giftMessage ?? DEFAULT_GIFT_MESSAGE} gifts={d.gifts || []} bank={d.bank}/></section></InvitationSection></Reveal>}
      {visible("hotels")&&d.hotels?.length>0&&<Reveal><InvitationSection name="hotels" data={d}><section className={styles.section}><h2>Hospedaje</h2>{d.hotels.map((h,i)=><article className={styles.family} key={i}><h3>{h.name}</h3><p>{h.detail}</p><p>{h.address}</p><div className={styles.actions}>{h.url&&<a href={h.url} target="_blank" rel="noreferrer">Ver hospedaje</a>}{h.mapsUrl&&<a href={h.mapsUrl} target="_blank" rel="noreferrer">Ubicación</a>}</div></article>)}</section></InvitationSection></Reveal>}
      {visible("important")&&d.importantInfo?.length>0&&<Reveal><InvitationSection name="important" data={d}><section className={styles.section}><h2>Avisos importantes</h2>{d.importantInfo.map((p,i)=><article key={i}><h3>{p.title}</h3><p>{p.description}</p></article>)}</section></InvitationSection></Reveal>}
      {d.video?.enabled&&d.video.url&&<InvitationSection name="video" data={d}><section className={styles.section}><video className={styles.video} controls src={d.video.url} poster={d.video.posterUrl||undefined}/></section></InvitationSection>}
      {visible("calendar")&&date&&<Reveal><InvitationSection name="calendar" data={d}><section className={styles.section}><CalendarDays/><h2>Reserva la fecha</h2><p>{dateLabel}</p><button onClick={()=>openGoogleCalendar({title,start:date,durationHours:6,location:d.reception?.address||d.ceremony?.address||"",details:d.hero?.quote||""})}>Agregar al calendario</button></section></InvitationSection></Reveal>}
      {event.personalizedPasses&&<InvitationSection name="rsvp" data={d}><CreatorPass pass={pass} token={passToken} slug={event.slug} confirmationEnabled={event.rsvp?.enabled}/></InvitationSection>}
      {!event.personalizedPasses&&event.rsvp?.enabled&&<InvitationSection name="rsvp" data={d}><RSVPSection wedding={wedding}/></InvitationSection>}
      {visible("songRequest")&&event.rsvp?.enabled&&event.rsvp?.askSongSuggestion&&<InvitationSection name="songRequest" data={d}><SongSection wedding={wedding}/></InvitationSection>}
      {visible("faqs")&&d.faqs?.length>0&&<InvitationSection name="faqs" data={d}><FAQSection wedding={wedding}/></InvitationSection>}
      {visible("contact")&&whatsapp&&<Reveal><InvitationSection name="contact" data={d}><section className={styles.section}><MessageCircle/><h2>Te esperamos con cariño</h2><a href={`https://wa.me/${whatsapp.length===10?"52":""}${whatsapp}?text=${encodeURIComponent(`Hola, quiero confirmar mi asistencia a ${title}.`)}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></section></InvitationSection></Reveal>}
      {visible("closing")&&<InvitationSection name="closing" data={d} defaultFlowers><section className={styles.section}><h2>Gracias por ser parte de este día</h2><p>{title}</p></section></InvitationSection>}
    </main>}
    {active!==null&&<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Fotografía"><button autoFocus onClick={()=>setActive(null)} aria-label="Cerrar"><X/></button><Image unoptimized src={gallery[active].url} fill sizes="100vw" alt={gallery[active].alt||title}/></div>}
    {opened&&d.music?.enabled&&d.music.url&&!previewMode&&<button className={styles.music} onClick={()=>playing?audio.current?.pause():audio.current?.play().catch(()=>{})}>{playing?<Pause/>:<Play/>}{d.music.label||"Escuchar música"}</button>}
  </div>;
}
