"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronDown, Gift, Heart, Mail, MapPin, MessageCircle, Shirt } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { CountdownSection } from "@/components/sections/CountdownStory";
import { GallerySection } from "@/components/sections/Gallery";
import { openGoogleCalendar } from "@/lib/calendar";
import styles from "./MontserratAndrei.module.css";
const assets = "/images/events/montserrat-y-andrei";

function Embroidery({ name, className = "", alt = "" }) {
  return <Image src={`${assets}/${name}.png`} width={1536} height={1024} sizes="(max-width:700px) 85vw, 550px" alt={alt} aria-hidden={!alt} className={`${styles.embroidery} ${className}`}/>;
}

function DressCatalogue({ wedding }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("women");
  const tabs = ["women", "men"];
  function navigateTab(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "women" : event.key === "End" ? "men" : tabs[(tabs.indexOf(tab) + 1) % 2];
    setTab(next);
    document.getElementById(`dress-tab-${next}`)?.focus();
  }
  return <section className={styles.dressSection} id="vestimenta"><Reveal>
    <div className={styles.dressCard}>
      <Shirt className={styles.dressIcon} strokeWidth={1}/>
      <span className="eyebrow">Código de vestimenta</span>
      <h2>{wedding.dressCode.title}</h2>
      <div className={styles.dressBrief}><p><strong>Caballeros</strong>{wedding.dressCode.men}</p><p><strong>Damas</strong>{wedding.dressCode.women}</p></div>
      <button className={styles.catalogueToggle} aria-expanded={expanded} aria-controls="dress-catalogue" onClick={() => setExpanded(value => !value)}>
        <span>Ver catálogo de inspiración</span><ChevronDown className={expanded ? styles.chevronUp : ""} size={20}/>
      </button>
      <div id="dress-catalogue" className={`${styles.accordion} ${expanded ? styles.accordionOpen : ""}`} inert={!expanded} aria-hidden={!expanded}>
        <div className={styles.accordionInner}>
          <div className={styles.catalogueContent}>
            <div role="tablist" aria-label="Inspiración de vestimenta" className={styles.tabs}>
              {tabs.map(key => <button key={key} id={`dress-tab-${key}`} role="tab" type="button" aria-selected={tab === key} aria-controls={`dress-panel-${key}`} tabIndex={tab === key ? 0 : -1} className={tab === key ? styles.activeTab : ""} onClick={() => setTab(key)} onKeyDown={navigateTab}>{key === "women" ? "Damas" : "Caballeros"}</button>)}
            </div>
            {tabs.map(key => <div key={key} id={`dress-panel-${key}`} role="tabpanel" tabIndex={0} aria-labelledby={`dress-tab-${key}`} hidden={tab !== key}>
              <div className={styles.outfitGallery}>{wedding.dressInspiration[key].map((outfit, index) => <figure key={outfit.src} className={index === 0 ? styles.featuredOutfit : ""}><Image src={outfit.src} width={outfit.width} height={outfit.height} sizes="(max-width:700px) 85vw, 600px" alt={outfit.title}/><figcaption>{outfit.title}</figcaption></figure>)}</div>
              {key === "men" && <p className={styles.outfitTip}>Completa tu atuendo con calzado formal.</p>}
            </div>)}
            <aside className={styles.dressNotice}><span>Un detalle importante</span><p>{wedding.dressCode.notice}</p></aside>
          </div>
        </div>
      </div>
    </div>
    <p className={styles.reservedNote}>Blanco, beige y dorado: reservados para los novios. Les agradecemos evitar ternos y jeans.</p>
  </Reveal></section>;
}

export function MontserratAndreiInvitation({ wedding }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function open() {
    if (opening) return;
    setOpening(true);
    timer.current = setTimeout(() => { setOpened(true); window.scrollTo({top:0,behavior:"instant"}); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 4600);
  }
  const view = {...wedding, couple:{bride:"Montserrat",groom:"Blair Andrei"},images:{gallery:wedding.gallery.map(photo => photo.src)},galleryItems:wedding.gallery};
  return <div className={styles.invitation}>
    {!opened && <div className={`${styles.intro} ${opening ? styles.opening : ""}`}>
      <div className={styles.introHeading}><span className="eyebrow">Un amor que se entrelaza</span><h1>Montserrat <i>&amp;</i> Blair Andrei</h1><p>{wedding.dateDisplay}</p></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={styles.letter}><span>Nuestra boda</span><h2>Montserrat<br/><i>&amp;</i> Blair Andrei</h2><small>{wedding.dateStamp}</small><Heart size={17} strokeWidth={1}/></div>
        <div className={`${styles.openEnvelopeLayer} ${styles.openBack}`}><Image src={`${assets}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt="Sobre abierto con flores bordadas"/></div>
        <div className={`${styles.openEnvelopeLayer} ${styles.openFront}`} aria-hidden="true"><Image src={`${assets}/envelope-open.png`} width={1536} height={1024} priority sizes="(max-width:700px) 98vw,720px" className={styles.openEnvelopeArtwork} alt=""/></div>
        <Image src={`${assets}/envelope-closed.png`} fill priority sizes="(max-width:700px) 98vw,720px" className={styles.closedEnvelope} alt="Sobre de lino marfil con bordado yucateco de rosas y sello M y B"/>
        <button className={styles.sealButton} aria-label="Abrir invitación de Montserrat y Blair Andrei" onClick={open} disabled={opening}/>
      </div><button className={styles.openButton} onClick={open} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}<ArrowDown size={16}/></button></div>
    </div>}
    <main className={`${styles.main} ${opened ? styles.revealed : styles.locked}`}>
      <section className={styles.hero} id="inicio"><div className={styles.heroPortrait}><Image src={wedding.hero.image} fill priority sizes="(max-width:750px) 100vw,50vw" alt="Montserrat y Blair Andrei juntos"/></div><div className={styles.heroCopy}><Reveal><span className="eyebrow">Nuestra boda</span><h1>Montserrat <i>&amp;</i> Blair Andrei</h1><div className={styles.dateDivider}><span/><Heart size={14}/><span/></div><p>{wedding.dateDisplay}</p><a href="#bienvenida" aria-label="Descubrir nuestra invitación"><ArrowDown size={20}/></a></Reveal></div></section>
      <section className={styles.welcome} id="bienvenida"><Reveal><Embroidery name="rosa-bordada" className={styles.roseMotif}/><span className="eyebrow">El comienzo de una nueva historia</span><h2>Entre hilos de amor</h2><p>{wedding.hero.quote}</p><div className={styles.fullNames}><span>{wedding.couple.partner1}</span><i>&amp;</i><span>{wedding.couple.partner2}</span></div></Reveal></section>
      <section className={styles.countdownWrap}><Embroidery name="aves-bordadas" className={styles.birdsMotif}/><CountdownSection wedding={wedding}/></section>
      <section className={styles.venue}><Reveal><Embroidery name="cenefa-bordada" className={styles.borderMotif}/><MapPin className={styles.sectionIcon} strokeWidth={1}/><SectionHeading eyebrow="Celebremos juntos" title={wedding.reception.name}/><p className={styles.venueTime}>{wedding.reception.time}</p><p className={styles.venueAddress}>{wedding.reception.address}</p><a className="button" href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación<ArrowUpRight size={16}/></a></Reveal></section>
      <DressCatalogue wedding={wedding}/>
      <Reveal><Embroidery name="floral" className={styles.floralArrangement}/></Reveal>
      <GallerySection wedding={view} heading={{eyebrow:"Nuestra historia",title:"Recuerdos que nos unen",copy:"Pequeños momentos que se han convertido en nuestros recuerdos favoritos."}}/>
      <section className={styles.gifts}><Reveal><Embroidery name="corazon-bordado" className={styles.heartMotif}/><SectionHeading eyebrow="Mesa de regalos" title="Su compañía es nuestro mejor regalo" copy={wedding.gifts[0].description}/><div className={styles.giftOptions}><div><Mail strokeWidth={1}/><h3>Lluvia de sobres</h3><p>Un detalle que recibiremos con mucho cariño.</p></div><div><Gift strokeWidth={1}/><h3>Liverpool</h3><p>Mesa de regalos · {wedding.gifts[1].number}</p><a className="button" href={wedding.gifts[1].url} target="_blank" rel="noreferrer">Ver mesa de regalos<ArrowUpRight size={16}/></a></div></div></Reveal></section>
      <section className={styles.calendar}><Reveal><CalendarDays className={styles.sectionIcon} strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.calendarDate}</h2><button className="button" onClick={() => openGoogleCalendar({title:wedding.eventTitle,start:wedding.date,location:wedding.reception.address,details:`Recepción a las 2:00 p. m. en ${wedding.reception.name}. ${wedding.reception.mapsUrl}`})}><Check size={16}/>Guardar en mi calendario</button></Reveal></section>
      <section className={styles.confirmation}><Reveal><MessageCircle className={styles.sectionIcon} strokeWidth={1}/><SectionHeading eyebrow="Confirma tu asistencia" title="¿Nos acompañas?" copy="Nos hará muy felices celebrar este día contigo. Confirma tu asistencia por WhatsApp."/><a className="button" href={`https://wa.me/52${wedding.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero confirmar mi asistencia a la boda de Montserrat y Blair Andrei el 16 de enero de 2027.")}`} target="_blank" rel="noreferrer">Confirmar por WhatsApp</a></Reveal></section>
      <footer className={styles.closing}><Embroidery name="cenefa-bordada" className={styles.borderMotif}/><span className="eyebrow">Gracias por ser parte de nuestra historia</span><h2>Montserrat <i>&amp;</i> Blair Andrei</h2><p>{wedding.dateDisplay}</p><small>Con todo nuestro cariño</small></footer>
    </main>
  </div>;
}
