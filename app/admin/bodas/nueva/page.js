import { redirect } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireAdmin } from "@/lib/auth/session";
export default async function NewWedding() { let user; try { user = await requireAdmin(); } catch { redirect("/admin/login"); } return <DashboardShell area="admin" user={user}><header className="dashboard-header"><div><span className="dashboard-eyebrow">Nueva invitación</span><h1>Crear boda</h1><p>La invitación se guardará inicialmente como borrador.</p></div></header><EventForm /></DashboardShell>; }
