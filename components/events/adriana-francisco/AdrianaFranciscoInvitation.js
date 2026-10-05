"use client";

import Image from "next/image";
import { IntroScreen } from "./IntroScreen";
import localStyles from "./AdrianaFranciscoInvitation.module.css";
import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSection, WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection, StorySection } from "@/components/sections/CountdownStory";
import { GallerySection, VideoSection } from "@/components/sections/Gallery";
import { DressCodeSection, HotelsSection, ImportantSection, LocationsSection, ScheduleSection } from "@/components/sections/EventDetails";
import { GiftRegistrySection, RSVPSection, ShareContact } from "./GuestActions";
import { CalendarSection } from "@/components/sections/EventDetails";
import { Botanical, Reveal } from "@/components/ui";

export function AdrianaFranciscoInvitation({ wedding, previewMode = false }) {
  const [opened, setOpened] = useState(previewMode); const [leaving, setLeaving] = useState(false); const [playing, setPlaying] = useState(false); const [toast, setToast] = useState(""); const audioRef = useRef(null);
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(""), 3000); };
  const openInvitation = () => {
    if (leaving) return;
    setLeaving(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1900;
    window.setTimeout(() => { setOpened(true); window.scrollTo(0, 0); }, transitionDuration);
  };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else audioRef.current.play().then(() => setPlaying(true)).catch(() => showToast("No se pudo reproducir la música. Toca el botón para intentarlo de nuevo.")); };
  useEffect(() => () => document.body.style.overflow = "", []);
  return <div className={localStyles.invitation}>
    {!previewMode && <audio ref={audioRef} src={wedding.music.src} loop preload="none" onError={() => setPlaying(false)} />}
    {!opened && <IntroScreen wedding={wedding} onOpen={openInvitation} leaving={leaving} />}
    <main className={!opened ? "invitation invitation--locked" : "invitation"}>
      <HeroSection wedding={wedding} /><div className={localStyles.roses} aria-hidden="true"><Image src="/images/events/adriana-y-francisco/floral.png" width={1200} height={600} sizes="(max-width:768px) 90vw,700px" alt="" /></div><WelcomeSection wedding={wedding} /><CountdownSection wedding={wedding} />
      {wedding.features.story && <StorySection wedding={wedding} />}{wedding.features.gallery && <GallerySection wedding={wedding} />}{wedding.features.video && <VideoSection wedding={wedding} />}
      {(wedding.features.ceremony || wedding.features.reception) && <LocationsSection wedding={wedding} />}{wedding.features.itinerary && <ScheduleSection wedding={wedding} />}{wedding.features.dressCode && <DressCodeSection wedding={wedding} />}
      {wedding.features.gifts && <GiftRegistrySection wedding={wedding} onToast={showToast} />}{wedding.features.hotels && <HotelsSection wedding={wedding} />}{wedding.features.important && <ImportantSection wedding={wedding} />}{wedding.features.calendar && <CalendarSection wedding={wedding} onToast={showToast} />}
      {wedding.features.rsvp && <RSVPSection wedding={wedding} />}<ShareContact wedding={wedding} onToast={showToast} />
      <section className="closing"><Image src={wedding.images.hero} fill sizes="100vw" alt={`${wedding.couple.bride} y ${wedding.couple.groom}`} className="cover" /><div className="closing__overlay" /><Botanical /><Reveal><span className="script">Gracias por formar parte</span><h2>de nuestra historia.</h2><p>{wedding.couple.bride} <i>&</i> {wedding.couple.groom}</p><small>{wedding.dateDisplay}</small></Reveal></section>
    </main>
    {opened && !previewMode && wedding.features.music && <button className={`music-player ${playing ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause /> : <Play />}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span><Volume2 className="music-player__wave" /></button>}
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </div>;
}
