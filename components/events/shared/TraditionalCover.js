"use client";
import Image from "next/image";
import {ChevronDown} from "lucide-react";
import {PhotographicEnvelope} from "./PhotographicEnvelope";
import styles from "./TraditionalCover.module.css";

// Presentación fotográfica de Caleb y Ciriam, aislada de las demás plantillas.
export function TraditionalIntro({image,assets,names,subtitle="Nuestra boda",date,opening,onOpen,onOpened,openWidth,openBottom,sealTop,emi=false,letterContent}){
 return <section className={`${styles.intro} ${opening?styles.opening:""}`} data-traditional-intro>
  <Image src={image} fill priority sizes="100vw" alt="" aria-hidden="true" className={styles.backdrop}/><div className={styles.introShade}/>
  <header className={styles.introTitle}><span>{emi?"Mi cumple":subtitle}</span><h1 className={emi?styles.emiName:undefined}>{emi?"EMILIANO":"Una invitación para ti"}</h1></header>
  <div className={styles.scene}><PhotographicEnvelope assets={assets} title={names.join(" y ")} subtitle={subtitle} date={date} opening={opening} onOpen={onOpen} onOpened={onOpened} openWidth={openWidth} openBottom={openBottom} sealTop={sealTop} letterContent={letterContent}/><button type="button" className={styles.openButton} onClick={onOpen} disabled={opening}>{opening?"Abriendo…":"Abrir invitación"}</button></div>
 </section>;
}
export function TraditionalHero({image,assets,names,subtitle,date,href,light=false,showFloral=true,children}){
 return <section className={`${styles.hero} ${light?styles.light:""}`} data-traditional-hero>
  <Image src={image} fill priority sizes="100vw" alt={`Celebración de ${names.join(" y ")}`} className={styles.heroPhoto}/><div className={styles.heroShade}/>
  {showFloral&&<Image src={`${assets}/floral.webp`} width={1536} height={1024} unoptimized sizes="(max-width:700px) 85vw,700px" alt="" aria-hidden="true" className={styles.flower}/>}
  <div className={styles.copy}><span>{subtitle}</span><h1>{names.map((name,i)=><span key={name}>{i>0&&<i>&amp;</i>}<b>{name}</b></span>)}</h1><p>{date}</p></div>{children}
  <a href={href} className={styles.scroll} aria-label="Continuar invitación"><ChevronDown/></a>
 </section>;
}
