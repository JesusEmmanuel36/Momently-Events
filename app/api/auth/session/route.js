import { getAdminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME, sessionMaxAgeMs } from "@/lib/auth/session";
import { apiError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";

export const runtime = "nodejs";
export async function POST(request) {
  try {
    assertSameOrigin(request); const { idToken } = await request.json(); if (!idToken) throw new ValidationError("Token de sesión requerido.");
    const decoded = await getAdminAuth().verifyIdToken(idToken); const age = sessionMaxAgeMs(); const sessionCookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn: age });
    const response = Response.json({ ok: true, user: { uid: decoded.uid, email: decoded.email || "", admin: decoded.admin === true } });
    response.headers.append("Set-Cookie", `${SESSION_COOKIE_NAME}=${sessionCookie}; Max-Age=${Math.floor(age / 1000)}; Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
    return response;
  } catch (error) { return apiError(error); }
}
