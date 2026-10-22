"use client";
import Image from "next/image";
import { useState } from "react";
import { coverShade } from "@/lib/wedding/creator-theme";
import styles from "./CoverBackground.module.css";

export function CoverBackground({ src, theme, settings = {}, onReady }) {
  // The key resets the loading state when the editor selects another background.
  return <CoverImage key={src} src={src} theme={theme} settings={settings} onReady={onReady}/>;
}
function CoverImage({ src, theme, settings, onReady }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ready = loaded || failed;
  const animated = settings.animated !== false;
  const style = { "--cover-zoom": settings.zoom ?? 1, "--cover-x": `${settings.positionX ?? 50}%`, "--cover-y": `${settings.positionY ?? 35}%`, "--cover-shade": settings.gradientColor || coverShade(theme), "--cover-opacity": settings.gradientOpacity ?? .85, "--cover-blur": `${settings.blur ?? 6}px` };
  return <div className={`${styles.background} ${ready ? styles.ready : ""} ${animated ? styles.animated : ""}`} style={style} data-cover-background data-loaded={ready}>
    {!ready && <div className={styles.loading} role="status"><span className={styles.spinner}/><span className={styles.loadingLabel}>Cargando portada…</span></div>}
    {!failed && <div className={styles.frame}><Image unoptimized src={src} fill priority sizes="100vw" alt="" className={styles.image} onLoad={() => {setLoaded(true); onReady?.();}} onError={() => {setFailed(true); onReady?.();}}/></div>}
    {settings.gradientEnabled !== false && <><div className={styles.blur}/><div className={styles.gradient}/></>}
  </div>;
}
