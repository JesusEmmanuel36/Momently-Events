'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Heart } from 'lucide-react';
import styles from './Cinematic.module.css';

export function EventDetailsScene({ config }) {
  return <section className={styles.eventDetails} id="celebracion"><div className={styles.eventHeading}><span className={styles.eyebrow}>El día que lo cambia todo</span><h2>Un lugar.<br/>Todos nuestros sueños.</h2><p>{config.dateLabel}</p></div><div className={styles.eventPlaces}>{['ceremony','reception'].map((key,index)=>{const place=config.event[key];return <article key={key}><span className={styles.eyebrow}>0{index+1} / {index ? 'La celebración' : 'El sí ante Dios'}</span><h3>{place.name}</h3><p>{place.time}<br/>{place.place}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name+' '+place.place)}`} target="_blank" rel="noreferrer">Explorar ubicación <ArrowUpRight size={16}/></a></article>;})}</div><div className={styles.attire}><span className={styles.eyebrow}>Para acompañarnos</span><p>{config.event.dressCode}</p><small>Datos de ejemplo para mostrar la experiencia.</small></div></section>;
}
export function FinalCTASection({ config }) {
  const [done,setDone]=useState(false);
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  function submit(event){event.preventDefault();setDone(true);}
  return <section className={styles.finale} id="confirmar"><Heart strokeWidth={1} size={32}/><span className={styles.eyebrow}>Tu presencia forma parte de la historia</span><h2>Nos encantará<br/>vivirlo contigo.</h2><p>Reserva {config.dateLabel}.<br/>Lo demás, lo recordaremos juntos.</p><div className={styles.rsvpPanel}>{done ? <div role="status" className={styles.demoSuccess}><Check size={28}/><h3>Así se siente decir que sí.</h3><p>Esta es una demostración. No se enviaron ni guardaron tus datos.</p><button onClick={()=>setDone(false)}>Volver a probar</button></div> : <form onSubmit={submit}><h3>¿Nos acompañas?</h3><label>Tu nombre<input name="name" autoComplete="name" required maxLength={100} placeholder="Escribe tu nombre"/></label><label>Tu respuesta<select name="attendance"><option value="yes">Sí, estaré ahí</option><option value="no">No podré acompañarlos</option></select></label><button type="submit" disabled={!ready}>Confirmar asistencia <ArrowUpRight size={18}/></button><small>Formulario de muestra. No registra confirmaciones reales.</small></form>}</div><footer><span>{config.couple.partner1} &amp; {config.couple.partner2}</span><Link href="/eventos">Una experiencia de Momently Events ↗</Link></footer></section>;
}
