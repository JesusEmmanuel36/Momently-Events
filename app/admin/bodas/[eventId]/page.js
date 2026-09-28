import { notFound, redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EventForm } from "@/components/admin/EventForm";
import { PublishControl } from "@/components/admin/EventActions";
import { OwnerInvite } from "@/components/admin/OwnerInvite";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { eventStatusLabel } from "@/lib/wedding/status";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export default async function EditWedding({ params }) { let user; try { user = await requireAdmin(); } catch { redirect("/admin/login"); } const { eventId } = await params; const snap = await getAdminDb().collection("events").doc(eventId).get(); if (!snap.exists) notFound(); const raw = snap.data(); const event = { id: snap.id, slug: raw.slug, status: raw.status, templateKey: raw.templateKey, publicData: raw.publicData, settings: { ...raw.settings, rsvp: { ...raw.settings?.rsvp, deadline: raw.settings?.rsvp?.deadline?.toDate?.()?.toISOString?.() || raw.settings?.rsvp?.deadline || "" } } }; return <DashboardShell area="admin" user={user}><header className="dashboard-header"><div><span className="dashboard-eyebrow">Editar invitación</span><h1>{raw.publicData?.couple?.partner1} & {raw.publicData?.couple?.partner2}</h1><p>Estado actual: <span className={`status status--${raw.status}`}>{eventStatusLabel(raw.status)}</span></p></div><div className="dashboard-header__actions"><a className="button button--outline" href={`/admin/bodas/${eventId}/preview`}>Vista previa</a><PublishControl event={{ id: eventId, status: raw.status }} /></div></header><EventForm event={event} /><OwnerInvite eventId={eventId} ownerUids={raw.ownerUids || []} /></DashboardShell>; }
