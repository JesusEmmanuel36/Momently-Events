import "server-only";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { getAdminDb } from "../firebase/admin.js";
import { AppError, ForbiddenError, ValidationError } from "../errors.js";
import { guestPhotos, guestPhotosAreOpen } from "./config.js";

export function cloudinarySettings(env = process.env) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new AppError("La carga de fotos no está disponible por el momento. Intenta más tarde.", 503);
  }
  return { cloudName, apiKey, apiSecret };
}

export async function validatePhotoFile(file) {
  if (!(file instanceof Blob) || !file.size) throw new ValidationError("Selecciona una fotografía.");
  if (file.size > guestPhotos.maxFileBytes) throw new AppError("La fotografía es demasiado grande. Vuelve a seleccionarla para optimizarla.", 413);
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new ValidationError("Selecciona una foto JPG, PNG o WebP.");
  try {
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { limitInputPixels: 50_000_000, failOn: "warning" });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format) || !metadata.width || !metadata.height || (metadata.pages || 1) > 1) {
      throw new Error("Unsupported image");
    }
    // Decode, rotate and re-encode: no SVG, animations or embedded EXIF/GPS data.
    return await image.rotate().resize({ width: guestPhotos.maxDimension, height: guestPhotos.maxDimension, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 88 }).toBuffer();
  } catch {
    throw new ValidationError("No pudimos leer esta fotografía. Prueba con otra imagen JPG, PNG o WebP.");
  }
}

export async function enforcePhotoRateLimit(request, { db = getAdminDb(), now = Date.now() } = {}) {
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const pepper = process.env.RATE_LIMIT_PEPPER || process.env.CLOUDINARY_API_SECRET || "local";
  const key = createHash("sha256").update(`${guestPhotos.slug}:${ip}:${pepper}`).digest("hex");
  const collection = db.collection("guestPhotoRateLimits");
  const ipRef = collection.doc(key);
  const eventRef = collection.doc(guestPhotos.slug);
  await db.runTransaction(async transaction => {
    const [ipSnapshot, eventSnapshot] = await Promise.all([transaction.get(ipRef), transaction.get(eventRef)]);
    const limits = [[ipRef, ipSnapshot.data(), 120, 15 * 60 * 1000], [eventRef, eventSnapshot.data(), 2000, 60 * 60 * 1000]];
    const writes = limits.map(([ref, current, max, windowMs]) => {
      const ongoing = current && now - current.startedAt < windowMs;
      if (ongoing && current.count >= max) throw new AppError("Se han enviado muchas fotos en poco tiempo. Espera unos minutos y vuelve a intentar.", 429);
      return [ref, { count: ongoing ? current.count + 1 : 1, startedAt: ongoing ? current.startedAt : now, expiresAt: new Date(now + windowMs * 2) }];
    });
    for (const [ref, value] of writes) transaction.set(ref, value);
  });
}

export async function uploadPhotoToCloudinary(photo, uploadId, { env = process.env, fetcher = fetch } = {}) {
  const { cloudName, apiKey, apiSecret } = cloudinarySettings(env);
  const publicId = `${guestPhotos.folder}/${uploadId}`;
  const params = { folder: guestPhotos.folder, overwrite: "false", public_id: uploadId, tags: "caleb-y-ciriam,guest-photos", timestamp: String(Math.floor(Date.now() / 1000)) };
  const signatureInput = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join("&");
  const signature = createHash("sha1").update(signatureInput + apiSecret).digest("hex");
  const body = new FormData();
  body.set("file", new Blob([photo], { type: "image/jpeg" }), "foto.jpg");
  for (const [key, value] of Object.entries(params)) body.set(key, value);
  body.set("api_key", apiKey);
  body.set("signature", signature);
  let response;
  try {
    response = await fetcher(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body, signal: AbortSignal.timeout(25_000) });
  } catch {
    throw new AppError("No pudimos enviar la foto. Revisa tu conexión y vuelve a intentar.", 502);
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.asset_id || result.public_id !== publicId || result.resource_type !== "image") {
    throw new AppError("No pudimos guardar la foto. Intenta nuevamente en unos momentos.", 502);
  }
  return { ok: true, id: result.asset_id };
}

export async function processGuestPhoto(request, { rateLimit = enforcePhotoRateLimit, upload = uploadPhotoToCloudinary, env = process.env, now = Date.now() } = {}) {
  if (!guestPhotosAreOpen(now)) throw new AppError(`Aún no es la fecha del evento. Podrás compartir tus fotos a partir del ${guestPhotos.opensDateLabel}.`, 403, "photos_not_open");
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  // Next may normalize localhost in request.url; Host preserves the browser URL.
  const expectedOrigin = `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (!origin || origin !== expectedOrigin) throw new ForbiddenError("Origen de solicitud no permitido.");
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) throw new ValidationError("Solicitud de carga inválida.");
  const length = Number(request.headers.get("content-length") || 0);
  if (length > guestPhotos.maxFileBytes + 16 * 1024) throw new AppError("La fotografía es demasiado grande.", 413);
  cloudinarySettings(env);
  await rateLimit(request);
  let form;
  try { form = await request.formData(); } catch { throw new ValidationError("No pudimos recibir la fotografía."); }
  const uploadId = String(form.get("uploadId") || "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uploadId)) throw new ValidationError("Solicitud de carga inválida.");
  const file = await validatePhotoFile(form.get("file"));
  return upload(file, uploadId);
}
