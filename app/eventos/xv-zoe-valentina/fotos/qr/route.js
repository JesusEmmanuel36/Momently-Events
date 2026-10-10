import QRCode from "qrcode";
import { zoeValentinaPhotos as guestPhotos } from "@/lib/event-photos/config";

export const runtime = "nodejs";

export async function GET(request) {
  const origin = process.env.GUEST_PHOTOS_PUBLIC_URL || "https://momentlyevents.vercel.app";
  const png = await QRCode.toBuffer(new URL(guestPhotos.path, origin).href, { type: "png", width: 1200, margin: 4, errorCorrectionLevel: "M", color: { dark: "#3e4b34", light: "#fffaf3" } });
  const headers = { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" };
  if (new URL(request.url).searchParams.has("download")) headers["Content-Disposition"] = 'attachment; filename="QR-fotos-Zoe-Valentina.png"';
  return new Response(png, { headers });
}
