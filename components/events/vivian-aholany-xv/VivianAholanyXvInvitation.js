"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Church,MapPin,Pause,Play,ChevronDown} from "lucide-react";
import {CountdownSection} from "@/components/sections/CountdownStory";
import {RSVPSection} from "@/components/sections/GuestActions";
import styles from "./VivianAholanyXv.module.css";
export function VivianAholanyXvInvitation({wedding}){
 const audio=useRef(null);const [opened,setOpened]=useState(false);const [playing,setPlaying]=useState(false);
 useEffect(()=>{if(playing&&"mediaSession" in navigator&&window.MediaMetadata)navigator.mediaSession.metadata=new window.MediaMetadata({title:"Perfect",artist:"Ed Sheeran",album:"Vivian Aholany · Mis XV años"});},[playing]);
 const toggle=()=>{if(audio.current.paused)audio.current.play().catch(()=>setPlaying(false));else audio.current.pause();};
 const open=()=>{setOpened(true);audio.current?.play().catch(()=>setPlaying(false));};
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.url} preload="auto" loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
 <header className={styles.hero}><Image unoptimized src={wedding.hero.image} fill priority sizes="100vw" alt="Joven de espaldas con vestido rosa y dorado, corona y mariposas luminosas"/><div className={styles.shade}/><div className={styles.heroCopy}><span>Mis XV años</span><h1>Vivian <br/>Aholany</h1><p>{wedding.dateDisplay}</p>{!opened?<button onClick={open} aria-label="Abrir invitación de Vivian Aholany">Abrir invitación <ChevronDown size={16}/></button>:<a href="#celebracion">Te espero <ChevronDown size={18}/></a>}</div></header>
 {opened&&<main id="celebracion"><section className={styles.family}><h2>Un día muy especial</h2><p>{wedding.hero.quote}</p><div className={styles.familyGrid}><div><h3>Mi mamá</h3><p>{wedding.family.mother}</p></div><div><h3>Mis padrinos</h3>{wedding.family.godparents.map(name=><p key={name}>{name}</p>)}</div></div></section>
 <CountdownSection wedding={wedding}/>
 <section className={styles.venues} aria-label="Lugares y horarios">{[wedding.ceremony,wedding.reception].map((place,index)=><article key={place.name}>{index===0?<Church size={30} strokeWidth={1}/>:<MapPin size={30} strokeWidth={1}/>}<span>{index===0?"Misa":"Recepción"}</span><strong>{place.time}</strong><h2>{place.name}</h2>{place.note&&<p>{place.note}</p>}<p>{place.address}</p></article>)}</section>
 {wedding.rsvpEnabled&&<RSVPSection wedding={{...wedding,isLive:true,eventId:wedding.slug,couple:{bride:"Vivian Aholany",groom:""},rsvpSettings:{maxCompanions:0,askCompanions:false,askMenuPreference:false,askAllergies:false,askMessage:false,askSongSuggestion:false}}}/>}
 <footer className={styles.footer}>¡Gracias por celebrar conmigo!</footer></main>}
 {opened&&<button className={styles.music} onClick={toggle} aria-label={playing?"Pausar música":"Reproducir música"}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>Perfect · Ed Sheeran</span></button>}
 </div>;
}
