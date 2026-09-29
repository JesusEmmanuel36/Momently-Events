import { redirect } from "next/navigation";

export default async function LegacyPreview({ params }) {
  const { eventId } = await params;
  redirect(`/admin/eventos/${eventId}`);
}
