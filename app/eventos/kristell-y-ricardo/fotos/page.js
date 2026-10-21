import { kristellRicardoPhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Kristell y Ricardo",
  description: "Comparte tus recuerdos de la boda de Kristell y Ricardo.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={kristellRicardoPhotos} />; }
