"use client";
import Link from "next/link";
export default function PanelError({reset}) {
  return <main className="setup-required"><h1>El panel no está disponible por el momento</h1><p>No pudimos consultar la información. Esto no significa que tus datos se hayan eliminado.</p><p>Espera un momento antes de volver a intentarlo. Si el problema continúa, contacta a Momently Events.</p><button className="button" type="button" onClick={reset}>Volver a intentar</button><p><Link href="/eventos">Ver invitaciones</Link></p></main>;
}
