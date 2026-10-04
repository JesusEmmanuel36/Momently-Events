"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Botanical } from "@/components/ui";

export function IntroScreen({ wedding, onOpen, leaving }) {
  const brideInitial = wedding.couple.bride.trim().charAt(0).toUpperCase(); const groomInitial = wedding.couple.groom.trim().charAt(0).toUpperCase();
  return <div className={`intro ${leaving ? "intro--leaving" : ""}`}>
    <Image src={wedding.images.hero} alt={`${wedding.couple.bride} y ${wedding.couple.groom}`} fill priority sizes="100vw" className="cover" />
    <div className="intro__overlay" />
    <Botanical className="intro__branch intro__branch--left" />
    <Botanical className="intro__branch intro__branch--right" />
    <div className="intro__content">
      <span className="eyebrow">{wedding.heroSubtitle}</span>
      <h1 className="intro__heading">Una invitación para ti</h1>
      <div className="envelope-scene" aria-live="polite">
        <div className="envelope envelope--photoreal">
          <div className="envelope__letter">
            <span className="envelope__monogram">{brideInitial} <i>&</i> {groomInitial}</span>
            <strong>{wedding.couple.bride} & {wedding.couple.groom}</strong>
            <small>{wedding.dateDisplay}</small>
            <Heart size={14} fill="currentColor" />
          </div>
          <Image className="envelope__asset envelope__asset--open-back" src="/images/events/eufra-y-lety/envelope-open-el.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="Sobre de boda abierto con moño de satén" priority draggable={false} />
          <Image className="envelope__asset envelope__asset--open-front" src="/images/events/eufra-y-lety/envelope-open-el.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="" aria-hidden="true" priority draggable={false} />
          <Image className="envelope__asset envelope__asset--closed" src="/images/events/eufra-y-lety/envelope-closed-el.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="Sobre de boda de papel marfil con sello de cera y moño" priority draggable={false} />
          <button className="envelope__seal" onClick={onOpen} disabled={leaving} aria-label="Romper el sello y abrir la invitación">
            <span>Abrir invitación</span>
          </button>
        </div>
      </div>
      <p className="intro__hint">Toca el sello para abrir</p>
    </div>
  </div>;
}

