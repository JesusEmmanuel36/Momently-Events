"use client";

import { useEffect, useState } from "react";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";

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
      <span>{desktop ? "Escritorio" : "Móvil"}</span>
    </div>
    {event?.templateKey === "flexible-celebration" && <div className="preview-controls"><button type="button" onClick={() => setEnvelope(false)} aria-pressed={!envelope}>Invitación</button><button type="button" onClick={() => setEnvelope(true)} aria-pressed={envelope}>Probar sobre</button>{!desktop && <button type="button" onClick={() => setShowMobile(false)}>Cerrar vista previa</button>}</div>}
    <div className="live-preview__viewport">
      {event ? <div className="live-preview__canvas" inert={event.templateKey !== "flexible-celebration"}><WeddingRenderer key={`${event.templateKey}-${envelope}`} event={event} previewMode previewEnvelope={envelope} /></div> : <div className="live-preview__loading">Preparando invitación…</div>}
    </div>
    <p>Los cambios aparecen automáticamente. Guarda el borrador para conservarlos.</p>
  </aside>;
}
