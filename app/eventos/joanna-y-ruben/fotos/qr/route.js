import QRCode from "qrcode";
import { joannaRubenPhotos as guestPhotos } from "@/lib/event-photos/config";

export const runtime = "nodejs";

export async function GET(request) {
  // Production URL stays stable even when the PNG is downloaded from localhost.
  const origin = process.env.GUEST_PHOTOS_PUBLIC_URL || "https://momentlyevents.vercel.app";
  const png = await QRCode.toBuffer(new URL(guestPhotos.path, origin).href, { type: "png", width: 1200, margin: 4, errorCorrectionLevel: "M", color: { dark: "#792b40", light: "#ffffff" } });
  const headers = { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" };
  if (new URL(request.url).searchParams.has("download")) headers["Content-Disposition"] = 'attachment; filename="QR-fotos-Joanna-y-Ruben.png"';
  return new Response(png, { headers });
}
