import { claudiaPorfirioPhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Claudia y Porfirio",
  description: "Comparte tus recuerdos de la boda de Claudia y Porfirio.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={claudiaPorfirioPhotos} />; }
