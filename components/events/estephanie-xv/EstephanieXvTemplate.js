"use client";

import NextImage from "next/image";
import { Check, Crown, Mail, Smartphone, Send, Wine, UtensilsCrossed, Music2, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Heart, MapPin, MessageCircle, Pause, Play, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/events/ivan-ernestina/IvanErnestinaInvitation.module.css";
import localStyles from "@/components/events/sara-blase/SaraBlaseInvitation.module.css";
import customStyles from "./EstephanieXv.module.css";
import { openGoogleCalendar } from "@/lib/calendar";

function Image(props) { return <NextImage unoptimized {...props} />; }

const defaultAssets = {
  floral: "/images/events/xv-estephanie/floral.png",
  envelopeClosed: "/images/events/xv-estephanie/envelope-closed.png",
  envelopeOpen: "/images/events/xv-estephanie/envelope-open.png",
};
const defaultTheme = {
  "--coral": "#b7654d", "--peach": "#df9a7e", "--olive": "#73785e", "--dark": "#432d27",
  "--gold": "#b48a4e", "--gold-soft": "#d9bc91", "--paper": "#fffaf4", "--ivory": "#f3e2d5",
  "--charcoal": "#4b3730", "--muted": "#7d6961", "--accent-light": "#f0c4ae",
};

function getCountdown(date) {
  if (!date) return undefined;
  const remaining = new Date(date).getTime() - Date.now();
  if (remaining <= 0) return null;
  return [["Días", Math.floor(remaining / 86400000)], ["Horas", Math.floor((remaining / 3600000) % 24)], ["Minutos", Math.floor((remaining / 60000) % 60)], ["Segundos", Math.floor((remaining / 1000) % 60)]];
}

function displayTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value || "")) return [value || "", ""];
  const [hours, minutes] = value.split(":").map(Number);
  return [`${hours % 12 || 12}:${String(minutes).padStart(2, "0")}`, hours >= 12 ? "p. m." : "a. m."];
}

function ItineraryIcon({ type }) {
  if (type === "vals") return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="7" r="3"/><path d="M20 15h8l2 9 10 17H8l10-17 2-9Z"/><path d="m20 15-9 8m17-8 9 8M18 24h12M16 32c5 3 11 3 16 0" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const Icon = { reception: Wine, banquet: UtensilsCrossed, dance: Music2 }[type] || Wine;
  return <Icon aria-hidden="true" />;
}

export function EstephanieXvTemplate({ wedding, assets = defaultAssets, customTheme = {}, nameClassName = "", heroFramed = false, themeClassName = "" }) {
  const floral = assets.floral;
  const envelopeClosed = assets.envelopeClosed;
  const envelopeOpen = assets.envelopeOpen;
  const theme = { ...defaultTheme, ...customTheme, "--floral-image": `url('${floral}')` };
  const names = wedding.couple.partner1;
  const whatsappContacts = wedding.contact?.whatsapps?.length
    ? wedding.contact.whatsapps
    : wedding.contact?.whatsapp
      ? [{ phone: wedding.contact.phone, whatsapp: wedding.contact.whatsapp }]
      : [];
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  const [audioStage, setAudioStage] = useState("intro");
  const openingTimer = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const audioRef = useRef(null);
  const invitationRef = useRef(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdown(wedding.date));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [wedding.date]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.65; }, [wedding.music.url]);
  useEffect(() => () => window.clearTimeout(openingTimer.current), []);

  useEffect(() => {
    if (!opened) return;
    let observer;
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const nodes = invitationRef.current?.querySelectorAll("main > [data-je-reveal]") || [];
        observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.revealed);
          entry.target.dataset.scrollVisible = "true";
          observer.unobserve(entry.target);
        }), { threshold: 0, rootMargin: "0px 0px -12% 0px" });
        nodes.forEach((node) => {
          Array.from(node.children).forEach((child, index) => {
            child.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 100}ms`);
          });
          observer.observe(node);
        });
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) cancelAnimationFrame(secondFrame);
      observer?.disconnect();
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [opened]);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowLeft") setActivePhoto((current) => (current - 1 + wedding.gallery.length) % wedding.gallery.length);
      if (event.key === "ArrowRight") setActivePhoto((current) => (current + 1) % wedding.gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto, wedding.gallery.length]);

  const whatsappUrl = (text) => `${wedding.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  const confirmationUrl = whatsappUrl(`Hola, quiero confirmar mi asistencia a los XV años de ${wedding.couple.partner1}, el 19 de diciembre de 2026.`);
  const sendWish = (event) => {
    event.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;
    window.location.assign(whatsappUrl(`Buzón de deseos para ${wedding.couple.partner1}\nDe: ${wishName.trim()}\n\n${wishMessage.trim()}`));
  };
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const beginSong = () => {
    window.clearTimeout(openingTimer.current);
    setAudioStage("song");
    setOpened(true);
    const audio = audioRef.current;
    if (!audio || !wedding.music.enabled) return;
    audio.pause();
    audio.src = wedding.music.url;
    audio.loop = true;
    audio.currentTime = 0;
    audio.play().catch(() => setPlaying(false));
  };
  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    const audio = audioRef.current;
    if (!audio || !wedding.music.enabled) {
      openingTimer.current = window.setTimeout(beginSong, 2300);
      return;
    }
    audio.play().catch(() => {
      // A blocked or unavailable intro must never leave the invitation locked.
      openingTimer.current = window.setTimeout(beginSong, 2300);
    });
  };
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => notify("Agrega el archivo de la canción para reproducirla"));
  };
  const submit = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(event.currentTarget); const name = String(form.get("name") || "").trim();
    const payload = { name, attending: form.get("attendance"), companions: Number(form.get("companions") || 0), menuPreference: "normal", allergies: String(form.get("notes") || ""), message: String(form.get("message") || ""), songTitle: "", artist: "", website: String(form.get("website") || "") };
    try {
      const key = `momently:rsvp:${wedding.slug}`; const stored = JSON.parse(localStorage.getItem(key) || "null"); const editing = Boolean(stored?.rsvpId && stored?.editToken);
      const response = await fetch(`/api/public/weddings/${wedding.slug}/rsvp`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { "X-RSVP-Edit-Token": stored.editToken } : {}) }, body: JSON.stringify({ ...payload, ...(editing ? { rsvpId: stored.rsvpId } : {}) }) });
      const result = response.status === 204 ? {} : await response.json();
      if (!response.ok || result.ok !== true || !result.rsvpId || (!editing && !result.editToken)) throw new Error(result.error || "No fue posible enviar tu confirmación.");
      if (result.rsvpId && result.editToken) localStorage.setItem(key, JSON.stringify({ rsvpId: result.rsvpId, editToken: result.editToken, data: payload }));
      else if (stored) localStorage.setItem(key, JSON.stringify({ ...stored, data: payload }));
      setSuccess(name.split(" ")[0]);
    } catch (cause) { setError(cause.message); } finally { setSaving(false); }
  };
  const addCalendar = () => {
    if (!wedding.date) return;
    openGoogleCalendar({ title: wedding.eventTitle, start: wedding.date, end: wedding.endDate, durationHours: 8, location: wedding.reception.address || wedding.reception.name, details: wedding.hero.quote });
  };
  const share = async () => {
    const data = { title: wedding.eventTitle, text: wedding.hero.quote, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Enlace copiado"); } }
    catch (cause) { if (cause?.name !== "AbortError") notify("No fue posible compartir"); }
  };

  return <div ref={invitationRef} className={`${styles.wedding} ${customStyles.invitation} ${themeClassName}`} style={theme}>
    <div className={customStyles.sparkleOverlay} aria-hidden="true">{[5,12,21,31,42,53,64,76,86,95].map((top,index) => <i key={top} style={{top:`${top}%`,left:index%2?"96%":"3%",animationDelay:`${index*.45}s`}} />)}</div>
    {wedding.music.enabled && <audio ref={audioRef} src={audioStage === "intro" ? wedding.music.introUrl : wedding.music.url} loop={audioStage === "song"} preload="auto" onEnded={() => { if (audioStage === "intro") beginSong(); }} onError={() => { if (opening && audioStage === "intro") beginSong(); else setPlaying(false); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
    {!opened && <div className={`${styles.intro} ${opening ? `${styles.opening} ${customStyles.introPlaying}` : ""}`}>
      <div className={styles.introBackdrop}><Image src={wedding.hero.image} fill priority sizes="100vw" alt="Castillo de cuento entre rosas azules y detalles dorados" /></div><div className={styles.introShade} />
      <div className={styles.introTitle}><span>{wedding.hero.subtitle}</span><h1>Una invitación para ti</h1></div>
      <div className={styles.envelopeScene}><div className={styles.envelopeStage}>
        <div className={`${styles.letter} ${customStyles.letter}`}><Image src={floral} fill sizes="500px" alt="" aria-hidden="true" /><span>{wedding.hero.subtitle}</span><h2 className={`${localStyles.letterName} ${nameClassName}`}>{wedding.couple.partner1}</h2><small>{wedding.dateStamp || "19 · 12 · 2026"}</small></div>
        <div className={`${styles.envelopeOpenBack} ${customStyles.openEnvelopeLayer}`}>
          <Image className={customStyles.openEnvelopeArtwork} src={envelopeOpen} width={1536} height={1024} priority sizes="(max-width: 700px) 116vw, 870px" alt={`Sobre abierto de ${names}`} />
        </div>
        <div className={`${styles.envelopeOpenFront} ${customStyles.openEnvelopeLayer} ${customStyles.openFront}`} aria-hidden="true">
          <Image className={customStyles.openEnvelopeArtwork} src={envelopeOpen} width={1536} height={1024} priority sizes="(max-width: 700px) 116vw, 870px" alt="" />
        </div>
        <Image className={styles.envelopeClosed} src={envelopeClosed} fill priority sizes="(max-width: 700px) 96vw, 680px" alt={`Sobre cerrado de ${names}`} />
        <button className={styles.sealAction} onClick={openInvitation} disabled={opening} aria-label="Romper el sello y abrir la invitación"></button>
      </div><button className={styles.openLabel} onClick={openInvitation} disabled={opening}>{opening ? "Abriendo…" : "Abrir invitación"}</button></div>
      {opening && <button className={customStyles.skipIntro} onClick={beginSong}>Continuar a mi invitación <ChevronRight size={16} /></button>}
    </div>}

    <main className={!opened ? styles.locked : styles.unlocked}>
      <section className={`${styles.hero} ${customStyles.hero}`}>
        <Image className={customStyles.heroImage} src={wedding.hero.image} fill priority sizes="100vw" alt="Castillo de cuento entre rosas azules y detalles dorados" />
        <div className={customStyles.heroShade} />
        <div className={customStyles.heroCopy}><Image className={customStyles.heroCrown} src="/images/events/xv-estephanie/princess-crown.png" width={360} height={240} alt="Corona dorada de princesa" /><span>Mis XV años</span><strong className={customStyles.age}>XV</strong><h1>{wedding.couple.partner1}</h1><p>{wedding.dateDisplay}</p><small>6:00 p. m.</small></div>
        <a href="#bienvenida" aria-label="Continuar"><ChevronDown /></a>
      </section>
      <section className={`${styles.welcome} ${customStyles.storyFrame}`} id="bienvenida" data-je-reveal><Crown className={customStyles.crownIcon} /><span>Estás invitado a mi gran noche</span><h2>Una noche mágica<br />para compartir contigo</h2><p>{wedding.hero.quote}</p><div className={`${styles.signature} ${customStyles.fullNames}`}>{wedding.couple.partner1}</div></section>

      {wedding.bibleVerse && <section className={localStyles.verse} data-je-reveal><span>{wedding.bibleVerse.reference}</span><p>“{wedding.bibleVerse.text}”</p></section>}

      <section className={`${styles.countdown} ${customStyles.castleCountdown}`} data-je-reveal><span>Cada vez falta menos</span><div className={customStyles.countdownCopy}><h2>Para mi gran día</h2>{countdown === undefined ? <div className={styles.numbers}>{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><small>{label}</small></div>)}</div> : countdown ? <div className={styles.numbers}>{countdown.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> : <h3>¡Hoy es mi gran día!</h3>}</div></section>

      {wedding.family && <section className={`${styles.family} ${customStyles.storyFrame} ${customStyles.familyPortrait}`} data-je-reveal><span>Con la bendición y el amor de</span><h2>Mis padres y mis padrinos</h2>{wedding.family.groups ? <div className={`${localStyles.familyGroups} ${customStyles.familyGroups}`}>{wedding.family.groups.map((group) => <article key={group.title}><small>{group.title}</small>{group.names.map((name) => <p key={name}>{name}</p>)}</article>)}</div> : <div className={styles.familyGrid}><article>{wedding.family.brideParents ? <><div className={localStyles.parentGroup}><small>Padres de la novia</small>{wedding.family.brideParents.map((name) => <p key={name}>{name}</p>)}</div><div className={localStyles.parentGroup}><small>Padres del novio</small>{wedding.family.groomParents.map((name) => <p key={name}>{name}</p>)}</div></> : <><small>Mis papás</small>{wedding.family.parents.map((name) => <p key={name}>{name}</p>)}</>}</article><i /><article><small>Mis padrinos</small>{wedding.family.godparents.map((name) => <p key={name}>{name}</p>)}</article></div>}{wedding.family.memorial && <p className={localStyles.memorial}>{wedding.family.memorial}</p>}</section>}

      {wedding.gallery.length > 0 && <section className={styles.photoGallery} data-je-reveal><span>Mis recuerdos</span><h2>Una historia en fotografías</h2><p>Pequeños momentos llenos de cariño.</p><div className={`${styles.photoGrid} ${customStyles.photoGrid}`}>{wedding.gallery.map((photo, index) => <button key={photo.src} style={{aspectRatio:`${photo.width}/${photo.height}`}} onClick={() => setActivePhoto(index)} aria-label={`Abrir fotografía ${index + 1}`}><Image src={photo.src} fill sizes="(max-width: 600px) 50vw, 40vw" alt={photo.alt} /></button>)}</div></section>}


      {wedding.reception.enabled && <section className={`${customStyles.royalSection} ${customStyles.storyFrame} ${customStyles.royalVenue}`} data-je-reveal><Sparkles className={customStyles.crownIcon} /><span>Mi fiesta</span><h2>{wedding.reception.name}</h2>{wedding.reception.time && <strong>{wedding.reception.time}</strong>}{wedding.reception.address && <p>{wedding.reception.address}</p>}{wedding.reception.mapsUrl && <a href={wedding.reception.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <MapPin /></a>}<Image className={customStyles.dwarfSilhouettes} src="/images/events/xv-estephanie/seven-dwarfs.png" width={2172} height={724} sizes="(max-width:700px) 80vw, 650px" alt="Siluetas doradas de siete enanitos de cuento" /></section>}

      {wedding.itinerary.length > 0 && <section className={`${styles.timeline} ${customStyles.mirrorTimeline}`} data-je-reveal><span>{wedding.timelineDate}</span><h2>Los momentos de mi celebración</h2><div className={customStyles.mirrorContent}><Image className={customStyles.mirrorFrame} src="/images/events/xv-estephanie/mirror-frame.png" fill sizes="(max-width:700px) 100vw, 800px" alt="" aria-hidden="true" /><div className={customStyles.mirrorItems}>{wedding.itinerary.map((item) => { const [time, period] = displayTime(item.time); return <article key={`${item.time}-${item.title}`}><ItineraryIcon type={item.icon} /><time>{time}</time><small>{period}</small><i /><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div></section>}

      {wedding.nextDayEvent && <section className={localStyles.nextDay} data-je-reveal><Image src={floral} width={760} height={507} alt="" aria-hidden="true" /><span>La celebración continúa</span><h2>{wedding.nextDayEvent.title}</h2><strong>{wedding.nextDayEvent.date}</strong><p>A partir de las {wedding.nextDayEvent.time}</p><small>{wedding.nextDayEvent.place}</small><a href={wedding.nextDayEvent.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <MapPin /></a></section>}

      {wedding.dressCode && <section className={`${styles.dress} ${customStyles.storyFrame} ${customStyles.royalSection}`} data-je-reveal><Crown className={customStyles.crownIcon} /><span>{wedding.dressCode.heading || "Código de vestimenta"}</span><h2>{wedding.dressCode.title}</h2><p>{wedding.dressCode.text}</p>{wedding.dressCode.reservedColors?.length > 0 && <div className={customStyles.reservedColors}>{wedding.dressCode.reservedColors.map((color) => <figure key={color.name}><i style={{background:color.value}}/><figcaption>{color.name}</figcaption></figure>)}</div>}</section>}

      {wedding.gifts?.length > 0 && <section className={styles.gifts} data-je-reveal><Mail /><span>Lluvia de sobres</span><h2>Tu presencia es mi mejor regalo</h2><p>{wedding.gifts[0].description}</p>{wedding.bank?.enabled && <div className={customStyles.bankDetails}><h3>Datos para transferencia</h3><dl>{wedding.bank.bank && <div><dt>Banco</dt><dd>{wedding.bank.bank}</dd></div>}<div><dt>A nombre de</dt><dd>{wedding.bank.holder}</dd></div>{[["Cuenta", wedding.bank.account], ["CLABE", wedding.bank.clabe]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd className={customStyles.bankNumber}>{value}</dd><button type="button" aria-label={`Copiar ${label}`} onClick={async () => { try { await navigator.clipboard.writeText(value); notify(`${label} copiada`); } catch { notify("No fue posible copiar. Puedes seleccionar el número."); } }}>Copiar</button></div>)}</dl></div>}</section>}

      <section className={customStyles.princessSection} data-je-reveal><Image className={customStyles.princessImage} src="/images/events/xv-estephanie/princess-apple-v2.png" width={1024} height={1536} alt="Silueta de princesa de perfil, vestido azul y contornos dorados, sosteniendo una manzana roja" /><article><Sparkles aria-hidden="true"/><span>Un sueño hecho realidad</span><h2>La magia de una nueva etapa</h2><p>Quiero guardar esta noche en el corazón, rodeada de las personas que llenan mi vida de alegría.</p></article></section>

      <section className={customStyles.wishMailbox} data-je-reveal><Smartphone aria-hidden="true"/><span>Con todo tu cariño</span><h2>Buzón de deseos</h2><p>Cada palabra que me regales será un recuerdo que guardaré para siempre, un pedacito de tu cariño que me acompañará en esta nueva etapa.</p><form onSubmit={sendWish}><label>Tu nombre<input value={wishName} onChange={(event) => setWishName(event.target.value)} required maxLength={100} placeholder="Escribe tu nombre" /></label><label>Tu deseo para mí<textarea value={wishMessage} onChange={(event) => setWishMessage(event.target.value)} required maxLength={1000} rows={4} placeholder="Déjame unas palabras con cariño…" /></label><button type="submit"><Send size={18}/> Enviar deseo por WhatsApp</button></form></section>

      <section className={styles.calendar} data-je-reveal><CalendarDays /><span>Reserva la fecha</span><h2>{wedding.calendarDate}</h2><div className={styles.calendarActions}><button onClick={addCalendar} disabled={!wedding.date}>Agregar a mi calendario</button>{whatsappContacts.map((contact) => <a key={contact.whatsapp} href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp {contact.phone}</a>)}</div></section>

      {wedding.rsvpEnabled !== false && <section className={styles.rsvp} data-je-reveal><div className={styles.rsvpIntro}><span>R S V P</span><h2>¿Me acompañarás?</h2><p>{wedding.rsvpDeadlineDisplay ? `Por favor confirma tu asistencia antes del ${wedding.rsvpDeadlineDisplay}.` : "Tu confirmación es muy importante para nosotros. Por favor, haznos saber si podrás acompañarme en esta noche especial."}</p>{whatsappContacts.map((contact) => <a key={contact.whatsapp} href={confirmationUrl} target="_blank" rel="noreferrer" className={customStyles.whatsappConfirm}> <Smartphone size={18}/> Confirmar por WhatsApp</a>)}<div>{wedding.initials}</div></div>{success ? <div className={styles.success}><Check /><h3>¡Gracias, {success}!</h3><p>Recibí tu respuesta. Me dará mucha alegría compartir este día contigo.</p><button onClick={() => setSuccess("")}>Editar respuesta</button></div> : <form onSubmit={submit}><label>Nombre completo<input name="name" minLength={2} maxLength={100} required placeholder="Escribe tu nombre" /></label><fieldset><legend>¿Asistirás?</legend><label><input type="radio" name="attendance" value="yes" required /> Sí, ahí estaré</label><label><input type="radio" name="attendance" value="no" required /> No podré asistir</label></fieldset><label>Comentarios o consideraciones<textarea name="notes" maxLength={500} rows="3" placeholder="Alergias o algo que debamos saber" /></label><label>Mensaje para {wedding.couple.partner1}<textarea name="message" maxLength={1000} rows="4" placeholder="Déjame unas palabras…" /></label><label className={styles.honeypot}>Sitio web<input name="website" tabIndex="-1" autoComplete="off" /></label>{error && <p className={styles.formError}>{error}</p>}<button disabled={saving}>{saving ? "Enviando…" : "Guardar confirmación"}</button></form>}</section>}

      <section className={styles.closing} data-je-reveal><Image src={wedding.closingImage || wedding.hero.image} fill sizes="100vw" alt="Castillo de cuento entre rosas azules y detalles dorados" /><div /><Heart /><span>Gracias por ser parte de</span><h2>mi historia.</h2><p className={customStyles.fullNames}>{wedding.couple.partner1}</p><button onClick={share}><Share2 /> Compartir invitación</button></section>
    </main>

    {activePhoto !== null && wedding.gallery[activePhoto] && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`Galería de ${names}`}><button className={styles.lightboxClose} onClick={() => setActivePhoto(null)} aria-label="Cerrar"><X /></button><button className={styles.lightboxPrevious} onClick={() => setActivePhoto((activePhoto - 1 + wedding.gallery.length) % wedding.gallery.length)} aria-label="Fotografía anterior"><ChevronLeft /></button><div className={styles.lightboxImage}><Image src={wedding.gallery[activePhoto].src} fill sizes="100vw" alt={wedding.gallery[activePhoto].alt} /></div><button className={styles.lightboxNext} onClick={() => setActivePhoto((activePhoto + 1) % wedding.gallery.length)} aria-label="Fotografía siguiente"><ChevronRight /></button><span>{activePhoto + 1} / {wedding.gallery.length}</span></div>}
    {opened && wedding.music.enabled && <button className={styles.music} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <Pause /> : <Play />}<span>{playing ? "Reproduciendo" : wedding.music.label}</span></button>}
    <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>{toast}</div>
  </div>;
}
