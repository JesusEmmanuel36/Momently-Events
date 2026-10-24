import {notFound} from 'next/navigation';
import {publishedAiPhotos} from '@/lib/event-photos/dynamic-server';
import {GuestPhotoUpload} from '@/components/events/caleb-ciriam/photos/GuestPhotoUpload';
export const runtime='nodejs';export const dynamic='force-dynamic';
export const metadata={title:'Comparte tus fotos | Momently Events',robots:{index:false,follow:false}};
export default async function Page({params}){const {slug}=await params;let event;try{event=await publishedAiPhotos(slug)}catch(error){if(error.status===404)notFound();throw error}return <GuestPhotoUpload initialNow={Date.now()} event={event}/>}
