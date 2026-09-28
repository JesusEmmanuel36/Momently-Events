import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminStorage } from "@/lib/firebase/admin";
import { apiError, ForbiddenError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";
export const runtime = "nodejs";
export async function DELETE(request, { params }) { try { assertSameOrigin(request); await requireAdmin(); const { eventId } = await params; const parsed = z.object({ path: z.string().min(1).max(500) }).safeParse(await request.json()); if (!parsed.success) throw new ValidationError("Ruta de archivo inválida."); const prefix = `events/${eventId}/public/`; if (!parsed.data.path.startsWith(prefix) || parsed.data.path.includes("..")) throw new ForbiddenError("No puedes eliminar este archivo."); await getAdminStorage().bucket().file(parsed.data.path).delete({ ignoreNotFound: true }); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
