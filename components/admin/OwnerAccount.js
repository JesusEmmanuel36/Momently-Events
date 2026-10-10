"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function OwnerAccount({ eventId }) {
  const [busy,setBusy]=useState(false),[error,setError]=useState(""),[done,setDone]=useState(false); const router=useRouter();
  const submit=async e=>{e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);try{const response=await fetch(`/api/admin/events/${eventId}/owner-account`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:f.get("email"),password:f.get("password")})});const body=await response.json();if(!response.ok)throw Error(body.error);setDone(true);e.target.reset();router.refresh();}catch(cause){setError(cause.message);}finally{setBusy(false);}};
  return <section className="dashboard-card"><h2>Crear cuenta del cliente</h2><p>El cliente podrá entrar directamente en /panel/login. Para un correo que ya tiene cuenta, usa el enlace de activación de abajo.</p><form onSubmit={submit} className="admin-grid"><label className="admin-field"><span>Correo</span><input name="email" type="email" autoComplete="off" required/></label><label className="admin-field"><span>Contraseña inicial</span><input name="password" type="password" autoComplete="new-password" minLength={8} required/></label><button className="button" disabled={busy}>{busy?"Creando…":"Crear cuenta y dar acceso"}</button></form>{error&&<p className="form__error">{error}</p>}{done&&<p role="status">Cuenta creada y acceso asignado a este evento.</p>}</section>;
}
