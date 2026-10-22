"use client";
import {useEffect,useId,useRef,useState} from "react";
import {hexToHsv,hsvToHex} from "@/lib/wedding/color-picker";
export function HexColorField({name,defaultValue="#000000"}) {
 const [value,setValue]=useState(defaultValue.toUpperCase()),[hsv,setHsv]=useState(()=>hexToHsv(defaultValue)),[open,setOpen]=useState(false);
 const root=useRef(null),input=useRef(null),id=useId();
 const valid=/^#[0-9a-f]{6}$/i.test(value);
 useEffect(()=>{input.current?.dispatchEvent(new Event("input",{bubbles:true}));},[value]);
 useEffect(()=>{if(!open)return;const close=e=>{if(!root.current?.contains(e.target))setOpen(false);};const key=e=>{if(e.key==="Escape"){setOpen(false);root.current?.querySelector("button")?.focus();}};document.addEventListener("pointerdown",close);document.addEventListener("keydown",key);return()=>{document.removeEventListener("pointerdown",close);document.removeEventListener("keydown",key);};},[open]);
 const update=next=>{setHsv(next);setValue(hsvToHex(next));};
 const edit=raw=>{const next=raw.toUpperCase();setValue(next);if(/^#[0-9A-F]{6}$/.test(next))setHsv(hexToHsv(next));};
 const point=e=>{const rect=e.currentTarget.getBoundingClientRect();update({...hsv,s:Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width)),v:1-Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height))});};
 return <span className="admin-hex-color" ref={root}>
  <button type="button" className="admin-color-swatch" style={{background:valid?value:defaultValue}} aria-label={`Elegir color ${name}`} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}/>
  <input ref={input} type="text" name={name} aria-label={`HEX ${name}`} value={value} onChange={e=>edit(e.target.value)} pattern="#[0-9A-Fa-f]{6}" maxLength={7} required spellCheck={false} autoComplete="off" placeholder="#FFFFFF" title="Color HEX de seis dígitos, por ejemplo #D8C3A5"/>
  {open&&<span id={id} className="admin-color-picker" role="group" aria-label="Selector de color HEX" onClick={e=>{if(!e.target.closest("input,button"))e.preventDefault();}}>
   <span className="admin-color-square" style={{backgroundColor:`hsl(${hsv.h} 100% 50%)`}} role="slider" tabIndex={0} aria-label="Saturación y luminosidad" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(hsv.s*100)} aria-valuetext={`Saturación ${Math.round(hsv.s*100)}%, luminosidad ${Math.round(hsv.v*100)}%`} onPointerDown={e=>{e.preventDefault();e.currentTarget.focus();e.currentTarget.setPointerCapture(e.pointerId);point(e);}} onPointerMove={e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))point(e);}} onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();update({...hsv,s:Math.max(0,Math.min(1,hsv.s+(e.key==='ArrowRight'?.01:e.key==='ArrowLeft'?-.01:0))),v:Math.max(0,Math.min(1,hsv.v+(e.key==='ArrowUp'?.01:e.key==='ArrowDown'?-.01:0)))});}}><span style={{left:`${hsv.s*100}%`,top:`${(1-hsv.v)*100}%`}}/></span>
   <input className="admin-color-hue" type="range" min="0" max="359" step="1" aria-label="Tono del color" value={Math.round(hsv.h)} onChange={e=>update({...hsv,h:Number(e.target.value)})}/>
   <span className="admin-color-code"><strong>HEX</strong><input type="text" aria-label="Código HEX del selector" value={value} onChange={e=>edit(e.target.value)} pattern="#[0-9A-Fa-f]{6}" maxLength={7} spellCheck={false}/></span>
   <button type="button" onClick={()=>setOpen(false)}>Listo</button>
  </span>}
 </span>;
}
