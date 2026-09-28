"use client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase/client";
export function LogoutButton({ loginPath }) { const router = useRouter(); const logout = async () => { if (firebaseAuth) await signOut(firebaseAuth).catch(() => {}); await fetch("/api/auth/logout", { method: "POST" }); router.replace(loginPath); router.refresh(); }; return <button className="dashboard-logout" onClick={logout}>Cerrar sesión</button>; }
