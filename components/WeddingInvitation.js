"use client";

import {WeddingSection} from "@/components/wedding/InvitationSection";
import {CreatorPass} from "@/components/wedding/CreatorPass";
import Image from "next/image";
import { Heart, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IntroScreen, HeroSection, WelcomeSection } from "@/components/sections/IntroHero";
import { CountdownSection, StorySection } from "@/components/sections/CountdownStory";
import { GallerySection, VideoSection } from "@/components/sections/Gallery";
import { CalendarSection, DressCodeSection, HotelsSection, ImportantSection, LocationsSection, ScheduleSection } from "@/components/sections/EventDetails";
import { FAQSection, GiftRegistrySection, RSVPSection, ShareContact, SongSection } from "@/components/sections/GuestActions";
import { Botanical, Reveal } from "@/components/ui";

export function WeddingInvitation({ wedding, previewMode = false, previewEnvelope = false, pass = null, passToken = null }) {
  const [opened, setOpened] = useState(previewMode && !previewEnvelope); const [leaving, setLeaving] = useState(false); const [playing, setPlaying] = useState(false); const [toast, setToast] = useState(""); const audioRef = useRef(null);
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(""), 3000); };
  const openInvitation = () => {
    if (leaving) return;
    setLeaving(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1900;
    window.setTimeout(() => { setOpened(true); window.scrollTo(0, 0); }, transitionDuration);
  };
  const toggleMusic = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else audioRef.current.play().then(() => setPlaying(true)).catch(() => showToast("Agrega /audio/wedding-song.mp3 para activar la música")); };
  useEffect(() => () => document.body.style.overflow = "", []);
  return <>
    {!previewMode && <audio ref={audioRef} src={wedding.music.src} loop preload="none" onError={() => setPlaying(false)} />}
    {!opened && <WeddingSection wedding={wedding} name="intro"><IntroScreen wedding={wedding} onOpen={openInvitation} leaving={leaving} /></WeddingSection>}
    <main className={!opened ? "invitation invitation--locked" : "invitation"}>
      <WeddingSection wedding={wedding} name="hero"><HeroSection key={wedding.heroSettings ? String(opened) : "hero"} wedding={wedding} /></WeddingSection><WeddingSection wedding={wedding} name="welcome"><WelcomeSection wedding={wedding} /></WeddingSection><WeddingSection wedding={wedding} name="countdown"><CountdownSection wedding={wedding} /></WeddingSection>
      {wedding.features.story && <WeddingSection wedding={wedding} name="story"><StorySection wedding={wedding} /></WeddingSection>}{wedding.features.gallery && <WeddingSection wedding={wedding} name="gallery"><GallerySection wedding={wedding} /></WeddingSection>}{wedding.features.video && <WeddingSection wedding={wedding} name="video"><VideoSection wedding={wedding} /></WeddingSection>}
      {(wedding.features.ceremony || wedding.features.reception) && <LocationsSection wedding={wedding} />}{wedding.features.itinerary && <WeddingSection wedding={wedding} name="itinerary"><ScheduleSection wedding={wedding} /></WeddingSection>}{wedding.features.dressCode && <WeddingSection wedding={wedding} name="dressCode"><DressCodeSection wedding={wedding} /></WeddingSection>}
      {wedding.features.gifts && <WeddingSection wedding={wedding} name="gifts"><GiftRegistrySection wedding={wedding} onToast={showToast} /></WeddingSection>}{wedding.features.hotels && <WeddingSection wedding={wedding} name="hotels"><HotelsSection wedding={wedding} /></WeddingSection>}{wedding.features.important && <WeddingSection wedding={wedding} name="important"><ImportantSection wedding={wedding} /></WeddingSection>}{wedding.features.calendar && <WeddingSection wedding={wedding} name="calendar"><CalendarSection wedding={wedding} onToast={showToast} /></WeddingSection>}
      {wedding.personalizedPasses && <WeddingSection wedding={wedding} name="rsvp"><CreatorPass pass={pass} token={passToken} slug={wedding.slug} confirmationEnabled={wedding.features.rsvp}/></WeddingSection>}{!wedding.personalizedPasses && wedding.features.rsvp && <WeddingSection wedding={wedding} name="rsvp"><RSVPSection wedding={wedding} /></WeddingSection>}{wedding.features.songRequest && <WeddingSection wedding={wedding} name="songRequest"><SongSection wedding={wedding} /></WeddingSection>}{wedding.features.faqs && <WeddingSection wedding={wedding} name="faqs"><FAQSection wedding={wedding} /></WeddingSection>}<WeddingSection wedding={wedding} name="contact"><ShareContact wedding={wedding} onToast={showToast} /></WeddingSection>
      <WeddingSection wedding={wedding} name="closing"><section className="closing"><Image src={wedding.images.hero} fill sizes="100vw" alt={`${wedding.couple.bride} y ${wedding.couple.groom}`} className="cover" /><div className="closing__overlay" /><Botanical /><Reveal><span className="script">Gracias por formar parte</span><h2>de nuestra historia.</h2><p>{wedding.couple.bride} <i>&</i> {wedding.couple.groom}</p><small>{wedding.dateDisplay}</small></Reveal></section></WeddingSection>
    </main>
    {opened && !previewMode && wedding.features.music && <button className={`music-player ${playing ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Reproducir música"}><span>{playing ? <Pause /> : <Play />}</span><span><small>{playing ? "Reproduciendo" : "Escuchar"}</small>{wedding.music.label}</span><Volume2 className="music-player__wave" /></button>}
    <footer><span>Invitación creada con <Heart size={12} fill="currentColor" /> por</span><strong>Momently Events</strong></footer>
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status">{toast}</div>
  </>;
}
