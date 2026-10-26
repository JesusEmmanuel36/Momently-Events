"use client";
import { useState } from "react";

export function OwnerInvite({ eventId, ownerUids = [] }) {
  const [email, setEmail] = useState("");
  const [owners, setOwners] = useState(ownerUids);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const create = async (event) => {
    event.preventDefault();
    setError(""); setNotice(""); setResult(null); setBusy(true);
    try {
      const response = await fetch(`/api/admin/events/${eventId}/owner-invites`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "No se pudo generar el acceso.");
      setResult(body);
    } catch (error) { setError(error.message || "No se pudo generar el acceso. Intenta nuevamente."); }
    finally { setBusy(false); }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(result.inviteUrl); setNotice("Enlace copiado."); }
    catch { setError("No se pudo copiar. Puedes seleccionar y copiar el enlace."); }
  };
  const remove = async (uid) => {
    if (!window.confirm("¿Quitar el acceso de esta cuenta a este evento? Podrás agregar otra cuenta después.")) return;
    setError(""); setNotice(""); setBusy(true);
    try {
      const response = await fetch(`/api/admin/events/${eventId}/owners/${uid}`, { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "No se pudo quitar el acceso.");
      setOwners(current => current.filter(item => item !== uid));
      setNotice("Acceso retirado. Ya puedes dar acceso a la cuenta correcta.");
    } catch (error) { setError(error.message || "No se pudo quitar el acceso. Intenta nuevamente."); }
    finally { setBusy(false); }
  };
  return <section className="dashboard-card owner-access">
    <div className="dashboard-card__title"><div><h2>Acceso al panel</h2><p>Genera un enlace seguro con vigencia de 48 horas.</p></div></div>
    {owners.length > 0 ? <div className="owner-list">{owners.map(uid => <div key={uid}><code>{uid}</code><button type="button" onClick={() => remove(uid)} disabled={busy}>Quitar acceso</button></div>)}</div> : <p>Sin cuentas con acceso. Agrega el correo del cliente para darle acceso.</p>}
    <form onSubmit={create}><label className="admin-field"><span>Correo del cliente</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={busy}/></label><button className="button" disabled={busy}>{busy ? "Procesando…" : "Dar acceso a cliente"}</button></form>
    {error && <p className="form__error" role="alert">{error}</p>}
    {notice && <p role="status">{notice}</p>}
    {result && <div className="invite-result"><strong>Comparte este enlace con el cliente</strong><input readOnly value={result.inviteUrl}/><button type="button" className="text-link" onClick={copy}>Copiar enlace</button><small>Expira: {new Date(result.expiresAt).toLocaleString("es-MX")}</small></div>}
  </section>;
}
