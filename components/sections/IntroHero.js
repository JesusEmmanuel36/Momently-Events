"use client";
import {heroTextStyle} from "@/lib/wedding/hero-typography";

import {CssFloralArrangement} from "@/components/floral/CssFloralArrangement";
import Image from "next/image";
import {CoverBackground} from "@/components/wedding/CoverBackground";
import coverStyles from "@/components/wedding/CoverBackground.module.css";
import { ChevronDown, Heart } from "lucide-react";
import { Botanical, Reveal } from "@/components/ui";

export function IntroScreen({ wedding, onOpen, leaving }) {
  const brideInitial = wedding.couple.bride.trim().charAt(0).toUpperCase(); const groomInitial = wedding.couple.groom.trim().charAt(0).toUpperCase();
  return <div className={`intro ${leaving ? "intro--leaving" : ""}`}>
    {wedding.introSettings?.imageUrl ? <CoverBackground src={wedding.introSettings.imageUrl} theme={wedding.theme} settings={wedding.heroSettings}/> : <Image src={wedding.images.hero} alt={`${wedding.couple.bride} y ${wedding.couple.groom}`} fill priority sizes="100vw" className="cover" />}
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
          <Image className="envelope__asset envelope__asset--open-back" src="/images/wedding/envelope/envelope-open.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="Sobre de boda abierto con moño de satén" priority draggable={false} />
          <Image className="envelope__asset envelope__asset--open-front" src="/images/wedding/envelope/envelope-open.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="" aria-hidden="true" priority draggable={false} />
          <Image className="envelope__asset envelope__asset--closed" src="/images/wedding/envelope/envelope-closed.png" fill sizes="(max-width: 600px) 96vw, 590px" alt="Sobre de boda de papel marfil con sello de cera y moño" priority draggable={false} />
          <button className="envelope__seal" onClick={onOpen} disabled={leaving} aria-label="Romper el sello y abrir la invitación">
            <span>Abrir invitación</span>
          </button>
        </div>
      </div>
      <p className="intro__hint">Toca el sello para abrir</p>
    </div>
  </div>;
}

export function HeroSection({ wedding }) {
  return <section className={`hero ${wedding.heroSettings ? `${coverStyles.creatorHero} ${wedding.heroSettings.animated === false ? coverStyles.staticHero : ""}` : ""}`} style={wedding.heroSettings ? heroTextStyle(wedding.heroSettings) : undefined} id="inicio">
    {wedding.heroSettings ? <CoverBackground src={wedding.heroBackgroundUrl || wedding.images.hero} theme={wedding.theme} settings={wedding.heroSettings}/> : <>
    <div className="hero__image"><Image src={wedding.images.hero} fill priority sizes="(max-width: 768px) 100vw, 58vw" alt={`${wedding.couple.bride} y ${wedding.couple.groom}`} className="cover" /></div>
    <div className="hero__wash" />
    </>}
    {wedding.heroSettings?.flowers !== false && <Botanical className="hero__botanical" />}
    <Reveal className="hero__copy">
      <span className="eyebrow">{wedding.heroSubtitle}</span>
      <h1><span>{wedding.couple.bride}</span><i>&</i><span>{wedding.couple.groom}</span></h1>
      <div className="hero__rule"><span />{wedding.dateLong}<span /></div>
      {wedding.heroQuoteReference && <span className="hero__quote-reference">{wedding.heroQuoteReference}</span>}
      <p>{wedding.heroQuote}</p>
    </Reveal>
    {wedding.heroSettings && wedding.creatorAppearanceData?.decorations?.flowers !== false && (wedding.creatorAppearanceData?.sectionAppearance?.hero?.flowers ?? wedding.heroSettings.flowers) !== false && <div className={coverStyles.heroFlowers} aria-hidden="true"><CssFloralArrangement lightweight colors={{flowers:wedding.creatorAppearanceData?.decorations?.lightFlowerColor || wedding.theme?.ivory,accentFlowers:wedding.creatorAppearanceData?.decorations?.flowerColor || wedding.theme?.rose,leaves:wedding.creatorAppearanceData?.decorations?.foliageColor || wedding.theme?.sage}}/></div>}
    <a className="hero__scroll" href="#bienvenida" aria-label="Continuar hacia la invitación"><ChevronDown /></a>
  </section>;
}

export function WelcomeSection({ wedding }) {
  return <section className="section welcome" id="bienvenida"><Reveal>
    <span className="script">{wedding.welcomeTitle}</span>
    {wedding.welcome.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    <div className="signature">{wedding.couple.bride} <i>&</i> {wedding.couple.groom}</div>
  </Reveal></section>;
}
