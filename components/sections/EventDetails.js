"use client";

import Image from "next/image";
import { CalendarDays, Camera, Car, Clock, ExternalLink, GlassWater, Heart, MapPin, Music, Navigation, Sparkles, Trees, Umbrella, Users } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";

export function LocationsSection({ wedding }) {
  return <section className="locations" id="detalles">{[wedding.ceremony, wedding.reception].filter((place) => place.enabled !== false).map((place, index) => <article className={`location ${index ? "location--reverse" : ""}`} key={place.label}>
    <div className="location__image"><Image src={place.image} fill sizes="(max-width: 768px) 100vw, 50vw" alt={place.name} className="cover" /></div>
    <Reveal className="location__content"><span className="eyebrow">{place.label}</span><MapPin className="location__icon" strokeWidth={1} /><h2>{place.name}</h2><strong>{place.time}</strong><p>{place.address}</p>
      <div className="button-row"><a className="button" href={place.mapsUrl} target="_blank" rel="noreferrer">Ver ubicación <ExternalLink size={15} /></a><a className="text-link" href={place.wazeUrl} target="_blank" rel="noreferrer"><Navigation size={15} /> Abrir en Waze</a></div>
    </Reveal>
  </article>)}</section>;
}

const itineraryIcons = { heart: Heart, camera: Camera, glass: GlassWater, music: Music, sparkles: Sparkles };
export function ScheduleSection({ wedding }) {
  return <section className="section schedule"><Reveal><SectionHeading eyebrow="El gran día" title="Itinerario" copy="Cada momento fue pensado para compartirlo contigo." /></Reveal>
    <div className="schedule__line">{wedding.itinerary.map((item, index) => { const Icon = itineraryIcons[item.icon]; return <Reveal className="schedule__item" key={item.time}><span className="schedule__number">0{index + 1}</span><div className="schedule__icon"><Icon strokeWidth={1.2} /></div><time>{item.time}</time><h3>{item.title}</h3></Reveal>; })}</div>
  </section>;
}

export function DressCodeSection({ wedding }) {
  return <section className="dress"><div className="dress__panel"><Reveal><SectionHeading eyebrow="Código de vestimenta" title={wedding.dressCode.title} copy="Queremos verte increíble en nuestro gran día." light /></Reveal>
    <Reveal className="dress__colors">{wedding.dressCode.colors.map((color) => <span key={color} style={{ backgroundColor: color }} title={color} />)}</Reveal>
    <Reveal><p className="dress__note">{wedding.dressCode.note}</p></Reveal></div></section>;
}

const importantIcons = { users: Users, car: Car, clock: Clock, tree: Trees, umbrella: Umbrella };
export function ImportantSection({ wedding }) {
  return <section className="section important"><Reveal><SectionHeading eyebrow="Para que disfrutes" title="Información importante" /></Reveal>
    <div className="important__list">{wedding.important.map((item) => { const Icon = importantIcons[item.icon]; return <Reveal className="important__item" key={item.title}><Icon strokeWidth={1.2} /><div><h3>{item.title}</h3><p>{item.description}</p></div></Reveal>; })}</div>
  </section>;
}

export function HotelsSection({ wedding }) {
  return <section className="section hotels"><Reveal><SectionHeading eyebrow="Hospedaje" title="¿Vienes de fuera?" copy="Seleccionamos estas opciones para que tu estancia sea tan especial como la celebración." /></Reveal>
    <div className="hotels__list">{wedding.hotels.map((hotel, index) => <Reveal className="hotel" key={hotel.name}><span>0{index + 1}</span><div><h3>{hotel.name}</h3><strong>{hotel.detail}</strong><p><MapPin size={15} /> {hotel.address}</p></div><div><a className="text-link" href={hotel.url} target="_blank" rel="noreferrer">Ver hotel</a><a className="text-link" href={hotel.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar</a></div></Reveal>)}</div>
  </section>;
}

export function CalendarSection({ wedding, onToast }) {
  const addCalendar = () => {
    openGoogleCalendar({ title: `Boda de ${wedding.couple.bride} y ${wedding.couple.groom}`, start: wedding.date, durationHours: 8, location: wedding.ceremony.address, details: wedding.heroQuote });
    onToast("Abriendo Google Calendar");
  };
  return <section className="calendar"><Reveal><CalendarDays strokeWidth={1} /><span className="eyebrow">Reserva la fecha</span><h2>{wedding.dateDisplay}</h2><p>No queremos celebrar este momento sin ti.</p><button className="button button--ivory" onClick={addCalendar}>Agregar a mi calendario</button></Reveal></section>;
}
