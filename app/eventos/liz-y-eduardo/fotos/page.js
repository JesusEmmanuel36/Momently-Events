import {lizEduardoPhotos} from '@/lib/event-photos/config';
import {GuestPhotoUpload} from '@/components/events/caleb-ciriam/photos/GuestPhotoUpload';
export const dynamic='force-dynamic';
export const metadata={title:'Comparte tus fotos | Liz y Eduardo',robots:{index:false,follow:false}};
export default function Page(){return <GuestPhotoUpload event={lizEduardoPhotos} initialNow={Date.now()}/>}
