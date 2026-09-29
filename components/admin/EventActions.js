"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EventActions({ event }) {
  const router = useRouter(); const [busy, setBusy] = useState(false);
  const act = async (action, confirmText) => { if (confirmText && !window.confirm(confirmText)) return; setBusy(true); const response = await fetch(`/api/admin/events/${event.id}/${action}`, { method: "POST" }); setBusy(false); if (!response.ok) { const body = await response.json(); alert(body.error || "No fue posible completar la acción."); return; } router.refresh(); };
  const invitationPath = event.publicPath || `/boda/${event.slug}`;
  const copy = () => navigator.clipboard.writeText(`${window.location.origin}${invitationPath}`);
  return <div className="table-actions"><Link href={`/admin/bodas/${event.id}`}>Editar</Link><Link href={`/admin/bodas/${event.id}/preview`}>Vista previa</Link>{event.status === "published" ? <><a href={invitationPath} target="_blank">Abrir</a><button onClick={copy}>Copiar enlace</button><button disabled={busy} onClick={() => act("unpublish", "La invitación dejará de ser pública. ¿Continuar?")}>Despublicar</button></> : <button disabled={busy} onClick={() => act("publish")}>Publicar</button>}<button disabled={busy || event.status === "archived"} onClick={() => act("archive", "La boda se archivará sin eliminar sus datos. ¿Continuar?")}>Archivar</button></div>;
}

export function PublishControl({ event }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const published = event.status === "published";
  const act = async () => {
    if (published && !window.confirm("La invitación dejará de ser pública. ¿Continuar?")) return;
    setBusy(true);
    const response = await fetch(`/api/admin/events/${event.id}/${published ? "unpublish" : "publish"}`, { method: "POST" });
    setBusy(false);
    if (!response.ok) { const body = await response.json(); alert(body.error || "No fue posible cambiar la publicación."); return; }
    router.refresh();
  };
  return <button type="button" className="button" disabled={busy} onClick={act}>{busy ? "Procesando…" : published ? "Despublicar invitación" : "Publicar invitación"}</button>;
}
