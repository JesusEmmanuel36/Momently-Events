import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { AppError } from "@/lib/errors";
import { hashToken } from "@/lib/security/crypto";

export async function enforceRsvpRateLimit(request, eventId) {
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const pepper = process.env.RATE_LIMIT_PEPPER || "development-only-pepper";
  const key = hashToken(`${eventId}:${ip}:${pepper}`); const ref = getAdminDb().collection("rateLimits").doc(key);
  const now = Date.now(); const windowMs = 15 * 60 * 1000;
  await getAdminDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref); const current = snapshot.data();
    const started = current?.windowStartedAt?.toMillis?.() || 0;
    if (current && now - started < windowMs && current.count >= 10) throw new AppError("Demasiados intentos. Espera unos minutos.", 429, "rate_limited");
    const count = current && now - started < windowMs ? current.count + 1 : 1;
    transaction.set(ref, { count, windowStartedAt: Timestamp.fromMillis(current && now - started < windowMs ? started : now), expiresAt: Timestamp.fromMillis(now + windowMs * 2) });
  });
}
