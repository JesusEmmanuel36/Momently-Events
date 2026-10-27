import {carlosDulcePhotos} from '@/lib/event-photos/config';
import {GuestPhotoUpload} from '@/components/events/caleb-ciriam/photos/GuestPhotoUpload';
export const dynamic='force-dynamic';
export const metadata={title:'Comparte tus fotos | Carlos y Dulce',robots:{index:false,follow:false}};
export default function Page(){return <GuestPhotoUpload event={carlosDulcePhotos} initialNow={Date.now()}/>}
