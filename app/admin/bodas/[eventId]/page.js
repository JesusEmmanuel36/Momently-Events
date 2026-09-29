import { redirect } from "next/navigation";

export default async function LegacyEvent({ params }) {
  const { eventId } = await params;
  redirect(`/admin/eventos/${eventId}`);
}
