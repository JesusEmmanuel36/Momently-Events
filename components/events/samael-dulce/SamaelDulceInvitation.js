"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Blend,CalendarDays,Heart,MapPin,Pause,Play,Sparkles} from "lucide-react";
import {TraditionalIntro,TraditionalHero} from "@/components/events/shared/TraditionalCover";
import {RSVPSection} from "@/components/sections/GuestActions";
import {Reveal} from "@/components/ui";
import styles from "./SamaelDulce.module.css";
const assets='/images/events/samael-y-dulce';
function Countdown({date}){const [remaining,setRemaining]=useState(null);useEffect(()=>{const tick=()=>setRemaining(Math.max(0,new Date(date).getTime()-Date.now()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer)},[date]);const seconds=Math.floor((remaining||0)/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];return <div className={styles.countdown}>{['Días','Horas','Minutos','Segundos'].map((label,i)=><div key={label}><strong>{remaining===null?'—':String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>}
export function SamaelDulceInvitation({wedding}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[musicError,setMusicError]=useState(false);const audio=useRef(null);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>setMusicError(true))};const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'})};const toggleMusic=()=>{if(playing)audio.current?.pause();else audio.current?.play().catch(()=>setMusicError(true))};
 const rsvp={isLive:true,eventId:wedding.slug,slug:wedding.slug,couple:{bride:'Dulce',groom:'Samael'},rsvpDisplayName:'D',rsvpTitle:'¿Nos acompañas?',rsvpMessageLabel:'Un mensaje para los novios',rsvpSettings:{askCompanions:false,maxCompanions:0,askMenuPreference:false,askAllergies:false,askMessage:true,askSongSuggestion:false}};
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.url} loop preload="auto" onPlay={()=>{setPlaying(true);setMusicError(false)}} onPause={()=>setPlaying(false)} onError={()=>setMusicError(true)}/>
 {!opened?<TraditionalIntro image={wedding.hero.image} assets={assets} names={["Samael", "Dulce"]} subtitle="¡Nos casamos!" date={wedding.dateDisplay} opening={opening} onOpen={open} onOpened={finish} openWidth={117} openBottom={4.2} sealTop={50}/>:<main>
 <TraditionalHero image={wedding.hero.image} assets={assets} names={["Samael", "Dulce"]} subtitle="¡Nos casamos!" date={wedding.dateDisplay} href="#bienvenida"/>
 <section className={`${styles.section} ${styles.welcome}`} id="bienvenida"><Reveal><Image src={`${assets}/floral.webp`} alt="Arreglo botánico de eucalipto y flores marfil" width={1536} height={1024} sizes="(max-width:700px) 92vw,560px" className={styles.floral} unoptimized/><span className={styles.kicker}>Compartamos nuestro destino</span><h2>El comienzo de nuestra vida juntos</h2><p className={styles.heroMessage}>{wedding.hero.quote}</p><p className={styles.quote}>{wedding.welcome}</p><div className={styles.names}><span>{wedding.couple.partner1}</span><Heart size={18} strokeWidth={1}/><span>{wedding.couple.partner2}</span></div></Reveal></section>
 <section className={styles.countdownSection}><Reveal><CalendarDays size={29} strokeWidth={1}/><span className={styles.kicker}>Nos vemos muy pronto</span><h2>Cuenta regresiva</h2><Countdown date={wedding.date}/></Reveal></section>
 <section className={`${styles.section} ${styles.location}`}><Reveal><span className={styles.kicker}>Nuestro gran día</span><h2>Salón París</h2><div className={styles.venuePhoto}><Image src={`${assets}/salon.png`} alt="Entrada del Salón París, lugar de la celebración" width={802} height={778} sizes="(max-width:700px) 90vw,540px"/></div><div className={styles.venueCaption}><MapPin size={19} strokeWidth={1}/><p>Ceremonia y fiesta en el mismo lugar</p></div><a className={styles.outlineButton} href="#itinerario">Ver horarios</a></Reveal></section>
 <section className={styles.itinerary} id="itinerario"><Reveal><span className={styles.kicker}>Cada momento, contigo</span><h2>Así celebraremos</h2><ol>{wedding.itinerary.map((item,i)=><li key={item.time}><span className={styles.timelineIcon}>{i===0?<Blend size={27} strokeWidth={1}/>:<Sparkles size={27} strokeWidth={1}/>}</span><div><time>{item.displayTime}</time><h3>{item.title}</h3></div></li>)}</ol></Reveal></section>
 <section className={`${styles.section} ${styles.memory}`}><Reveal><span className={styles.kicker}>Un día para compartir</span><h2>Solo faltas tú</h2><p className={styles.scriptMessage}>{wedding.guestMessage}</p></Reveal></section>
 <section className={`${styles.section} ${styles.dressCode}`}><Reveal><span className={styles.kicker}>Código de vestimenta</span><h2>{wedding.dressCode.title}</h2><div className={styles.swatches} aria-label="Sugerencias de colores neutros">{wedding.dressCode.colors.map(color=><i key={color} style={{background:color}}/>)}</div><p>Te invitamos a vestir en colores neutros.</p><p className={styles.reserved}>El blanco está reservado para la novia.</p></Reveal></section>
 <section className={`${styles.section} ${styles.calendar}`}><Reveal><CalendarDays size={32} strokeWidth={1}/><p>{wedding.reminder}</p><div className={styles.calendarCard}><span>Enero 2027</span><strong>30</strong><small>Sábado</small><Heart size={21} strokeWidth={1}/></div><span className={styles.kicker}>30 de enero de 2027</span></Reveal></section>
 <div className={styles.rsvp}><RSVPSection wedding={rsvp}/></div>
 <section className={`${styles.section} ${styles.closing}`}><Reveal><Heart size={28} strokeWidth={1}/><h2>Solo faltas tú</h2><p>¡Hagamos de este día un recuerdo inolvidable!</p><p className={styles.signature}>Samael &amp; Dulce</p><span>30 · Enero · 2027</span></Reveal></section>
 </main>}
 {opened&&<button className={styles.music} onClick={toggleMusic} aria-label={playing?'Pausar música':'Reproducir música'}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{musicError?'Toca para reintentar':wedding.music.label}</span></button>}
 </div>
}
