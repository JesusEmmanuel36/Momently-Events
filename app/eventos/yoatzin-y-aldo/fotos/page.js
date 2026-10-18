import { yoatzinAldoPhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Yoatzin y Aldo",
  description: "Comparte tus recuerdos de la boda de Yoatzin y Aldo.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={yoatzinAldoPhotos} />; }
