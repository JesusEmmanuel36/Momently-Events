"use client";

import { useEffect, useState } from "react";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";

export function LiveInvitationPreview({ event }) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1200px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!desktop) return null;

  return <aside className="live-preview" aria-label="Vista previa en vivo de la invitación">
    <div className="live-preview__toolbar">
      <div className="live-preview__dots" aria-hidden="true"><i /><i /><i /></div>
      <strong>Vista previa en vivo</strong>
      <span>Escritorio</span>
    </div>
    <div className="live-preview__viewport">
      {event ? <div className="live-preview__canvas" inert={true}><WeddingRenderer event={event} previewMode /></div> : <div className="live-preview__loading">Preparando invitación…</div>}
    </div>
    <p>Los cambios aparecen automáticamente. Guarda el borrador para conservarlos.</p>
  </aside>;
}
