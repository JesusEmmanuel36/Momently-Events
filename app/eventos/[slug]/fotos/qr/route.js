import QRCode from 'qrcode';
import {publishedAiPhotos} from '@/lib/event-photos/dynamic-server';
import {apiError} from '@/lib/errors';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(request,{params}){try{const {slug}=await params,event=await publishedAiPhotos(slug);const origin=process.env.GUEST_PHOTOS_PUBLIC_URL||process.env.APP_URL||'https://momentlyevents.vercel.app';const png=await QRCode.toBuffer(new URL(event.path,origin).href,{type:'png',width:800,margin:3,errorCorrectionLevel:'M'});return new Response(png,{headers:{'Content-Type':'image/png','Cache-Control':'no-store',...(new URL(request.url).searchParams.has('download')?{'Content-Disposition':`attachment; filename="QR-fotos-${slug}.png"`}:{})}})}catch(error){return apiError(error)}}
