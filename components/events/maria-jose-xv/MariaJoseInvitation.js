"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {CalendarDays,Heart,MapPin,MessageCircle,Pause,Play,Shirt,Sparkles} from "lucide-react";
import {TraditionalIntro,TraditionalHero} from "@/components/events/shared/TraditionalCover";
import {Reveal} from "@/components/ui";
import styles from "./MariaJose.module.css";
const assets='/images/events/xv-mariajose';
function Glitter(){return <div className={styles.glitter} aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{left:`${(i*37+7)%97}%`,top:`${(i*23+11)%94}%`,animationDelay:`${i%7*.6}s`,width:i%3===0?4:2,height:i%3===0?4:2}}/>)}</div>}
function Countdown({date}){const [remaining,setRemaining]=useState(null);useEffect(()=>{const tick=()=>setRemaining(Math.max(0,new Date(date).getTime()-Date.now()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer)},[date]);const seconds=Math.floor((remaining||0)/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];return <div className={styles.countdown}>{['Días','Horas','Minutos','Segundos'].map((label,i)=><div key={label}><strong>{remaining===null?'—':String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>}
export function MariaJoseInvitation({event}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[musicError,setMusicError]=useState(false);const audio=useRef(null);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setMusicError(true))};const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'})};const toggleMusic=()=>{if(playing)audio.current?.pause();else audio.current?.play().catch(()=>setMusicError(true))};
 const whatsapp=`https://wa.me/52${event.contact.phone}?text=${encodeURIComponent('Hola, quiero confirmar mi asistencia a los XV de María José el 23 de diciembre de 2026.')}`;
 return <div className={styles.invitation}>
 <audio ref={audio} src={event.music.url} loop preload="auto" onPlay={()=>{setPlaying(true);setMusicError(false)}} onPause={()=>setPlaying(false)} onError={()=>setMusicError(true)}/>
 {!opened?<TraditionalIntro image={event.hero.image} assets={assets} names={["María José"]} subtitle="Mis XV años" date={event.dateDisplay} opening={opening} onOpen={open} onOpened={finish} openWidth={117} openBottom={4.8} sealTop={50}/>:<main>
 <TraditionalHero image={event.hero.image} assets={assets} names={["María José"]} subtitle="Mis XV años" date={event.dateDisplay} href="#mis-quince"><Glitter/></TraditionalHero>
 <section className={`${styles.section} ${styles.welcome}`} id="mis-quince"><Reveal><Image src={`${assets}/floral.webp`} alt="Rosas rojo profundo y flores marfil con detalles dorados" width={1536} height={1024} sizes="(max-width:700px) 92vw,560px" className={styles.floral} unoptimized/><span className={styles.kicker}>Una noche para recordar</span><h2>Mis quince, mi gran ilusión</h2><p className={styles.quote}>{event.hero.quote}</p><span className={styles.signature}>María José</span></Reveal></section>
 <section className={styles.countdownSection}><Glitter/><Reveal><Sparkles size={29} strokeWidth={1}/><span className={styles.kicker}>La cuenta regresiva comenzó</span><h2>Nos vemos en…</h2><Countdown date={event.date}/><p>{event.dateDisplay}</p></Reveal></section>
 <section className={`${styles.section} ${styles.location}`}><Reveal><MapPin size={33} strokeWidth={1}/><span className={styles.kicker}>Mi celebración</span><h2>Salón Dorado</h2><p className={styles.locationType}>Ceremonia y recepción</p><div className={styles.eventTime}><CalendarDays size={24} strokeWidth={1}/><div><strong>6:00 p. m.</strong><span>23 de diciembre de 2026</span></div></div><p>{event.reception.address}</p><div className={styles.venueLine}/><span className={styles.kicker}>Cintalapa, Chiapas</span></Reveal></section>
 <section className={`${styles.section} ${styles.dressCode}`}><Reveal><Shirt size={30} strokeWidth={1}/><span className={styles.kicker}>Para acompañarme</span><h2>Código de vestimenta</h2><p>Por favor, no llevar prendas color <strong>guinda</strong> ni <strong>rojo vino</strong>.</p><div className={styles.reservedColors} aria-label="Colores que no deben usarse">{[['Guinda','#791C35'],['Rojo vino','#66192D']].map(([label,color])=><div key={label}><i style={{background:color}} aria-hidden="true"/><span>{label}</span></div>)}</div></Reveal></section>
 <section className={`${styles.section} ${styles.confirmation}`}><Glitter/><Reveal><MessageCircle size={34} strokeWidth={1}/><span className={styles.kicker}>Será una alegría verte</span><h2>Confirma tu asistencia</h2><p>Me encantará compartir contigo este momento tan especial. Confirma tu asistencia por WhatsApp.</p><a className={styles.button} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar por WhatsApp</a><span className={styles.phone}>968 125 2562</span></Reveal></section>
 <section className={`${styles.section} ${styles.closing}`}><Reveal><Heart size={27} strokeWidth={1}/><h2>¡Te espero para celebrar!</h2><p>Con cariño,</p><span className={styles.signature}>María José</span><span className={styles.closingDate}>23 · Diciembre · 2026</span></Reveal></section>
 </main>}
 {opened&&<button className={styles.music} onClick={toggleMusic} aria-label={playing?'Pausar música':'Reproducir música'}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{musicError?'Toca para reintentar':event.music.label}</span></button>}
 </div>
}
