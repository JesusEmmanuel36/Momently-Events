import Link from "next/link";
import { CalendarHeart, LayoutDashboard, UsersRound } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function DashboardShell({ area, user, children }) {
  const admin = area === "admin";
  return <div className="dashboard"><aside className="dashboard-sidebar"><Link href={admin ? "/admin" : "/panel"} className="dashboard-logo"><span>M</span><div>Momently<small>Events</small></div></Link><nav><Link href={admin ? "/admin" : "/panel"}><LayoutDashboard />Resumen</Link>{admin && <Link href="/admin"><CalendarHeart />Eventos</Link>}{admin && <Link href="/admin/bodas/nueva"><CalendarHeart />Crear invitación</Link>}{!admin && <Link href="/panel"><UsersRound />Mis eventos</Link>}</nav><div className="dashboard-user"><span>{user.email?.slice(0, 1).toUpperCase()}</span><div><strong>{user.email}</strong><small>{admin ? "Administrador" : "Propietario"}</small></div></div><LogoutButton loginPath={admin ? "/admin/login" : "/panel/login"} /></aside><div className="dashboard-main">{children}</div></div>;
}
