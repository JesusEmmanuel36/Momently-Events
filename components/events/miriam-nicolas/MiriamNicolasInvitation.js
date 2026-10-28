"use client";
import Image from 'next/image';
import {PersonalizedPass} from '@/components/events/alejandra-david/passes/PersonalizedPass';
import {useRef,useState} from 'react';
import {Cake,CalendarDays,ChevronDown,Heart,MapPin,MessageCircle,Mic,Music,Pause,Play,Shirt,Utensils} from 'lucide-react';
import {TraditionalIntro} from '@/components/events/shared/TraditionalCover';
import {WelcomeSection} from '@/components/sections/IntroHero';
import {CountdownSection} from '@/components/sections/CountdownStory';
import {GallerySection} from '@/components/sections/Gallery';
import {GiftRegistrySection,SongSection} from '@/components/sections/GuestActions';
import {Reveal,SectionHeading} from '@/components/ui';
import {openGoogleCalendar} from '@/lib/calendar';
import styles from './MiriamNicolas.module.css';
const assets='/images/events/miriam-y-nicolas';
const icons={speech:Mic,arrival:MapPin,meal:Utensils,dance:Music,cake:Cake};
export function MiriamNicolasInvitation({wedding,pass=null,passToken=null}){
 const[opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[musicError,setMusicError]=useState(false);const audio=useRef(null);
 const view={...wedding,isLive:true,eventId:wedding.slug};
 const play=()=>audio.current?.play().catch(()=>setMusicError(true));
 const open=()=>{if(opening)return;setOpening(true);play()};
 const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'})};
 const whatsapp=wedding.whatsapp+'?text='+encodeURIComponent('Hola, Miriam y Nicolás. Quiero confirmar mi asistencia a su boda del 15 de enero de 2027.');
 return <div className={styles.invitation}>
 <audio ref={audio} src={wedding.music.src} preload="none" loop onPlay={()=>{setPlaying(true);setMusicError(false)}} onPause={()=>setPlaying(false)} onError={()=>setMusicError(true)}/>
 {!opened?<TraditionalIntro image={wedding.images.hero} assets={assets} names={['Miriam','Nicolás']} subtitle="Nuestra boda" date={wedding.dateLong} opening={opening} onOpen={open} onOpened={finish} {...wedding.envelopeLayout}/>:<main>
 <section className={`hero ${styles.hero}`} id="inicio"><div className="hero__image"><Image src={wedding.images.hero} fill priority sizes="100vw" alt="Miriam y Nicolás junto al mar al atardecer" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Miriam</span><i>&amp;</i><span>Nicolás</span></h1><div className="hero__rule"><span/>{wedding.dateDisplay}<span/></div><p>{wedding.heroQuote}</p></Reveal><a className="hero__scroll" href="#bienvenida" aria-label="Descubrir nuestra invitación"><ChevronDown/></a></section>
 <WelcomeSection wedding={view}/>
 <Reveal className={styles.floral}><Image src={`${assets}/floral.webp`} width={1774} height={887} sizes="(max-width:700px) 92vw,580px" alt="Rosas marfil, flores beige y hojas doradas y café" unoptimized/></Reveal>
 <section className={styles.verse}><Reveal><p>“{wedding.verses[0].text}”</p><span>{wedding.verses[0].reference}</span></Reveal></section>
 <CountdownSection wedding={view}/>
 <GallerySection wedding={view} heading={{eyebrow:'Nuestros momentos',title:'Donde vive el amor',copy:'Recuerdos que queremos compartir contigo.'}} fixedOverlay imageSizes="(max-width:700px) 45vw,33vw"/>
 <section className={`section ${styles.venues}`} id="detalles"><Reveal><SectionHeading eyebrow="Acompáñanos a celebrar" title="El día de nuestra boda"/></Reveal><div className={styles.venueGrid}>{[wedding.ceremony,wedding.reception].map((place,index)=><Reveal className={styles.venue} key={place.label}>{index===0?<Mic size={32} strokeWidth={1}/>:<MapPin size={32} strokeWidth={1}/>}<span className="eyebrow">{place.label}</span><h2>{place.name}</h2><strong>{place.time}</strong><p>{place.address}</p><a className="button" href={place.mapsUrl} target="_blank" rel="noopener noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal>)}</div></section>
 <section className={`section ${styles.itinerary}`} id="itinerario"><Reveal><SectionHeading eyebrow="El gran día" title="Itinerario" copy="Cada momento fue pensado para compartirlo contigo."/></Reveal><ol>{wedding.itinerary.map(item=>{const Icon=icons[item.icon];return <li key={item.time}><Reveal className={styles.timelineRow}><time>{item.time}</time><span><Icon size={30} strokeWidth={1.2}/></span><h3>{item.title}</h3></Reveal></li>})}</ol></section>
 <section className={`section ${styles.dress}`}><Reveal><Shirt size={32} strokeWidth={1}/><SectionHeading eyebrow="Código de vestimenta" title="Un detalle especial"/><p>{wedding.dressCode.note}</p></Reveal></section>
 <Reveal className={styles.floral}><Image src={`${assets}/floral-swag.webp`} width={1774} height={887} sizes="(max-width:700px) 92vw,580px" alt="" unoptimized/></Reveal>
 <GiftRegistrySection wedding={view}/>
 <section className="calendar"><Reveal><CalendarDays size={32} strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.dateLong}</h2><p>No queremos celebrar este momento sin ti.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,durationHours:8,location:wedding.ceremony.name+', '+wedding.ceremony.address,details:'Discurso 3:00 p. m. · Recepción 4:00 p. m. '+wedding.reception.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
 <section className={`section ${styles.confirmation}`} id="confirmar"><Reveal><MessageCircle size={32} strokeWidth={1}/><SectionHeading eyebrow="Nos encantará verte" title="Confirma tu asistencia" copy="Será una alegría compartir este día contigo. Confírmanos directamente por WhatsApp."/><a className="button" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar por WhatsApp</a><p>{wedding.phone}</p></Reveal></section>
 {pass?<div className={styles.passSection}><PersonalizedPass pass={pass} token={passToken} slug={wedding.slug}/></div>:<section className={styles.passNotice} id="tu-pase"><Reveal><Heart size={30} strokeWidth={1}/><h2>Tu pase personalizado</h2><p>Abre el enlace personal que te compartimos para consultar tu nombre, los lugares reservados y confirmar tu asistencia.</p></Reveal></section>}
 <SongSection wedding={view}/>
 <section className={styles.verse}><Reveal><Image className={styles.bouquet} src={`${assets}/floral-bouquet.webp`} width={1024} height={1536} sizes="260px" alt="" unoptimized/><p>“{wedding.verses[1].text}”</p><span>{wedding.verses[1].reference}</span></Reveal></section>
 <section className="closing"><Image src={wedding.images.hero} fill sizes="100vw" alt="Miriam y Nicolás" className="cover"/><div className="closing__overlay"/><Reveal><Heart size={28} strokeWidth={1}/><span className="script">Gracias por formar parte</span><h2>de nuestra historia.</h2><p>Miriam <i>&amp;</i> Nicolás</p><small>{wedding.dateLong}</small></Reveal></section>
 </main>}
 {opened&&<button type="button" className="music-player" onClick={()=>playing?audio.current?.pause():play()} aria-label={playing?'Pausar música':'Reproducir música'}><span>{playing?<Pause/>:<Play/>}</span><span><small>{musicError?'Toca para reintentar':playing?'Reproduciendo':'Escuchar'}</small>{wedding.music.label}</span></button>}
 <footer><span>Invitación creada con <Heart size={12} fill="currentColor"/> por</span><strong>Momently Events</strong></footer>
 </div>;
}
