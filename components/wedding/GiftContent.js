"use client";
import {useState} from "react";
import {Copy,Gift} from "lucide-react";
import styles from "./GiftContent.module.css";
export function GiftContent({message,gifts=[],bank,banks}) {
  const [feedback,setFeedback]=useState("");
  const accounts=banks ?? [bank];
  const fieldsFor=bank=>[["Banco",bank?.bank],["Titular",bank?.holder],["CLABE",bank?.clabe],["Cuenta",bank?.account]].filter(([,value])=>value);
  const copy=async(value)=>{try{await navigator.clipboard.writeText(value);setFeedback("Datos copiados.");}catch{setFeedback("No se pudo copiar. Puedes seleccionar y copiar los datos que aparecen aquí.");}};
  return <div className={styles.content}><Gift size={32} strokeWidth={1}/><h2>Mesa de regalos</h2>{message&&<p>{message}</p>}{gifts.map((gift,i)=><article key={i}><h3>{gift.name}</h3>{gift.description&&<p>{gift.description}</p>}{gift.url&&<a href={gift.url} target="_blank" rel="noopener noreferrer">Ver mesa de regalos</a>}</article>)}{accounts.filter(account=>account?.enabled).map((account,index)=>{const fields=fieldsFor(account);return fields.length>0&&<div className={styles.bank} key={index}><h3>Transferencia bancaria</h3><dl>{fields.map(([label,value])=><div key={label}><dt>{label}</dt><dd><span>{value}</span>{["CLABE","Cuenta"].includes(label)&&<button type="button" onClick={()=>copy(String(value).replace(/\s/g,""))} aria-label={`Copiar ${label}`}><Copy size={15}/><span>Copiar</span></button>}</dd></div>)}</dl><button type="button" onClick={()=>copy(fields.map(([label,value])=>`${label}: ${value}`).join("\n"))}><Copy size={16}/>Copiar datos bancarios</button><p role="status" className={styles.feedback}>{feedback}</p></div>})}</div>;
}
