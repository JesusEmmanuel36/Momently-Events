"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";

function MobileCanvas({children}) {
  const frame = useRef(null);
  const [target,setTarget] = useState(null);
  useEffect(() => {
    const doc=frame.current?.contentDocument;
    if(!doc)return;
    doc.documentElement.lang="es";
    doc.body.style.margin="0";
    const copyStyles=()=>{
      doc.head.querySelectorAll('[data-preview-style]').forEach(node=>node.remove());
      document.head.querySelectorAll('style,link[rel="stylesheet"]').forEach(node=>{const copy=node.cloneNode(true);copy.setAttribute('data-preview-style','');doc.head.appendChild(copy);});
      doc.documentElement.className=document.documentElement.className;
      doc.body.className=document.body.className;
    };
    copyStyles();setTarget(doc.body);
    const observer=new MutationObserver(copyStyles);
    observer.observe(document.head,{childList:true,subtree:true,characterData:true});
    return()=>observer.disconnect();
  },[]);
  return <><iframe ref={frame} title="Vista previa de la invitación en celular" className="live-preview__phone"/>{target&&createPortal(children,target)}</>;
}

export function LiveInvitationPreview({ event }) {
  const [desktop, setDesktop] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [envelope, setEnvelope] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1200px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!desktop && !showMobile) return <button type="button" className="button" onClick={() => setShowMobile(true)}>Mostrar vista previa</button>;

  return <aside className="live-preview live-preview--visible" aria-label="Vista previa en vivo de la invitación">
    <div className="live-preview__toolbar">
      <div className="live-preview__dots" aria-hidden="true"><i /><i /><i /></div>
      <strong>Vista previa en vivo</strong>
      <span>Celular · 390 px</span>
    </div>
    {event?.templateKey === "flexible-celebration" && <div className="preview-controls"><button type="button" onClick={() => setEnvelope(false)} aria-pressed={!envelope}>Invitación</button><button type="button" onClick={() => setEnvelope(true)} aria-pressed={envelope}>Probar sobre</button>{!desktop && <button type="button" onClick={() => setShowMobile(false)}>Cerrar vista previa</button>}</div>}
    <div className="live-preview__viewport">
      {event ? <MobileCanvas><div inert={event.templateKey !== "flexible-celebration"}><WeddingRenderer key={`${event.templateKey}-${envelope}`} event={event} previewMode previewEnvelope={envelope} /></div></MobileCanvas> : <div className="live-preview__loading">Preparando invitación…</div>}
    </div>
    <p>Los cambios aparecen automáticamente. Guarda el borrador para conservarlos.</p>
  </aside>;
}
