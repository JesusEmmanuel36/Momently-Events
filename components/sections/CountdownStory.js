"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";

function getTime(date) {
  const distance = new Date(date).getTime() - Date.now();
  if (distance <= 0) return null;
  return {
    Días: Math.floor(distance / 86400000), Horas: Math.floor((distance / 3600000) % 24),
    Minutos: Math.floor((distance / 60000) % 60), Segundos: Math.floor((distance / 1000) % 60)
  };
}

export function CountdownSection({ wedding }) {
  const [time, setTime] = useState(undefined);
  useEffect(() => {
    const updateCountdown = () => setTime(getTime(wedding.date));
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [wedding.date]);
  return <section className="countdown"><Reveal>
    <span className="eyebrow">Falta muy poco</span>
    {time === undefined
      ? <div className="countdown__grid" aria-label="Cargando cuenta regresiva">{["Días", "Horas", "Minutos", "Segundos"].map((label) => <div key={label}><strong>--</strong><span>{label}</span></div>)}</div>
      : time
        ? <div className="countdown__grid">{Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>
        : <h2>¡Hoy es nuestro gran día!</h2>}
  </Reveal></section>;
}

export function StorySection({ wedding }) {
  return <section className="section story"><Reveal><SectionHeading eyebrow="Un poco de nosotros" title="Nuestra historia" copy="Todo comenzó sin saber que estábamos a punto de encontrar nuestro lugar favorito." /></Reveal>
    <div className="story__timeline">{wedding.story.map((item, index) => <Reveal className={`story__item story__item--${index % 2 ? "right" : "left"}`} key={item.year}>
      <div className="story__year">{item.year}</div><div className="story__dot" />
      <div className="story__text"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>
      {item.image && <div className="story__image"><Image src={item.image} fill sizes="(max-width: 768px) 80vw, 30vw" alt={item.title} className="cover" /></div>}
    </Reveal>)}</div>
  </section>;
}
