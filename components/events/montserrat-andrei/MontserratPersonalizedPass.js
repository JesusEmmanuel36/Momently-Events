"use client";
import { useEffect, useState } from "react";
import styles from "./MontserratAndrei.module.css";

export function MontserratPersonalizedPass({ pass, token, wedding }) {
  const [people, setPeople] = useState(pass.response?.attending === "no" ? 0 : (pass.response?.totalPeople ?? pass.allowedSeats));
  const [saved, setSaved] = useState(Boolean(pass.response));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const update = () => setClosed(Date.now() > new Date(wedding.rsvpDeadlineISO).getTime());
    update();const timer=setInterval(update,1000);return()=>clearInterval(timer);
  }, [wedding.rsvpDeadlineISO]);
  async function submit(event) {
    event.preventDefault();if(busy||closed)return;
    setBusy(true);setError("");
    try {
      const response=await fetch(`/api/public/event-passes/${wedding.slug}/${token}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({attending:Number(people)>0?"yes":"no",totalPeople:Number(people),message:pass.response?.message||""})});
      const data=await response.json();
      if(!response.ok||data.ok!==true||!data.rsvpId)throw Error(data.error||"No pudimos guardar tu respuesta. Intenta nuevamente.");
      setSaved(true);
    }catch(cause){setError(cause.message||"Revisa tu conexión e intenta nuevamente.");}
    finally{setBusy(false);}
  }
  return <section className={styles.personalizedSection} id="tu-pase" aria-labelledby="personalized-title">
    <span className="eyebrow">Confirma tu asistencia</span>
    <p className={styles.deadline}>Confirma a más tardar el <strong>{wedding.rsvpDeadline}</strong>.</p>
    <div className={styles.passCard}>
      <div className={styles.passGreeting}><h2 id="personalized-title">¡Hola, {pass.displayName}!</h2><p>Hemos reservado un máximo de <strong>{pass.allowedSeats} {pass.allowedSeats===1?"pase":"pases"}</strong> para ti y tu familia.</p><small>Los lugares incluyen a la persona titular del pase.</small></div>
      {saved?<div className={styles.passSuccess} role="status"><h3>Tu respuesta está guardada</h3><p>{Number(people)>0?`Asistirán ${people} de ${pass.allowedSeats} personas. ¡Gracias por confirmar!`:"Gracias por avisarnos que no podrás asistir."}</p>{!closed&&<button type="button" onClick={()=>setSaved(false)}>Editar respuesta</button>}</div>:closed?<p className={styles.passClosed} role="status">El periodo de confirmación ha terminado.</p>:<form onSubmit={submit}>
        <label htmlFor="pass-people">¿Cuántos pases utilizarán?</label>
        <select id="pass-people" name="people" value={people} onChange={event=>setPeople(Number(event.target.value))} disabled={busy}>
          {Array.from({length:pass.allowedSeats},(_,i)=>i+1).map(n=><option key={n} value={n}>Asistirá{n===1?"":"n"} {n} de {pass.allowedSeats} {pass.allowedSeats===1?"persona":"personas"}</option>)}
          <option value={0}>No podremos asistir</option>
        </select>
        {error&&<p className={styles.passError} role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy?"Guardando…":"Confirmar asistencia"}</button>
      </form>}
    </div>
  </section>;
}
