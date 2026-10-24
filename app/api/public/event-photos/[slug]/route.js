import {publishedAiPhotos} from '@/lib/event-photos/dynamic-server';
import {guestPhotosAreOpen} from '@/lib/event-photos/config';
import {processGuestPhoto} from '@/lib/event-photos/server';
import {listGuestPhotos} from '@/lib/event-photos/gallery';
import {apiError,AppError} from '@/lib/errors';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request,{params}){try{const {slug}=await params;const event=await publishedAiPhotos(slug);return Response.json(await processGuestPhoto(request,{event}),{headers:{'Cache-Control':'no-store'}})}catch(error){return apiError(error)}}
export async function GET(request,{params}){try{const {slug}=await params,event=await publishedAiPhotos(slug);if(!guestPhotosAreOpen(Date.now(),event))throw new AppError(`El álbum estará disponible el ${event.opensDateLabel}.`,403,'photos_not_open');return Response.json(await listGuestPhotos(new URL(request.url).searchParams.get('cursor')||'',{event}),{headers:{'Cache-Control':'no-store'}})}catch(error){return apiError(error)}}
