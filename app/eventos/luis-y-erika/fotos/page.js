import { luisErikaPhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Luis Antonio y Erika",
  description: "Comparte tus recuerdos de la boda de Luis Antonio y Erika.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={luisErikaPhotos} />; }
