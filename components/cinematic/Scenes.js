import Image from 'next/image';
import styles from './Cinematic.module.css';

export function SceneWrapper({ scene, children, className = '' }) {
  return <article data-scene={scene.id} data-preset={scene.animationPreset} className={`${styles.scene} ${className}`} aria-label={scene.chapter}>{children}</article>;
}
function SceneCopy({ scene, names = false }) {
  return <div data-copy className={`${styles.sceneCopy} ${names ? styles.names : ''}`}><span className={styles.eyebrow}>{scene.eyebrow}</span>{names ? <h1>{scene.title.split(" & ")[0]} <i>&amp;</i> {scene.title.split(" & ")[1]}</h1> : <h2>{scene.title}</h2>}<p>{scene.copy}</p></div>;
}
export function FrameZoomScene({ scene, portrait, frame, frameMobile }) {
  return <SceneWrapper scene={scene} className={styles.frameScene}><div data-camera className={styles.roomCanvas} style={{"--frame-left":`${frame.left}%`,"--frame-top":`${frame.top}%`,"--frame-width":`${frame.width}%`,"--frame-height":`${frame.height}%`,"--frame-mobile-left":`${frameMobile.left}%`,"--frame-mobile-top":`${frameMobile.top}%`,"--frame-mobile-width":`${frameMobile.width}%`,"--frame-mobile-height":`${frameMobile.height}%`}}><picture><source media="(max-width:700px)" srcSet="/images/cinematic-demo/scene-01-room-mobile.webp"/><Image unoptimized src={scene.image} alt="Una habitación cálida con una mesa y portarretrato" fill priority sizes="(max-width:700px) 150vh,100vw" className={styles.roomImage}/></picture><div className={styles.framePhoto}><Image unoptimized src={portrait.image} alt={portrait.alt} fill priority sizes="(max-width:700px) 65vw,40vw" className={styles.photo}/></div></div><div className={styles.frameShade}/><SceneCopy scene={scene}/><div data-copy className={styles.scrollHint}><span>Desliza para entrar en nuestra historia</span><div/></div></SceneWrapper>;
}
export function CoupleScene({ scene }) {
  return <SceneWrapper scene={scene} className={styles[scene.type]}><div className={styles.photoLayer} data-photo><Image unoptimized src={scene.image} alt={scene.alt} fill sizes="100vw" className={styles.photo} style={{objectPosition:scene.position}}/></div><div className={styles.sceneShade}/><SceneCopy scene={scene} names={scene.type==='coupleHero'}/><span className={styles.chapterNumber} aria-hidden="true">{scene.chapter}</span></SceneWrapper>;
}
