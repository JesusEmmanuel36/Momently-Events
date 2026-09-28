import { redirect } from "next/navigation";
export default async function Confirmations({ params }) { const { eventId } = await params; redirect(`/panel/evento/${eventId}`); }
