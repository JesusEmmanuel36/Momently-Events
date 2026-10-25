"use client";
import Image from 'next/image';
import {useRef,useState} from 'react';
import {CalendarDays,ChevronDown,Heart,MapPin,Pause,Play} from 'lucide-react';
import {TraditionalIntro} from '@/components/events/shared/TraditionalCover';
import {WelcomeSection} from '@/components/sections/IntroHero';
import {CountdownSection} from '@/components/sections/CountdownStory';
import {GallerySection} from '@/components/sections/Gallery';
import {GiftRegistrySection,RSVPSection} from '@/components/sections/GuestActions';
import {Reveal,SectionHeading} from '@/components/ui';
import {openGoogleCalendar} from '@/lib/calendar';
import {ItineraryIcon} from './ItineraryIcon';
import styles from './LizEduardo.module.css';
const assets='/images/events/liz-y-eduardo';
export function LizEduardoInvitation({wedding}){
 const[opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[playing,setPlaying]=useState(false),[audioError,setAudioError]=useState(false);const audio=useRef(null);
 const view={...wedding,isLive:true,eventId:wedding.slug,rsvpMessageLabel:'Mensaje para Liz y Eduardo'};
 const play=()=>audio.current?.play().catch(()=>setAudioError(true));const open=()=>{if(opening)return;setOpening(true);play()};const finish=()=>{setOpened(true);window.scrollTo({top:0,behavior:'instant'})};
 return <div className={styles.invitation}><audio ref={audio} src={wedding.music.src} preload="none" loop onPlay={()=>{setPlaying(true);setAudioError(false)}} onPause={()=>setPlaying(false)} onError={()=>setAudioError(true)}/>
 {!opened?<TraditionalIntro image={wedding.images.hero} assets={assets} names={['Liz','Eduardo']} subtitle="Nuestra boda" date={wedding.dateDisplay} opening={opening} onOpen={open} onOpened={finish} {...wedding.envelopeLayout}/>:<main>
 <section className={`hero ${styles.hero}`} id="inicio"><div className="hero__image"><Image src={wedding.images.hero} fill priority sizes="100vw" alt="Liz y Eduardo compartiendo una cena" className="cover"/></div><div className="hero__wash"/><Reveal className="hero__copy"><span className="eyebrow">Nuestra boda</span><h1><span>Liz</span><i>&amp;</i><span>Eduardo</span></h1><div className="hero__rule"><span/>{wedding.dateDisplay}<span/></div><p>{wedding.heroQuote}</p></Reveal><a className="hero__scroll" href="#bienvenida" aria-label="Continuar a la invitación"><ChevronDown/></a></section>
 <WelcomeSection wedding={view}/><CountdownSection wedding={view}/>
 <GallerySection wedding={view} heading={{eyebrow:'Nuestros momentos',title:'Donde vive el amor',copy:'Recuerdos que queremos compartir contigo.'}} imageSizes="(max-width:700px) 90vw,45vw" fixedOverlay/>
 <section className={styles.memory}><Reveal><span className="eyebrow">Recuerdos que nos acompañan</span><h2>Un recuerdo especial</h2><div><Image src={wedding.memory.src} width={wedding.memory.width} height={wedding.memory.height} sizes="(max-width:700px) 85vw,400px" alt={wedding.memory.alt}/></div></Reveal></section>
 <section className={styles.location} id="detalles"><div className={styles.locationArt}><Image src={`${assets}/floral.webp`} width={1774} height={887} sizes="(max-width:700px) 95vw,600px" unoptimized alt="Rosas marfil y champagne con follaje verde olivo"/></div><Reveal><span className="eyebrow">La celebración</span><MapPin strokeWidth={1.2} size={34}/><h2>{wedding.reception.name}</h2><strong>{wedding.reception.time}</strong><p>{wedding.dateLong}</p><p>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noopener noreferrer">Ver ubicación <MapPin size={16}/></a></Reveal></section>
 <section className={`section ${styles.itinerary}`} id="itinerario"><Reveal><SectionHeading eyebrow="El gran día" title="Itinerario de nuestra boda" copy="Cada momento fue pensado para compartirlo contigo."/></Reveal><ol>{wedding.itinerary.map(item=><li key={item.time}><Reveal className={styles.timelineRow}><time>{item.displayTime}</time><span className={styles.timelineDot} aria-hidden="true"/><span className={styles.timelineIcon}><ItineraryIcon name={item.icon}/></span><div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</div></Reveal></li>)}</ol><Reveal><p className={styles.thanks}>Gracias por ser parte<br/>de este momento tan especial.</p></Reveal></section>
 <section className={`dress ${styles.dress}`}><div className="dress__panel"><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} light/><p className="dress__note">{wedding.dressCode.note}</p></Reveal><Reveal className={styles.swatches}>{wedding.dressCode.colors.map(color=><span key={color.name}><i style={{background:color.color}} title={color.name}/><small>{color.name}</small></span>)}</Reveal></div></section>
 <GiftRegistrySection wedding={view}/>
 <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.dateDisplay}</h2><p>No queremos celebrar este momento sin ti.</p><button className="button button--ivory" onClick={()=>openGoogleCalendar({title:'Boda de Liz y Eduardo',start:wedding.date,end:wedding.endDate,location:wedding.reception.name+', '+wedding.reception.address,details:'Recepción a las 5:30 p. m. '+wedding.reception.mapsUrl})}>Agregar a mi calendario</button></Reveal></section>
 <RSVPSection wedding={view}/>
 <section className="closing"><Image src={wedding.images.hero} fill sizes="100vw" alt="Liz y Eduardo" className="cover"/><div className="closing__overlay"/><Reveal><Heart strokeWidth={1}/><span className="script">Gracias por formar parte</span><h2>de nuestra historia.</h2><p>Liz <i>&amp;</i> Eduardo</p><small>{wedding.dateDisplay}</small></Reveal></section>
 </main>}{opened&&<button className="music-player" type="button" onClick={()=>playing?audio.current?.pause():play()} aria-label={playing?'Pausar música':'Reproducir música'}><span>{playing?<Pause/>:<Play/>}</span><span><small>{audioError?'Toca para reintentar':playing?'Reproduciendo':'Escuchar'}</small>{wedding.music.label}</span></button>}<footer><span>Invitación creada con <Heart size={12} fill="currentColor"/> por</span><strong>Momently Events</strong></footer></div>;
}
