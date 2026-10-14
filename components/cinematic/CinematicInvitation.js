'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { FrameZoomScene, CoupleScene } from './Scenes';
import { EventDetailsScene, FinalCTASection } from './EventDetails';
import styles from './Cinematic.module.css';

export function CinematicInvitation({ config }) {
  const root=useRef(null);const audio=useRef(null);const [playing,setPlaying]=useState(false);const [audioError,setAudioError]=useState('');
  useEffect(()=>{
    let alive=true;let cleanup;
    import('@/lib/animation/cinematic-timeline').then(({mountCinematicTimeline})=>{if(alive&&root.current)cleanup=mountCinematicTimeline(root.current,config);});
    return ()=>{alive=false;cleanup?.();};
  },[config]);
  async function toggleMusic(){if(!audio.current)return;setAudioError('');if(!audio.current.paused){audio.current.pause();return;}try{await audio.current.play();}catch{setAudioError('No fue posible reproducir la música. Intenta nuevamente.');}}
  return <main ref={root} className={styles.cinematic} data-motion="static" style={{'--cinema-ivory':config.theme.ivory,'--cinema-coffee':config.theme.coffee,'--cinema-champagne':config.theme.champagne}}><a className={styles.skipLink} href="#celebracion">Saltar a los detalles</a><div data-track className={styles.track}><div className={styles.stage}><div className={styles.ambientBar}><span>MOMENTLY <i>cinema</i></span><a href="#celebracion">El gran día <ArrowDown size={13}/></a></div>{config.scenes.map(scene=>scene.type==='frameZoom' ? <FrameZoomScene key={scene.id} scene={scene} portrait={config.scenes[1]} frame={config.frame} frameMobile={config.frameMobile}/> : <CoupleScene key={scene.id} scene={scene}/>)}<div className={styles.progress}><span data-chapter-label>{config.scenes[0].chapter}</span><div><i/></div><small>Una historia de amor</small></div></div></div><EventDetailsScene config={config}/><FinalCTASection config={config}/><audio ref={audio} src={config.music.url} preload="none" loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setPlaying(false);setAudioError('La música no está disponible.');}}/><button className={styles.music} onClick={toggleMusic} aria-label={playing?'Pausar música':'Escuchar música'}>{playing?<Volume2 size={16}/>:<VolumeX size={16}/>}<span>{playing?'Con música':'Añadir música'}</span></button>{audioError&&<p className={styles.audioError} role="status">{audioError}</p>}</main>;
}
