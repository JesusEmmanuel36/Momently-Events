import {carlosDulcePhotos} from '@/lib/event-photos/config';
import {processGuestPhoto} from '@/lib/event-photos/server';
import {listGuestPhotos} from '@/lib/event-photos/gallery';
import {guestPhotosAreOpen} from '@/lib/event-photos/config';
import {apiError,AppError} from '@/lib/errors';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request){try{return Response.json(await processGuestPhoto(request,{event:carlosDulcePhotos}),{headers:{'Cache-Control':'no-store'}})}catch(error){return apiError(error)}}
export async function GET(request){try{if(!guestPhotosAreOpen(Date.now(),carlosDulcePhotos))throw new AppError('El álbum estará disponible el 21 de noviembre de 2026.',403,'photos_not_open');return Response.json(await listGuestPhotos(new URL(request.url).searchParams.get('cursor')||'',{event:carlosDulcePhotos}),{headers:{'Cache-Control':'no-store'}})}catch(error){return apiError(error)}}
