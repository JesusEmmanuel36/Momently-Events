import "server-only";
import { ForbiddenError } from "@/lib/errors";

export function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  const allowed = new URL(process.env.APP_URL || request.url).origin;
  if (origin !== allowed) throw new ForbiddenError("Origen de solicitud no permitido.");
}
