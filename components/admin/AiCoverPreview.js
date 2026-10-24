"use client";
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import styles from './AiCoverPreview.module.css';

export function AiCoverPreview({document,imageUrl,musicUrl='',closedUrl,openUrl,title,subtitle,date,layout,desktop=false,interactive=false,publicMode=false,onOpened}){
 const[phase,setPhase]=useState('closed'),[loaded,setLoaded]=useState({closed:false,open:false}),[failed,setFailed]=useState(false);
 const frameRef=useRef(null);const[frameHeight,setFrameHeight]=useState(844);
 useEffect(()=>{if(!publicMode)return;const receive=event=>{if(event.source!==frameRef.current?.contentWindow)return;if(event.data?.type==='momently:height'){const height=Number(event.data.height);if(Number.isFinite(height)&&height>0&&height<=100000)setFrameHeight(height)}if(event.data?.type==='momently:confirm')window.document.getElementById('ai-confirmation')?.scrollIntoView({behavior:'smooth'})};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[publicMode]);
 useEffect(()=>{if(phase==='cover'||!closedUrl)onOpened?.()},[phase,closedUrl,onOpened]);
 const audioRef=useRef(null);
 const[playing,setPlaying]=useState(false),[audioError,setAudioError]=useState('');
 const playMusic=()=>{if(!audioRef.current)return;setAudioError('');audioRef.current.play().catch(()=>setAudioError('Pulsa reproducir para escuchar la música.'))};
 const hasEnvelope=Boolean(closedUrl);
 useEffect(()=>{if(phase!=='opening')return;const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?200:4200;const timer=setTimeout(()=>setPhase('cover'),duration);return()=>clearTimeout(timer)},[phase]);
 const open=()=>{if(phase==='closed'&&openUrl&&loaded.closed&&loaded.open&&!failed){setPhase('opening');playMusic()}};
 const ready=Boolean(openUrl&&loaded.closed&&loaded.open&&!failed);
 return <div className={`${styles.viewport} ${publicMode?styles.public:desktop?styles.desktop:styles.mobile}`} data-cover-preview-phase={!hasEnvelope?'cover':phase}>
 {musicUrl&&<><audio key={musicUrl} ref={audioRef} src={musicUrl} preload="none" loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setAudioError('No se pudo cargar el audio. Vuelve a subirlo.')} /><div className={styles.musicControl}><button type="button" onClick={()=>{if(audioRef.current?.paused)playMusic();else audioRef.current?.pause()}}>{playing?'Pausar música':'Reproducir música'}</button>{audioError&&<small role="status">{audioError}</small>}</div></>}
 {hasEnvelope&&phase!=='cover'?<section className={`${styles.intro} ${phase==='opening'?styles.opening:''}`} aria-label="Apertura de la invitación">
 {imageUrl&&<Image src={imageUrl} fill unoptimized priority alt="" aria-hidden="true" className={styles.background}/>}<div className={styles.shade}/>
 <header className={styles.header}><span>{subtitle||'Una invitación especial'}</span><h2>Una invitación para ti</h2></header>
 <div className={styles.scene} data-preview-envelope style={{'--open-width':(layout?.openWidth||100)+'%','--open-offset':(-(layout?.openWidth||100)/2)+'%','--open-bottom':(layout?.openBottom||0)+'%'}}>
 {openUrl&&<div className={`${styles.openLayer} ${styles.back}`}><Image src={openUrl} width={1536} height={1024} className={styles.openImage} unoptimized priority alt="Sobre abierto" onLoad={()=>setLoaded(v=>({...v,open:true}))} onError={()=>setFailed(true)} draggable={false}/></div>}
 <div className={styles.letter} data-preview-letter><span>{subtitle}</span><h3>{title||'Tu celebración'}</h3>{date&&<p>{date}</p>}<small>Con mucho cariño</small></div>
 {openUrl&&<div className={`${styles.openLayer} ${styles.front}`} aria-hidden="true"><Image src={openUrl} width={1536} height={1024} className={styles.openImage} unoptimized priority alt="" draggable={false}/></div>}
 <Image src={closedUrl} width={1536} height={1024} className={styles.closedImage} unoptimized priority alt="Sobre cerrado de la invitación" onLoad={()=>setLoaded(v=>({...v,closed:true}))} onError={()=>setFailed(true)} draggable={false}/>
 <button type="button" className={styles.seal} onClick={open} disabled={!ready||phase!=='closed'} aria-label="Abrir sobre"/>
 </div>
 <div className={styles.action}><button type="button" className={styles.openButton} disabled={!ready||phase!=='closed'} onClick={open}>{phase==='opening'?'Abriendo…':!openUrl?'Falta el sobre abierto':failed?'No se pudo cargar el sobre':ready?'Abrir invitación':'Cargando sobre…'}</button><p role="status">{failed?'Revisa las imágenes generadas y vuelve a repetir la apertura.':!openUrl?'Genera el sobre abierto para ver la secuencia completa.':phase==='opening'?'Preparando tu invitación…':'Toca el sello o el botón para abrir.'}</p></div>
 </section>:document?<iframe ref={frameRef} onLoad={()=>{if(publicMode)frameRef.current?.contentWindow?.postMessage({type:'momently:viewport',height:window.innerHeight},'*')}} style={publicMode?{height:frameHeight}:undefined} className={styles.hero} title="Vista previa de invitación generada con IA" srcDoc={document} sandbox={interactive?"allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox":""} allow={interactive?"clipboard-write":undefined} referrerPolicy="no-referrer"/>:<div className={styles.placeholder}>{publicMode?<h2>Cargando tu invitación…</h2>:<><h2>La invitación aparecerá aquí</h2><p>Genera la invitación para completar la vista previa.</p></>}</div>}
 </div>
}
