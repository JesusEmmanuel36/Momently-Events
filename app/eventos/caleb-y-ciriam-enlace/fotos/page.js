import { calebCiriamEnlacePhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Caleb y Ciriam",
  description: "Comparte tus recuerdos de el enlace matrimonial de Caleb y Ciriam.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={calebCiriamEnlacePhotos} />; }
