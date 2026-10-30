import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminEventList } from "@/components/admin/AdminEventList";
import { eventListItem,eventListCounts } from "@/lib/admin/event-list";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default async function AdminHome() {
 if (!isFirebaseAdminConfigured()) return <main className="setup-required"><h1>Configura Firebase</h1><p>Completa `.env.local` siguiendo `FIREBASE_SETUP.md` para habilitar el administrador.</p></main>;
 let user;try { user = await requireAdmin(); } catch { redirect("/admin/login"); }
 // Project list fields only: searching/paging locally avoids downloading invitation designs
 // and does not perform additional Firestore reads for every keystroke or page.
 const snapshot=await getAdminDb().collection("events").select("slug","status","publicPath","createdAt","publicData.eventTitle","publicData.couple.partner1","publicData.couple.partner2","publicData.weddingDate.iso").get();
 const events=snapshot.docs.map(doc=>eventListItem(doc.id,doc.data())).sort((a,b)=>b.createdAt-a.createdAt||a.id.localeCompare(b.id));
 const counts=eventListCounts(events);
 return <DashboardShell area="admin" user={user}><header className="dashboard-header"><div><span className="dashboard-eyebrow">Administración</span><h1>Eventos</h1><p>Consulta las invitaciones, controla su publicación y entrega el acceso a cada cliente.</p></div><div className="admin-actions"><Link className="button" href="/admin/bodas/nueva">Crear invitación</Link><Link className="button" href="/admin/crear-con-ia">Crear con IA</Link></div></header><div className="stats-grid"><article><span>Total eventos</span><strong>{counts.total}</strong></article><article><span>Publicados</span><strong>{counts.published}</strong></article><article><span>Borradores</span><strong>{counts.draft}</strong></article><article><span>Archivados</span><strong>{counts.archived}</strong></article></div><AdminEventList events={events}/></DashboardShell>;
}
