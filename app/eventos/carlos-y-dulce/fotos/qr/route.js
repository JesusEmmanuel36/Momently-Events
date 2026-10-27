import QRCode from 'qrcode';
import {carlosDulcePhotos} from '@/lib/event-photos/config';
export const runtime='nodejs';
export async function GET(request){const origin=process.env.GUEST_PHOTOS_PUBLIC_URL||'https://momentlyevents.vercel.app';const png=await QRCode.toBuffer(new URL(carlosDulcePhotos.path,origin).href,{type:'png',width:1000,margin:4,errorCorrectionLevel:'M',color:{dark:'#514133',light:'#ffffff'}});return new Response(png,{headers:{'Content-Type':'image/png','Cache-Control':'public, max-age=3600',...(new URL(request.url).searchParams.has('download')?{'Content-Disposition':'attachment; filename="QR-fotos-Carlos-y-Dulce.png"'}:{})}})}
