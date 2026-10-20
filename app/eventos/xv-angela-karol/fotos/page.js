import { angelaKarolPhotos } from "@/lib/event-photos/config";
import { GuestPhotoUpload } from "@/components/events/caleb-ciriam/photos/GuestPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Comparte tus fotos | Ángela Karol",
  description: "Comparte tus recuerdos de los XV años de Ángela Karol.",
  robots: { index: false, follow: false },
};

export default function PhotosPage() { return <GuestPhotoUpload initialNow={Date.now()} event={angelaKarolPhotos} />; }
