"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {MapPin,MessageCircle,Pause,Play,Sparkles} from "lucide-react";
import {TraditionalIntro,TraditionalHero} from "@/components/events/shared/TraditionalCover";
import {Reveal} from "@/components/ui";
import styles from "./EmiFest.module.css";
function PartyCountdown({date}){
 const [remaining,setRemaining]=useState(null);
 useEffect(()=>{const tick=()=>setRemaining(Math.max(0,new Date(date).getTime()-Date.now()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer);},[date]);
 const seconds=Math.floor((remaining||0)/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
 return <div className={styles.countdown} aria-label="Cuenta regresiva para Emi Fest">{['Días','Horas','Minutos','Segundos'].map((label,i)=><div key={label}><strong>{remaining===null?'—':String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>;
}
export function EmiFestInvitation({event}){
 const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[failed,setFailed]=useState(false);const audio=useRef(null);
 const startMusic=()=>{const player=audio.current;if(!player)return;if(player.currentTime<3)player.currentTime=3;player.play().catch(()=>setFailed(true));};
 const open=()=>{if(opening)return;setOpening(true);startMusic();};
 const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'});};
 const toggleMusic=()=>{if(playing)audio.current?.pause();else startMusic();};
 const whatsapp=`https://wa.me/52${event.contact.whatsapp}?text=${encodeURIComponent('Hola, Emiliano. Confirmo mi asistencia a Emi Fest el 8 de noviembre de 2026.')}`;
 return <div className={styles.invitation}>
  <audio ref={audio} src={event.music.url} preload="metadata" loop onLoadedMetadata={()=>{if(audio.current)audio.current.currentTime=3;}} onEnded={()=>{if(audio.current){audio.current.currentTime=3;startMusic();}}} onPlay={()=>{setPlaying(true);setFailed(false);}} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)}/>
  {!opened?<TraditionalIntro image={event.hero.image} assets={"/images/events/xv-emiliano"} names={["Emi Fest"]} subtitle="Te invito a mi party" date={event.dateDisplay} opening={opening} onOpen={open} onOpened={finish} openWidth={109} openBottom={0} sealTop={53} emi letterContent={<h2 className={styles.letterMessage}>Te invito a festejar conmigo mi cumple # 15</h2>}/>:<main>
   <TraditionalHero image={event.hero.image} assets={"/images/events/xv-emiliano"} names={["Emi Fest"]} subtitle="Te invito a mi party" date={event.dateDisplay} href="#la-party"/>
   <section className={styles.welcome} id="la-party"><Reveal><Sparkles size={34} strokeWidth={1}/><span className={styles.kicker}>Una noche, muchos recuerdos</span><h2>La fiesta se pondrá mejor si estás tú</h2><p>{event.hero.quote}</p><span className={styles.signature}>Emiliano</span><Image src="/images/events/xv-emiliano/floral.webp" width={1536} height={1024} sizes="(max-width:700px) 90vw,520px" alt="Arreglo de flores azul marino, marfil y hojas doradas" unoptimized className={styles.floral}/></Reveal></section>
   <section className={styles.countdownSection}><Reveal><span className={styles.kicker}>La cuenta ya empezó</span><h2>Nos vemos en…</h2><PartyCountdown date={event.date}/><p>Domingo 8 de noviembre · 6:00 p. m.</p></Reveal></section>
   <section className={styles.location}><Reveal><MapPin size={36} strokeWidth={1}/><span className={styles.kicker}>Aquí empieza la fiesta</span><h2>{event.reception.name}</h2><p>{event.reception.address}</p><div className={styles.locationDate}><strong>08</strong><div><span>Noviembre de 2026</span><p>Domingo · 6:00 p. m.</p></div></div><a className={styles.outlineButton} href={event.reception.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>Buscar ubicación</a></Reveal></section>
   <section className={styles.confirmation} id="confirmacion"><Reveal><MessageCircle size={34} strokeWidth={1}/><span className={styles.kicker}>Tu lugar en la party</span><h2>¿Te apuntas?</h2><p>Confírmame por WhatsApp. ¡Quiero celebrar contigo!</p><a className={styles.button} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar asistencia</a></Reveal></section>
   <section className={styles.closing}><Reveal><Sparkles size={28} strokeWidth={1}/><h2>Nos vemos este 8 de noviembre…</h2><p>8 de noviembre de 2026 · 6:00 p. m.</p><span>¡NO FALTES!</span></Reveal></section>
  </main>}
  {opened&&<button type="button" className={styles.music} onClick={toggleMusic} aria-label={playing?'Pausar música':'Reproducir música'}>{playing?<Pause size={18}/>:<Play size={18}/>}<span><small>{playing?'Sonando':'Escuchar'}</small>{failed?'Toca para reintentar':event.music.label}</span></button>}
 </div>;
}
