"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {ChevronDown,Church,Heart,MapPin,Pause,Play,Utensils} from "lucide-react";
import {PhotographicEnvelope} from "@/components/events/shared/PhotographicEnvelope";
import {Reveal} from "@/components/ui";
import {PersonalizedPass} from "@/components/events/alejandra-david/passes/PersonalizedPass";
import styles from "./FabiolaCesar.module.css";
const icons={church:Church,heart:Heart,food:Utensils};
function Countdown({date}){
 const [remaining,setRemaining]=useState(null);
 useEffect(()=>{const tick=()=>setRemaining(Math.max(0,new Date(date).getTime()-Date.now()));tick();const id=setInterval(tick,1000);return()=>clearInterval(id);},[date]);
 const seconds=Math.floor((remaining||0)/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
 return <div className={styles.countdown} aria-label="Tiempo para la boda">{['Días','Horas','Minutos','Segundos'].map((label,i)=><div key={label}><strong>{remaining===null?'—':String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>;
}
export function FabiolaCesarInvitation({wedding,pass=null,passToken=null}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[musicError,setMusicError]=useState(false);const audio=useRef(null);
 const open=()=>{if(opening)return;setOpening(true);audio.current?.play().catch(()=>{});};
 const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'});};
 const toggleMusic=()=>{if(playing)audio.current?.pause();else audio.current?.play().catch(()=>setMusicError(true));};
 return <div className={styles.invitation}>
  <audio ref={audio} src={wedding.music.url} loop preload="none" onPlay={()=>{setPlaying(true);setMusicError(false);}} onPause={()=>setPlaying(false)} onError={()=>setMusicError(true)}/>
  {!opened?<section className={styles.intro}><div className={styles.introTitle}><span>Nuestra boda</span><h1>Una invitación para ti</h1><p>Fabiola y César</p></div><div className={styles.envelope}><PhotographicEnvelope assets="/images/events/fabiola-y-cesar" opening={opening} onOpen={open} onOpened={finish} title="Fabiola y César" subtitle="Nos casamos" date={wedding.dateDisplay} openWidth={130} openBottom={-5} sealTop={55}/></div><button className={styles.button} onClick={open} disabled={opening}>{opening?'Abriendo…':'Abrir invitación'}</button></section>:<main>
   <section className={styles.hero} id="inicio"><div className={styles.heroFrame}><span>Nuestra boda</span><h1><span>Fabiola</span><i>&amp;</i><span>César</span></h1><div className={styles.goldRule}/><p>Sábado</p><p className={styles.date}>14 de noviembre de 2026</p><Heart size={20} strokeWidth={1}/></div><a href="#nuestra-union" className={styles.scroll} aria-label="Descubrir invitación"><ChevronDown/></a></section>
   {pass&&<section className={styles.passNote}><p>Una invitación para <strong>{pass.displayName}</strong></p><span>{pass.allowedSeats} {pass.allowedSeats===1?'lugar reservado':'lugares reservados'}</span><a className={styles.button} href="#tu-pase">Confirmar asistencia</a></section>}
   <section className={styles.section} id="nuestra-union"><Reveal><span className={styles.kicker}>El comienzo de nuestra vida juntos</span><h2>Nos elegimos para siempre</h2><p className={styles.quote}>“{wedding.hero.quote}”</p><div className={styles.floral} aria-hidden="true"><Image src="/images/events/fabiola-y-cesar/floral.webp" alt="" width={1536} height={1024} sizes="(max-width:700px) 90vw,420px"/></div><p>{wedding.couple.partner1}<br/>&amp;<br/>{wedding.couple.partner2}</p></Reveal></section>
   <section className={`${styles.section} ${styles.verse}`}><Reveal><Heart size={24} strokeWidth={1}/><p>{wedding.verse.text}</p><span>{wedding.verse.reference}</span></Reveal></section>
   <section className={styles.section}><Reveal><span className={styles.kicker}>Con la bendición de Dios</span><h2>Y de nuestros padres</h2><div className={styles.parents}>{[['Papás de la novia',wedding.family.brideParents],['Papás del novio',wedding.family.groomParents]].map(([label,names])=><article key={label}><h3>{label}</h3>{names.map(name=><p key={name}>{name}</p>)}</article>)}</div></Reveal></section>
   <section className={`${styles.section} ${styles.sageSection}`}><Reveal><span className={styles.kicker}>El gran día está cerca</span><h2>Nos vemos en…</h2><Countdown date={wedding.date}/></Reveal></section>
   <section className={styles.section}><Reveal><span className={styles.kicker}>Nuestra celebración</span><h2>Acompáñanos</h2></Reveal><div className={styles.venues}>{[wedding.ceremony,wedding.reception].map((place,i)=><Reveal key={place.name}><article><span className={styles.kicker}>{i===0?'Ceremonia religiosa':'Recepción'}</span><Image src={place.illustration} alt={i===0?'Ilustración de una iglesia en verde y dorado':'Ilustración de un rancho y jardín en verde y dorado'} width={560} height={400} sizes="(max-width:700px) 90vw,450px"/><div className={styles.venueDetails}><strong>{place.time}</strong><h3>{place.name}</h3></div><a className={styles.button} href={place.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>Ver ubicación</a></article></Reveal>)}</div></section>
   <section className={`${styles.section} ${styles.itinerary}`}><Reveal><span className={styles.kicker}>Cada momento, contigo</span><h2>Itinerario</h2><ol>{wedding.itinerary.map(item=>{const Icon=icons[item.icon];return <li key={item.time}><span className={styles.timelineIcon}><Icon size={25} strokeWidth={1}/></span><div><time>{item.displayTime}</time><h3>{item.title}</h3></div></li>;})}</ol></Reveal></section>
   {pass?<div className={styles.pass}><PersonalizedPass pass={pass} token={passToken} slug={wedding.slug} messageLabel="Mensaje para Fabiola y César"/></div>:<section className={`${styles.section} ${styles.passIntro}`} id="tu-pase"><Reveal><Heart size={28} strokeWidth={1}/><h2>Tu pase personalizado</h2><p>Hemos reservado un lugar especial para ti. Abre el enlace de tu pase para consultar los lugares asignados y confirmar tu asistencia.</p></Reveal></section>}
   <section className={`${styles.section} ${styles.closing}`}><Reveal><h2>Será una alegría compartir este día contigo</h2><p>Con cariño,</p><p className={styles.signature}>Fabiola y César</p><span>{wedding.dateDisplay}</span></Reveal></section>
  </main>}
  {opened&&<button className={styles.music} onClick={toggleMusic} aria-label={playing?'Pausar música':'Reproducir música'}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>{musicError?'Toca para reintentar':wedding.music.label}</span></button>}
 </div>;
}
