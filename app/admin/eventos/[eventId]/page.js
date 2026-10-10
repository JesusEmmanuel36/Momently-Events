import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { EventActions, PublishControl } from "@/components/admin/EventActions";
import { OwnerInvite } from "@/components/admin/OwnerInvite";
import { OwnerAccount } from "@/components/admin/OwnerAccount";
import { EventForm } from "@/components/admin/EventForm";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { eventStatusLabel } from "@/lib/wedding/status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminEvent({ params }) {
  let user;
  try { user = await requireAdmin(); } catch { redirect("/admin/login"); }

  const { eventId } = await params;
  const snapshot = await getAdminDb().collection("events").doc(eventId).get();
  if (!snapshot.exists) notFound();

  const event = { id: snapshot.id, ...snapshot.data() };
  const couple = event.publicData?.couple;
  const title = event.publicData?.eventTitle || [couple?.partner1, couple?.partner2].filter(Boolean).join(" & ") || "Evento";
  const invitationPath = event.publicPath || `/eventos/${event.slug}`;
  const deadline = event.settings?.rsvp?.deadline?.toDate?.()?.toISOString?.().slice(0, 10) || "Sin fecha límite";
  const editable = ["flexible-celebration", "brown-romance"].includes(event.templateKey);
  const editorEvent = editable ? JSON.parse(JSON.stringify({ ...event, settings: { ...event.settings, rsvp: { ...event.settings?.rsvp, deadline: event.settings?.rsvp?.deadline?.toDate?.()?.toISOString?.() || event.settings?.rsvp?.deadline || null } } })) : null;

  return <DashboardShell area="admin" user={user}>
    <header className="dashboard-header">
      <div><span className="dashboard-eyebrow">Administrar evento</span><h1>{title}</h1><p>Estado: <span className={`status status--${event.status}`}>{eventStatusLabel(event.status)}</span></p></div>
      <div className="dashboard-header__actions"><Link className="button button--outline" href="/admin">Volver a eventos</Link>{event.status !== "archived" && <PublishControl event={{ id: event.id, status: event.status }} />}</div>
    </header>

    <section className="dashboard-card">
      <div className="dashboard-card__title"><div><h2>Información esencial</h2><p>{editable ? "Edita la invitación y guarda los cambios desde este panel." : "Esta invitación usa una plantilla específica del proyecto."}</p></div></div>
      <dl className="event-summary">
        <div><dt>Enlace público</dt><dd>{invitationPath}</dd></div>
        <div><dt>Fecha</dt><dd>{event.publicData?.weddingDate?.iso?.slice(0, 10) || "Sin fecha"}</dd></div>
        <div><dt>RSVP</dt><dd>{event.settings?.rsvp?.enabled === false ? "Desactivado" : "Activo"}</dd></div>
        <div><dt>Fecha límite RSVP</dt><dd>{deadline}</dd></div>
      </dl>
      <EventActions showManage={false} event={{ id: event.id, slug: event.slug, status: event.status, publicPath: event.publicPath }} />
    </section>

    {editable && <EventForm event={editorEvent} />}
    <OwnerAccount eventId={event.id} />
    <OwnerInvite eventId={event.id} ownerUids={event.ownerUids || []} />
  </DashboardShell>;
}
