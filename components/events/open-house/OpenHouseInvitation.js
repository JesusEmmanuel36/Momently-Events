"use client";
import Image from "next/image";
import {useState} from "react";
import {Camera,ChevronDown,GlassWater,Heart,House,Mail,MapPin,Music,Sparkles,Utensils} from "lucide-react";
import {PhotographicEnvelope} from "@/components/events/shared/PhotographicEnvelope";
import {RSVPSection} from "@/components/sections/GuestActions";
import {Reveal} from "@/components/ui";
import styles from "./OpenHouse.module.css";
const assets='/images/events/open-house';
const icons={home:House,toast:GlassWater,camera:Camera,food:Utensils,music:Music,sparkles:Sparkles};
export function OpenHouseInvitation({event}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false);
 const open=()=>{if(!opening)setOpening(true);};const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'});};
 const view={isLive:true,eventId:event.slug,slug:event.slug,couple:{bride:'Open House',groom:''},rsvpDisplayName:'Mi nuevo hogar',rsvpTitle:'¡Me encantaría contar contigo!',rsvpDeadline:'15 de noviembre de 2026',rsvpMessageLabel:'Un mensaje o deseo para mi nuevo hogar (opcional)',rsvpSettings:{askCompanions:false,maxCompanions:0,askMenuPreference:false,askAllergies:false,askMessage:true,askSongSuggestion:false}};
 return <div className={styles.invitation}>
  {!opened?<section className={styles.intro}><Image src={event.hero.image} alt="Una casa azul entre hortensias, ilustración generada para el Open House" fill priority sizes="100vw" className={styles.introPhoto} unoptimized/><div className={styles.introShade}/><header className={styles.introTitle}><span>Una invitación para ti</span><h1>Open House</h1><p>{event.hero.quote}</p></header><div className={styles.envelope}><PhotographicEnvelope assets={assets} openWidth={107.5} openBottom={7.3} sealTop={51} title="Open House" subtitle="Un nuevo hogar, una nueva historia" date={event.dateDisplay} opening={opening} onOpen={open} onOpened={finish}/></div><button type="button" className={styles.button} onClick={open} disabled={opening}>{opening?'Abriendo…':'Abrir invitación'}</button></section>:<main>
   <section className={styles.hero}><Image src={event.hero.image} fill priority sizes="100vw" unoptimized alt="Ilustración de una entrada acogedora con flores blancas y azules" className={styles.heroPhoto}/><div className={styles.heroShade}/><div className={styles.heroCopy}><House size={30} strokeWidth={1}/><span className={styles.kicker}>Un nuevo comienzo</span><h1>Open House</h1><p>{event.hero.quote}</p><div className={styles.heroDate}><span>Sábado 5 de diciembre de 2026</span><strong>4:00 p. m.</strong></div><a className={styles.button} href="#rsvp">Confirmar asistencia</a></div><a className={styles.scroll} href="#bienvenida" aria-label="Descubrir la invitación"><ChevronDown/></a></section>
   <section className={styles.welcome} id="bienvenida"><Reveal><Image src={`${assets}/floral.webp`} unoptimized width={1536} height={1024} sizes="(max-width:700px) 92vw,560px" alt="Arreglo de hortensias azules y rosas blancas" className={styles.floral}/><span className={styles.kicker}>Las puertas están abiertas</span><h2>¡Bienvenidos a mi nuevo hogar!</h2><p>Hay historias que comienzan con una nueva puerta. Me encantará abrirte la mía y celebrar contigo este nuevo comienzo.</p><div className={styles.locationCard}><MapPin size={27} strokeWidth={1}/><h3>Nos vemos en casa</h3><p>{event.reception.address}</p><span>{event.dateDisplay}<br/>A partir de las 4:00 p. m.</span><a className={styles.outlineButton} href={event.reception.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>Buscar dirección</a></div></Reveal></section>
   <section className={styles.itinerary}><Reveal><span className={styles.kicker}>Una tarde y una noche para recordar</span><h2>Así celebraremos</h2></Reveal><ol>{event.itinerary.map(item=>{const Icon=icons[item.icon];return <li key={item.time}><Reveal className={styles.timelineRow}><span className={styles.timelineIcon}><Icon size={25} strokeWidth={1.2}/></span><div><time>{item.range}</time><h3>{item.title}</h3><p>{item.description}</p></div></Reveal></li>;})}</ol></section>
   <section className={styles.blueTouch}><Reveal><span className={styles.kicker}>La temática</span><h2>{event.dressCode.title}</h2><p>{event.dressCode.text}</p><div className={styles.swatches} aria-label="Tonos de azul sugeridos">{event.dressCode.colors.map(color=><i key={color} style={{background:color}} aria-label={`Azul ${color}`}/>)}</div><span>El azul que más te guste, a tu manera.</span></Reveal></section>
   <section className={styles.gifts}><Reveal><Mail size={36} strokeWidth={1}/><span className={styles.kicker}>{event.gifts[0].name}</span><h2>{event.giftHeading}</h2><p>{event.gifts[0].description}</p><div className={styles.wish}><Heart size={20} strokeWidth={1}/><p>{event.giftWish}</p></div></Reveal></section>
   <div className={styles.rsvp}><RSVPSection wedding={view}/></div>
   <section className={styles.closing}><Reveal><House size={34} strokeWidth={1}/><h2>Un nuevo hogar,<br/>una nueva historia</h2><p>Gracias por ser parte de este nuevo comienzo.</p><span>¡Te espero!</span></Reveal></section>
  </main>}
 </div>;
}
