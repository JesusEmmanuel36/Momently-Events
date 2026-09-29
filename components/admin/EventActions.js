"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EventActions({ event, showManage = true }) {
  const router = useRouter(); const [busy, setBusy] = useState(false);
  const act = async (action, confirmText) => { if (confirmText && !window.confirm(confirmText)) return; setBusy(true); const response = await fetch(`/api/admin/events/${event.id}/${action}`, { method: "POST" }); setBusy(false); if (!response.ok) { const body = await response.json(); alert(body.error || "No fue posible completar la acción."); return; } router.refresh(); };
  const invitationPath = event.publicPath || `/eventos/${event.slug}`;
  const copy = () => navigator.clipboard.writeText(`${window.location.origin}${invitationPath}`);
  return <div className="table-actions">{showManage && <Link href={`/admin/eventos/${event.id}`}>Administrar</Link>}{event.status === "published" && <><a href={invitationPath} target="_blank" rel="noreferrer">Abrir</a><button onClick={copy}>Copiar enlace</button></>}{event.status !== "archived" && (event.status === "published" ? <button disabled={busy} onClick={() => act("unpublish", "La invitación dejará de ser pública. ¿Continuar?")}>Despublicar</button> : <button disabled={busy} onClick={() => act("publish")}>Publicar</button>)}</div>;
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
