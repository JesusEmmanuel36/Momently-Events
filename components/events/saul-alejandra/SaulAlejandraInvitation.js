"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Church,GlassWater,Heart,Mail,MapPin,Music,Pause,Play,Utensils} from "lucide-react";
import {TraditionalIntro,TraditionalHero} from "@/components/events/shared/TraditionalCover";
import {RSVPSection} from "@/components/sections/GuestActions";
import {Reveal} from "@/components/ui";
import styles from "./SaulAlejandra.module.css";
const assets="/images/events/saul-y-alejandra";
const icons={church:Church,toast:GlassWater,heart:Heart,food:Utensils,music:Music};
function Countdown({date}){const [left,setLeft]=useState(null);useEffect(()=>{const tick=()=>setLeft(Math.max(0,new Date(date).getTime()-Date.now()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer)},[date]);const seconds=Math.floor((left||0)/1000);return <div className={styles.countdown}>{[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60].map((value,i)=><div key={i}><strong>{left===null?'—':String(value).padStart(2,'0')}</strong><span>{['Días','Horas','Minutos','Segundos'][i]}</span></div>)}</div>}
export function SaulAlejandraInvitation({event}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[musicError,setMusicError]=useState(false);const audio=useRef(null);
 const playMusic=()=>audio.current?.play().catch(()=>setMusicError(true));
 const open=()=>{if(opening)return;setOpening(true);playMusic()};const toggleMusic=()=>{if(playing)audio.current?.pause();else playMusic()};const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'})};
 const rsvp={isLive:true,eventId:event.slug,slug:event.slug,couple:{bride:'Alejandra',groom:'Saúl'},rsvpTitle:'¿Nos acompañas?',rsvpMessageLabel:'Mensaje para los novios',rsvpSettings:{askCompanions:false,maxCompanions:0,askMenuPreference:false,askAllergies:false,askMessage:true,askSongSuggestion:false}};
 return <div className={styles.invitation}>{event.music.enabled&&<audio ref={audio} src={event.music.url} preload="auto" loop onPlay={()=>{setPlaying(true);setMusicError(false)}} onPause={()=>setPlaying(false)} onError={()=>setMusicError(true)}/>}
 {!opened?<TraditionalIntro image={event.hero.image} assets={assets} names={["Saúl","Alejandra"]} subtitle={event.hero.subtitle} date={event.dateDisplay} opening={opening} onOpen={open} onOpened={finish} openWidth={113} openBottom={9} sealTop={55}/>:<main>
 <TraditionalHero image={event.hero.image} assets={assets} names={["Saúl","Alejandra"]} subtitle={event.hero.subtitle} date={event.dateDisplay} href="#bienvenida" light/>
 <section className={styles.section} id="bienvenida"><Reveal><Heart size={30} strokeWidth={1}/><span className={styles.kicker}>Con todo nuestro amor</span><h2>Un día para recordar</h2><p>{event.hero.quote}</p><Image src={`${assets}/floral.webp`} width={1536} height={1024} sizes="(max-width:700px) 90vw,500px" alt="Rosas marfil y ramas de olivo" className={styles.floral} unoptimized/></Reveal></section>
 <section className={`${styles.section} ${styles.dateSection}`}><Reveal><span className={styles.kicker}>Cada vez falta menos</span><h2>Para nuestro gran día</h2><p>{event.dateDisplay}</p><Countdown date={event.date}/></Reveal></section>
 <section className={styles.section}><Reveal><span className={styles.kicker}>Acompáñanos</span><h2>Nuestra celebración</h2></Reveal><div className={styles.venues}>{[[event.ceremony,'Ceremonia',Church],[event.reception,'Recepción y comida',Utensils]].map(([place,label,Icon])=><Reveal key={label}><article><Icon size={38} strokeWidth={1}/><span className={styles.kicker}>{label}</span><h3>{place.name}</h3><strong>{place.time}</strong><p>{place.address}</p>{place.mapsUrl&&<a className={styles.button} href={place.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>Ver ubicación</a>}</article></Reveal>)}</div></section>
 <section className={`${styles.section} ${styles.itinerary}`}><Reveal><span className={styles.kicker}>Cada momento, contigo</span><h2>Así celebraremos</h2><ol>{event.itinerary.map(item=>{const Icon=icons[item.icon];return <li key={item.time}><span className={styles.timelineIcon}><Icon size={26} strokeWidth={1}/></span><div><time>{item.displayTime}</time><h3>{item.title}</h3></div></li>})}</ol></Reveal></section>
 <section className={styles.section}><Reveal><Utensils size={32} strokeWidth={1}/><span className={styles.kicker}>{event.meal.title}</span><h2>{event.meal.time}</h2><p>{event.meal.text}</p></Reveal></section>
 <section className={`${styles.section} ${styles.soft}`}><Reveal><Mail size={32} strokeWidth={1}/><span className={styles.kicker}>Un detalle con cariño</span><h2>Mesa de regalos</h2><p>{event.gifts[0].description}</p></Reveal></section>

 <div className={styles.rsvp}><RSVPSection wedding={rsvp}/></div>
 <section className={`${styles.section} ${styles.closing}`}><Reveal><Image src={`${assets}/floral.webp`} width={1536} height={1024} alt="" sizes="(max-width:700px) 85vw,420px" className={styles.floral} unoptimized/><h2>Gracias por ser parte<br/>de nuestra historia</h2><p>Con cariño,</p><span className={styles.signature}>Saúl &amp; Alejandra</span><p>{event.dateDisplay}</p></Reveal></section>
 </main>}{opened&&event.music.enabled&&<button type="button" className={styles.music} onClick={toggleMusic} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{musicError?"Toca para reintentar":event.music.label}</span></button>}</div>
}
