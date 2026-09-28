import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@/lib/errors";

export const SESSION_COOKIE_NAME = "momently_session";
export const sessionMaxAgeMs = () => Number(process.env.SESSION_COOKIE_MAX_AGE_DAYS || 5) * 24 * 60 * 60 * 1000;

export async function requireSession() {
  const store = await cookies(); const cookie = store.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) throw new UnauthorizedError();
  try { return await getAdminAuth().verifySessionCookie(cookie, true); } catch { throw new UnauthorizedError("Tu sesión expiró. Inicia sesión nuevamente."); }
}

export async function getOptionalSession() { try { return await requireSession(); } catch { return null; } }

export async function requireAdmin() {
  const session = await requireSession();
  if (session.admin !== true) throw new ForbiddenError("Esta área es exclusiva para administradores.");
  return session;
}

export async function requireEventOwner(eventId) {
  const session = await requireSession(); const ref = getAdminDb().collection("events").doc(eventId); const snapshot = await ref.get();
  if (!snapshot.exists) throw new NotFoundError();
  const event = snapshot.data();
  if (session.admin !== true && !event.ownerUids?.includes(session.uid)) throw new ForbiddenError();
  return { session, event: { id: snapshot.id, ...event }, ref };
}
