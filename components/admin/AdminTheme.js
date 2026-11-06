"use client";
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';
import './AdminTheme.css';
const key='momently:admin-theme';
export function AdminTheme({children}){
 const[theme,setTheme]=useState('light');
 useEffect(()=>{try{setTheme(localStorage.getItem(key)==='dark'?'dark':'light')}catch{}},[]);
 const toggle=()=>setTheme(current=>{const next=current==='dark'?'light':'dark';try{localStorage.setItem(key,next)}catch{}return next});
 return <div className="admin-theme" data-admin-theme={theme}><button type="button" className="admin-theme-toggle" aria-pressed={theme==='dark'} onClick={toggle} title={theme==='dark'?'Cambiar a modo claro':'Cambiar a modo oscuro'}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}<span>{theme==='dark'?'Modo claro':'Modo oscuro'}</span></button>{children}</div>;
}
