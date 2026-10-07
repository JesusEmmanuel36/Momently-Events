import "server-only";
import { AppError, ValidationError } from "../errors.js";
import { guestPhotos } from "./config.js";
import { cloudinarySettings } from "./server.js";

export async function listGuestPhotos(cursor = "", { env = process.env, fetcher = fetch, event = guestPhotos } = {}) {
  if (cursor.length > 512 || /[^a-zA-Z0-9_=-]/.test(cursor)) throw new ValidationError("Página de fotos inválida.");
  const { cloudName, apiKey, apiSecret } = cloudinarySettings(env);
  const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);
  url.searchParams.set("prefix", event.folder + "/");
  url.searchParams.set("max_results", "30");
  if (cursor) url.searchParams.set("next_cursor", cursor);
  let response;
  try {
    response = await fetcher(url, {
      headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}` },
      next: { revalidate: 60 }, signal: AbortSignal.timeout(15_000),
    });
  } catch { throw new AppError("No pudimos cargar las fotos. Intenta nuevamente.", 502); }
  const result = await response.json().catch(() => null);
  if (!response.ok || !Array.isArray(result?.resources)) throw new AppError("No pudimos cargar las fotos. Intenta nuevamente.", 502);
  const photos = result.resources.filter(photo => photo.public_id?.startsWith(event.folder + "/") && photo.resource_type === "image" && photo.secure_url?.startsWith(`https://res.cloudinary.com/${cloudName}/image/upload/`)).map(photo => ({
    id: photo.asset_id, url: photo.secure_url,
    thumbnail: photo.secure_url.replace("/image/upload/", "/image/upload/c_fill,w_500,h_500,q_auto,f_auto/"),
  }));
  return { photos, nextCursor: result.next_cursor || null };
}
