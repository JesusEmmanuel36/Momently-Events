import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EventForm } from "@/components/admin/EventForm";
export const dynamic = "force-dynamic";

export default async function NewEvent() {
  let user; try { user = await requireAdmin(); } catch { redirect("/admin/login"); }
  return <DashboardShell area="admin" user={user}><header className="dashboard-header"><div><h1>Crear invitación</h1><p>Personaliza la plantilla y activa las secciones que necesites.</p></div></header><EventForm /></DashboardShell>;
}
