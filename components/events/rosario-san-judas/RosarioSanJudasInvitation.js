"use client";
import Image from "next/image";
import { CalendarDays, ChevronDown, Clock, Cross, MapPin } from "lucide-react";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { Reveal } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./RosarioSanJudas.module.css";

export function RosarioSanJudasInvitation({ event }) {
  return <main className={styles.invitation}>
    <header className={styles.hero}>
      <div className={styles.portrait}><Image src={event.hero.image} width={1024} height={1536} unoptimized priority sizes="(max-width:800px) 100vw,50vw" alt="Imagen devocional de San Judas Tadeo con manto verde y medallón dorado"/></div>
      <div className={styles.heroCopy}><Cross strokeWidth={1}/><span className={styles.eyebrow}>Con fe y devoción</span><h1>Rosario en honor a <em>San Judas Tadeo</em></h1><div className={styles.divider}/><p>{event.hero.quote}</p><strong>{event.dateDisplay}</strong><span className={styles.time}>{event.ceremony.time}</span><a className={styles.button} href="#invitacion">Ver invitación <ChevronDown size={16}/></a></div>
    </header>
    <section className={styles.welcome} id="invitacion"><Reveal><span className={styles.eyebrow}>Te invitamos a acompañarnos</span><h2>Unidos en oración</h2><p>Tu compañía hará de este encuentro un momento especial de fe, esperanza y gratitud.</p><div className={styles.signature}>{event.organizer}</div></Reveal></section>
    <section className={styles.details}><Reveal><span className={styles.eyebrow}>Nuestro encuentro</span><h2>Será un gusto recibirte</h2><div className={styles.detailGrid}><article><CalendarDays strokeWidth={1}/><h3>Fecha</h3><p>{event.calendarDate}</p></article><article><Clock strokeWidth={1}/><h3>Horario</h3><p>{event.ceremony.time}</p></article><article><MapPin strokeWidth={1}/><h3>Dirección</h3><p>{event.ceremony.address}</p></article></div><button className={styles.button} onClick={()=>openGoogleCalendar({title:event.eventTitle,start:event.date,durationHours:2,location:event.ceremony.address,details:event.hero.quote+" Invita: "+event.organizer})}>Agregar a mi calendario</button></Reveal></section>
    <div className={styles.countdown}><CountdownSection wedding={event}/></div>
    <footer className={styles.closing}><Cross strokeWidth={1}/><h2>Te esperamos con mucho cariño</h2><p>{event.organizer}</p><small>{event.calendarDate} · {event.ceremony.time}</small></footer>
  </main>;
}
