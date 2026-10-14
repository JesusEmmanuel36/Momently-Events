import {createEnvelopeTheme} from '../envelope/theme';
import styles from './CssFloralArrangement.module.css';

// Petal position and overlap are deterministic, so SSR and hydration match.
function Rose({x,y,size,accent=false,rotation=0,z=10,bud=false}){
 return <div className={`${styles.rose} ${accent?styles.accent:''} ${bud?styles.bud:''}`} style={{'--x':`${x}%`,'--y':`${y}%`,'--rose-size':`${size}%`,'--rose-turn':`${rotation}deg`,zIndex:z}}>{Array.from({length:18},(_,i)=>{
 const variation=Math.sin(x*.13+y*.17+i*2.39);
 const petalSize=72-i*2.9+variation*1.2;
 return <i key={i} className={styles.petal} style={{left:'50%',top:'50%',width:`${petalSize}%`,height:`${petalSize*.8}%`,'--turn':`${i*137.5+variation*3}deg`,'--petal-offset':`${-8-i*.35}%`,'--petal-shape':`${58+variation*2}% 45% 65% 34%`,'--fold-turn':`${variation*3}deg`,zIndex:i}}><b/></i>;
 })}<span className={styles.roseCore}/>{bud&&<span className={styles.sepal}/>}</div>;
}
const leafSpecs=[
 [50,24,5,-20],[55,28,7,35],[44,30,6,-65],[37,32,5,-32],[63,32,5,32],
 [11,32,5,-63],[17,24,4,-23],[24,28,5,-38],[30,28,4,22],[70,28,4,-22],[76,28,5,38],[83,24,4,23],[89,32,5,63],
 [5,47,4,-82],[10,60,5,-120],[16,70,4,-160],[24,78,6,-125],[31,83,5,-166],[42,84,7,-152],[51,85,5,160],[60,84,5,140],[69,83,5,166],[76,78,6,125],[84,70,4,160],[90,60,5,120],[95,47,4,82],
 [20,56,7,-68],[27,62,7,-123],[35,67,6,-165],[65,67,6,165],[73,62,7,123],[80,56,7,68],
 [6,35,3,-65],[13,22,3,-36],[20,15,3,-20],[28,23,3,-25],[72,23,3,25],[80,15,3,20],[87,22,3,36],[94,35,3,65],
];
function Leaves(){return <div className={styles.foliage}>{leafSpecs.map(([x,y,size,turn],i)=><i key={i} className={`${styles.leaf} ${i%4===0?styles.lance:''}`} style={{left:`${x}%`,top:`${y}%`,width:`${size}%`,'--leaf-turn':`${turn}deg`}}><span/>{Array.from({length:6},(_,v)=><b key={v} style={{'--vein-y':`${16+v*12}%`,'--vein-turn':`${v%2?42:-42}deg`}}/>)}</i>)}</div>}
function Branch({right=false}){return <div className={`${styles.branch} ${right?styles.branchRight:''}`}><span className={styles.mainStem}/>{Array.from({length:8},(_,i)=><div className={styles.twig} key={i} style={{left:`${8+i*10}%`,top:`${82-i*8}%`,'--twig-turn':`${i%2?35:-30}deg`}}><i/><b/><b/><b/></div>)}</div>}
const roses=[
 {x:50,y:55,size:25,accent:true,z:15,rotation:10},
 {x:37,y:62,size:17,z:13,rotation:-15},{x:63,y:59,size:19,z:13,rotation:22},
 {x:25,y:53,size:13,accent:true,z:12,rotation:-20},{x:76,y:50,size:11,accent:true,z:12,rotation:20},
 {x:12,y:56,size:7,accent:true,z:10,rotation:16},{x:90,y:63,size:8,accent:true,z:10,rotation:-16},
 {x:40,y:79,size:8,accent:true,z:17,rotation:40},{x:62,y:78,size:6,z:16,rotation:23},
 {x:25,y:76,size:5,accent:true,z:15,rotation:-10},{x:77,y:80,size:4,accent:true,z:15,rotation:10},
 {x:5,y:34,size:7,accent:true,z:12,rotation:-35,bud:true},{x:95,y:34,size:7,accent:true,z:12,rotation:35,bud:true},
 {x:14,y:40,size:5,accent:true,z:12,rotation:-30,bud:true},{x:86,y:40,size:5,accent:true,z:12,rotation:30,bud:true},
];
/** Share the very same `colors` object used by CssEnvelope. */
export function CssFloralArrangement({color,colors,maxWidth=1000,className='',label='Arreglo floral de rosas claras y de acento con follaje detallado'}){
 return <div className={`${styles.arrangement} ${className}`} role="img" aria-label={label} data-css-floral style={{...createEnvelopeTheme({color,colors}),'--floral-width':typeof maxWidth==='number'?`${maxWidth}px`:maxWidth}}><div className={styles.drawing} aria-hidden="true"><Branch/><Branch right/><Leaves/><div className={styles.fillers}>{Array.from({length:28},(_,i)=><span key={i} className={styles.fillerCluster} style={{left:`${12+(i*13)%76}%`,top:`${26+(i*19)%50}%`}}>{Array.from({length:5},(_,j)=><i key={j} style={{'--bloom-turn':`${j*72}deg`}}/>)}<b/></span>)}</div><div className={styles.pearls}>{Array.from({length:22},(_,i)=><i key={i} style={{left:`${18+(i*17)%66}%`,top:`${29+(i*23)%44}%`,width:`${.55+(i%3)*.25}%`}}/>)}</div>{roses.map((rose,index)=><Rose {...rose} key={index}/>)}</div></div>;
}
