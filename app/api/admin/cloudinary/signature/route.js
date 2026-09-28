import { createHash } from "node:crypto";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { apiError, ValidationError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/security/same-origin";

export const runtime = "nodejs";

const inputSchema = z.object({
  eventId: z.string().trim().regex(/^[a-zA-Z0-9_-]{1,128}$/).optional(),
  kind: z.enum(["images", "audio", "video"]),
});

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const admin = await requireAdmin();
    const parsed = inputSchema.safeParse(await request.json());
    if (!parsed.success) throw new ValidationError("Solicitud de carga inválida.");
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) throw new ValidationError("Cloudinary no está configurado. Revisa las variables de entorno.");
    const ownerFolder = parsed.data.eventId || `drafts-${admin.uid}`;
    const folder = `momently-events/${ownerFolder}/${parsed.data.kind}`;
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
    return Response.json({ cloudName, apiKey, timestamp, signature, folder });
  } catch (error) {
    return apiError(error);
  }
}
