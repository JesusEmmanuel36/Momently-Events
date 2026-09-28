import { ActivationForm } from "@/components/panel/ActivationForm";
export default async function Activate({ searchParams }) { const query = await searchParams; return <ActivationForm inviteId={query.invite || ""} token={query.token || ""} />; }
