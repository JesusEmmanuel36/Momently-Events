import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { apiError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";

export async function POST(request) {
  try { assertSameOrigin(request); const response = Response.json({ ok: true }); response.headers.append("Set-Cookie", `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`); return response; } catch (error) { return apiError(error); }
}
